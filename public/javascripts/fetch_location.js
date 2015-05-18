$(document).ready(function() {

  if(!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(function(pos) {
  geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var result = results[0];
        var city = result.address_components[4].long_name;
        var state = result.address_components[4].short_name;
        weatherApiCall(city,state)

    } else{
      alert("Sorry, something went wrong!");
    }
    });
   
  });

  function weatherApiCall(city,state){
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

});






