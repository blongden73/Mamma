console.log('hello world, welcome to Mamma, built by Ben & Estefi');

//underline the last word
$(".mega-title").html(function(){
  var text= $(this).text().trim().split(" ");
  var last = text.pop();
  return text.join(" ") + (text.length > 0 ? " <span class='underline'>" + last + "</span>" : last);
});

//ajax call for people
function loadJSON(path, success, error){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              if (success)
                  success(JSON.parse(xhr.responseText));
          } else {
              if (error)
                  error(xhr);
          }
      }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

//call this funtion on where people exsist
var peopleWrapper = document.querySelector('.m-people-placeholder');
var practitionerWrapper = document.querySelector('.m-practioner-placeholder');
if(peopleWrapper || practitionerWrapper) {
  Vue.mixin({ delimiters: ['${','}'] });
  var app = new Vue({
    el: '#app',
    data: {
        practioners: []
    },
    mounted: function() {
      $.get('https://joinmamma.com/wp-json/mamma/v1/get-members/', function(data) {
          app.practioners = data;
      })
    },
    methods: {
      log: function() {
        console.log(this, 'vue data');
      }
    }
  })
  Vue.filter('replacePractice', function (value) {
    console.log('running function')
    var block = value.split('\r\n');
    console.log(block.length, 'split');
    block[0] = "<p>" block[0] "</p>";
    console.log(block);
  })
  app.log();
}

//header menu
var hamburger = document.querySelector('.m-hamburger');
var menu = document.querySelector('.m-menu-wrapper');
var logo = document.querySelector('.site-header__logo');
hamburger.addEventListener('click', function(){
  this.classList.toggle('active');
  menu.classList.toggle('display');
  logo.classList.toggle('open');
});

//carousel
var carouselImages = document.querySelectorAll('.car_img');
var blobList = document.querySelectorAll('.blob');

console.log(carouselImages);

if(carouselImages.length >= 1){
  setInterval(function(){
    var current = document.querySelector('.car_img.display');
    var next = document.querySelector('.display + .car_img');
    var currentBlob = document.querySelector('.blob.display');
    var nextBlob = document.querySelector('.display + .blob');
    console.log('rolling');
    current.classList.remove('display');
    currentBlob.classList.remove('display');
    if(next) {
      next.classList.add('display');
      nextBlob.classList.add('display');
    } else {
      carouselImages[0].classList.add('display');
      blobList[0].classList.add('display');
    }
  }, 1500);
}

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

function onScrollElements(){
  document.addEventListener('scroll', function(){
    var typeOuts = document.querySelectorAll('.typeOut');
    for(i=0; i<typeOuts.length; i++) {
      if(elementInViewport(typeOuts[i])) {
        var content = typeOuts[i].dataset.content;
        if(!typeOuts[i].classList.contains('typed')){
          var typewriter = new Typewriter(typeOuts[i], {
              loop: false,
              cursor: '',
          });
          typewriter.typeString(content).start();
          typeOuts[i].classList.add('typed');
        }
      } else {
        typeOuts[i].classList.remove('typed');
      }
    }
  });
}

if(document.querySelectorAll('.typeOut')) {
  onScrollElements();
}

function filters(){
  var filters = document.querySelectorAll('.m-filters ul li');
  console.log(filters);
  for(i=0; i<filters.length; i++) {
    filters[i].addEventListener('click', function(){
      var search = this.dataset.find;
      var results = document.querySelectorAll('.m-cal-item');
      var noResults = document.querySelector('.no-results');
      var findthis = document.querySelectorAll('.m-cal-item.'+search);
      var word = document.querySelector('.js-type');
      console.log(search);

      if(findthis.length <= 0) {
        noResults.classList.add('display');
        word.innerHTML = search;
        console.log(findthis.length, 'true');
      }else {
        noResults.classList.remove('display');
        console.log(findthis.length, 'false');
      }

      for(j=0; j< results.length; j++) {
        results[j].classList.remove('hide');
        results[j].classList.remove('found');

        if(results[j].classList.contains(search)){
          results[j].classList.add('found');
        } else {
          results[j].classList.add('hide');
        }
      }
    });
  }
  var suprise = document.querySelector('.suprise');
  if(suprise) {
    suprise.addEventListener('click', function(){
      var results = document.querySelectorAll('.m-cal-item');
      var random = Math.floor(Math.random() * (results.length + 1));
      var supriseMeContent = document.querySelector('.suprise-me-content');
      console.log(results[random]);
      var randomInner = results[random].innerHTML;
      supriseMeContent.innerHTML = "<h1>Here's your suprise 🎉</h1>" + randomInner;
    });
  }
 }

