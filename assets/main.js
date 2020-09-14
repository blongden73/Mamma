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
if(peopleWrapper) {
  Vue.mixin({ delimiters: ['${','}'] });

  var app = new Vue({
    el: '#app',
    data: {
        practioners: []
    },
    mounted: function() {
      $.get('https://mamma-join.neuer.uk/wp-json/mamma/v1/get-members/', function(data) {
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

  // loadJSON("https://mamma-join.neuer.uk/wp-json/mamma/v1/get-members/", function(data) {
  //   console.log(data);
  //   var people = data;
  //   for(i=0; i < people.length; i++) {
  //     var name = people[i].full_name;
  //     var practice = people[i].practice;
  //     var profile_picture = people[i].profile_picture;
  //   }
  //   console.log(data);
  //   var app = new Vue({
  //   el: '#app',
  //   data: data
  //   })
  // }, function(xhr) {
  //   console.log("error");
  // });
}
