$(document).ready(function() {

  if(!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(function(pos) {
  geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
      var longitude = pos.coords.longitude
      var latitude = pos.coords.latitude
       // pastWeather(latitude,longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var result = results[0];
        var city = result.address_components[3].long_name;
        var state = result.address_components[4].short_name;
        
        currentWeather(city,state);

    } else{
      alert("Sorry, something went wrong!");
    }
    });
   
  });

  function currentWeather(city,state){
    var slugCity = city.split(" ").join("_")
    $.ajax({
    url: "http://api.wunderground.com/api/bcb72f058f182c52/geolookup/conditions/q/" + state + "/" + slugCity + ".json",
  dataType: "jsonp",
  success: function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  printTemp(location,temp_f)
  decideJacket(temp_f)
  }
  });
  }

  function printTemp(location,temp){
    $('#current-weather').append("<h1>It's currently " + temp +" degrees in " + location);
  }

  function decideJacket(temp_f){
    if ((temp_f >= 60) && (temp_f <= 72)){
      $('#jacket').prepend("¯/\/_(ツ)_/¯...bring something light along just in case<br><img src='hoodie.gif'></img>")
    } else if((temp_f > 32) && (temp_f <= 55)){
      $('#jacket').prepend("Definitely, pack a jacket or layer up.<br><img src='coat.gif'></img>")

    } else if (temp_f < 32){
      $('#jacket').prepend("You do you, but if you freeze to death that's not on me.<br><img src='olaf.gif'></img>")
    }else if(temp_f > 73){
      $('#jacket').prepend("Leave the jacket at home or things are gonna get toasty.<br><img src='hot.gif'></img>")
    }
  }

   function getDate(){
    // var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth()+1;
    // var yyyy = today.getFullYear();

    // if(dd<10) {
    //     dd='0'+dd
    // } 

    // if(mm<10) {
    //     mm='0'+mm
    // } 

    // return today = yyyy+'-'+mm+'-'+ dd;
    Date.addDays

    Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    debugger;
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = currentDate.addDays(1);
    }
        return dateArray;
}
  }

  getDate();

  // function pastWeather(lat,longi){
  //   var shortLat = lat.toString().slice(0,6);
  //   var shortLongi = longi.toString().slice(0,6);
  //   var date = getDate();
  //   //var url = "https://api.worldweatheronline.com/free/v2/past-weather.ashx?key=69506d8a3f22ea2023cbf8752829d&q=" + lat + "," + longi + "&date=" + startDate + "&enddate=" + endDate "fx=no&format=json";
  //   $.ajax({
  //   // url: url,
  //   dataType: "jsonp",
  //   success: function(parsed_json) {
  // }
  // });
  // }

 

});