filters();

function calFilters() {
  var filter = document.querySelector('.practices-filter');
  if(filter){
  var options = filter.querySelectorAll('option');
  var results = document.querySelectorAll('.m-cal-item');

  filter.addEventListener('change', function(){
    console.log(this.value);
    var selectedFilter = this.value;
    var selectedResults = document.querySelectorAll('.m-cal-item.'+selectedFilter);
    console.log(selectedResults);

    if(this.value != 'all'){
      for(i = 0; i < results.length; i++) {
        console.log('loop');
        results[i].classList.remove('found');
        results[i].classList.add('hide');
      }
      for(j = 0; j < selectedResults.length; j++){
        selectedResults[j].classList.remove('hide');
        selectedResults[j].classList.add('found');
      }
    }else {
      for(i = 0; i < results.length; i++) {
        console.log('loop');
        results[i].classList.remove('hide');
        results[i].classList.add('found');
      }
    }
  });
  }
}

calFilters();

function videoPlayers(){
  var placeholder = document.querySelectorAll('.video-placeholder');
  var iframes = document.querySelectorAll('.iframe-placeholder');
  if(placeholder){
    for(i=0; i<placeholder.length; i++) {
      console.log(placeholder[i], 'placeholder');
      var iframe = this.nextSibling;
      placeholder[i].addEventListener('click', function(){
        this.classList.add('hide');
        var frameWrapper = this.nextSibling;
        var data = frameWrapper.nextSibling.dataset.frame;
        console.log(data);
        frameWrapper.nextSibling.innerHTML = data;
      });
    }
  }
}videoPlayers();

function tagsearch(){
  var searchButton = document.querySelector('.m-button__search');
  if(searchButton) {
  searchButton.addEventListener('click', function(e){
    e.preventDefault();
    var offering = document.querySelector('.offering-select');
    var how = document.querySelector('.how-select');
    var wellbeing = document.querySelector('.wellbeing-select');
    var search = document.querySelector('.custom-m-search');
    console.log(offering.value, how.value, wellbeing.value, search.value);
    if(search.value && !how.value && !wellbeing.value && !offering.value) {
      var url = '/search?q=' + search.value;
    }
    if(search.value  && !how.value  && !wellbeing.value  && offering.value ) {
      var url = '/search?q=' + search.value + '+tag%3A' + offering.value.replace(' ', '+');
    }
    if(search.value  && !how.value  && wellbeing.value  && offering.value ) {
      var url = '/search?q=' + search.value + '+tag%3A' + offering.value.replace(' ', '+') + '+tag%3A' + wellbeing.value;
    }

    console.log(url);
    window.location.replace(url);
  });
  }
}tagsearch();

function signup(){
  var newsletterSignupClose = document.querySelector('.newsletter-close');
  var newsletterSignupWrapper = document.querySelector('.email-sign-up-box');
  newsletterSignupClose.addEventListener('click', function(){
    newsletterSignupWrapper.classList.add('close');
  });

  console.log('checking pop')
  console.log(localStorage.getItem(signup));

  if(!localStorage.getItem('signup')){
    console.log('pop')
    setTimeout(function(){
    newsletterSignupWrapper.classList.add('display');
    localStorage.setItem('signup', true)
    }, 1000)
  }
}signup();
