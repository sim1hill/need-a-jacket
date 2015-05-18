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
  }
  });
  }

  function printTemp(location,temp){
    $('#test h1').replaceWith("<h1>It's currently " + temp +" degrees in " + location);
  }

});


// $(document).ready(function(){
//   var geocoder = new google.maps.Geocoder();
//   function getLocation() {
//     // code here
//     var location = navigator.geolocation.getCurrentPosition(function(position){
//       var longi = position.coords.longitude
//       var lat = position.coords.latitude
//       codeLatLng(lat,longi);
      
//     });
//   }
//   getLocation();


//  function codeLatLng(lat,lng) {
//   debugger;
//   var latlng = new google.maps.LatLng(lat, lng);
// //   geocoder.geocode({'latLng': latlng}, function(results, status) {
// //     debugger;
// //     }
// }

// // google.maps.event.addDomListener(window, 'load', initialize);

// });






