$.getJSON('color.json', function (data) {
	$("body").data("colorJSON", data);	
});

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
    if ($('#ownLocation').is(":hidden")){
	    $('#ownLocation').show();
	    containerHeight = "calc(30vh - 320px);"; 
	    $("#weatherPlace").attr("style", "top:" + containerHeight);
	    $(".js-geolocation").html('Hide Location');
    }else{
    	$('#ownLocation').hide();
    	containerHeight = "calc(30vh - 180px);"; 
	  	$("#weatherPlace").attr("style", "top:" + containerHeight);
	  	$(".js-geolocation").html('Enter Your Location');
    }

};

function city(){
	var city = document.getElementById('city').value;
	if(city) {
	  loadWeather(city,'');
	  $('#ownLocation').hide();
	  containerHeight = "calc(30vh - 180px);"; 
	  $("#weatherPlace").attr("style", "top:" + containerHeight);
  	  $(".js-geolocation").html('Enter Your Location');
	}else{
	  return;
	}

};

function moreData(){ 
	 if ($('#weather-more').is(":hidden")){
	 	$('#weather-more').show();
 		$(".location").html('Hide More');
	 }else{
	 	$('#weather-more').hide();
	 	$(".location").html('Show More');
	 }
};

function loadWeather(location, woeid) {
	  if(!location){
		location = "amravati";
	  }
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
		  
		  var background = weather.currently.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_').toLowerCase();
		  $('.AllDiv').css('background-image', 'url(img/'+background+'.jpg)');
		  $('#weather-more').hide();
		  				
			var colorData = $("body").data("colorJSON")['Code_'+weather.code];
			if(colorData){					
				changeColorTheme(colorData);
			}else{
				$.getJSON('color.json', function (data) {
					$("body").data("colorJSON", data);	
					var colorData = $("body").data("colorJSON")['Code_'+weather.code];
					changeColorTheme(colorData);	
				});					
			}			
		},
		error: function(error) {
		  $("#weather").html('<p>'+error+'</p>');
		}
	  });
}

function changeColorTheme(colorData){	
	var colorFlip = colorData.flip;
	var colorWeather = colorData.weather;
	changeClockColor(colorFlip);
	$('.thought').css("background-color", colorData.thought.background).css("color", colorData.thought.color);
	changeWeatherColor(colorWeather);
}

function changeClockColor(colorFlip){	
	$('.flip-clock-dot').css("background", colorFlip.dotBackground); 
	$('.flip-clock-wrapper .flip').css("box-shadow", colorFlip.shadow); 
	$('.flip-clock-meridium a').css("color", colorFlip.meridium);
	
	//Clear Old Timer
	var oldTimer = $("body").data("timer");
	if(oldTimer){
	   clearInterval(oldTimer);
	}
	var timer = setInterval(function(){
			$('.flip-clock-wrapper ul li a div div.inn').css("color", colorFlip.wrapperColor).css("background", colorFlip.wrapperBackground); 
	}, 200);
	$("body").data("timer", timer);
}

function changeWeatherColor(colorWeather){		
	$('#weather h2').css("color", colorWeather.h2);
	$('i').css("color", colorWeather.icon);
	$('#weather li').css("background", colorWeather.liBackground);
	$('button').css("background", colorWeather.buttonBackground);
	$('#city').css("background", colorWeather.cityBackground);
	$('.city-autocomplete').css("background", colorWeather.cityAutocomplete);
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
