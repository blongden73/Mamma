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
  app.log();
}

//header menu
var hamburger = document.querySelector('.m-hamburger');
var menu = document.querySelector('.m-menu-wrapper');
hamburger.addEventListener('click', function(){
  this.classList.toggle('active');
  menu.classList.toggle('display');
});

//carousel
var carouselImages = document.querySelectorAll('.car_img');
var blobList = document.querySelectorAll('.blob');

if(carouselImages){
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

var why = document.querySelector('.typewriter-why');

var typewriter = new Typewriter(why, {
    loop: false,
    cursor: ''
});



typewriter.typeString('<span class="handwritten">Why</span> Mamma?').start();;
