$(document).ready(function() {
//FlipClock
var clock = $('.clock').FlipClock({
	clockFace: 'TwelveHourClock'
});

// GeoLocation 	
	if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

//Weather 
  var city = 'amravati';  
  loadWeather(city,''); //@params location, woeid
  $('#ownLocation').hide();
});

function locate() {
  //navigator.geolocation.getCurrentPosition(function(position) {
  //  loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  //});
    $('#ownLocation').show();
	containerHeight = "calc(30vh - 320px);"; 
    $("#weatherPlace").attr("style", "top:" + containerHeight);
};

function city(){
	  var city = document.getElementById('city').value;
	  if (document.getElementById('city').value != '') {
	  loadWeather(city,'');
	  $('#ownLocation').hide();
	  containerHeight = "calc(30vh - 180px);"; 
	  $("#weatherPlace").attr("style", "top:" + containerHeight);
	}else if(document.getElementById('city').value == ''){
	  return;
	}

};

function moreData(){
$('#weather-more').toggle(); 
};

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.alt.temp+'&deg;C</h2>';
      html += '<div class="dataDiv"><ul><li class="currently">'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li class="currently">'+weather.temp+'&deg;F</li>';  
      html += '<div id="weather-more"><li class="currently-more">High : '+weather.alt.high+'&deg;C</li> ';
	  html += '<li class="currently-more">Low : '+weather.alt.low+'&deg;C</li>'; 
	  html += '<li class="currently-more">Humidity : '+weather.humidity+'</li>';  
	  html += '<li class="currently-more">Heat Index : '+weather.heatindex+'</li>';  
	  html += '<li class="currently-more">Wind Speed : '+weather.wind.speed+' </li>';  
      	  $("#weather").html(html);
	  var background = weather.currently.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
	  var backgroundLower = background.toLowerCase();
	  $('.AllDiv').css('background-image', 'url(img/'+backgroundLower+'.jpg)');
	  $('#weather-more').hide();
	  var colors = 'Code_'+weather.code;
		//Start Json Parse
		var JSON_Response;
		$(document).ready(function () {
			$.getJSON('color.json', function (data) {
            JSON_Response = data; 		 
			
			//Json Color Parse Start
			
			//Flip Clock
			var dotColor = data[colors].flip.dotBackground;
			var flipShadow = data[colors].flip.shadow;
			var flipMeridium = data[colors].flip.meridium;
			var flipWrapperColor = data[colors].flip.wrapperColor;
			var flipBackground = data[colors].flip.wrapperBackground;
			$('.flip-clock-dot').css("background", dotColor); 
			$('.flip-clock-wrapper .flip').css("box-shadow", flipShadow); 
			$('.flip-clock-meridium a').css("color", flipMeridium);
			
			setInterval(function(){
					$('.flip-clock-wrapper ul li a div div.inn').css("color", flipWrapperColor).css("background",flipBackground); 
				}, 400);

			//thought
			var thoughtBackground = data[colors].thought.background;
			var thoughtColor = data[colors].thought.color;
			$('.thought').css("background-color", thoughtBackground).css("color", thoughtColor);
			
			//weather
			var weatherHead = data[colors].weather.h2;
			var weatherIcon = data[colors].weather.icon;
			var weatherLi = data[colors].weather.liBackground;
			var weatherButton = data[colors].weather.buttonBackground;
			var weatherCity = data[colors].weather.cityBackground;
			var weatherAutocomplete = data[colors].weather.cityAutocomplete;
			$('#weather h2').css("color", weatherHead);
			$('i').css("color", weatherIcon);
			$('#weather li').css("background", weatherLi);
			$('button').css("background", weatherButton);
			$('#city').css("background", weatherCity);
			$('.city-autocomplete').css("background", weatherAutocomplete);
      });
    });
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

// Autocomplete Div 

$('input#city').cityAutocomplete({
	show_state: true,
	show_country: true
});

//Full Screen Support

function toggleFullScreen(elem) {
  if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
