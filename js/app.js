$.getJSON('color.json', function (data) {
	$("body").data("colorJSON", data);	
});

$(document).ready(function() {
	$('#dialog').hide();
    $('#ownLocation').hide();
    $('#ownLocationInitital').hide();
	
	$('input#cityAfter').cityAutocomplete({
	show_state: true,
	show_country: true
	});
	$('input#cityInitial').cityAutocomplete({
	show_state: true,
	show_country: true
	});
	
	//FlipClock
	var clock = $('.clock').FlipClock({
		clockFace: 'TwelveHourClock'
	});
// dialog
   var defaultLocation = localStorage.getItem('defaultLocation');
   if(!defaultLocation){
	$("#dialog").dialog({
      autoOpen: false,
	  resizable: false,
	  modal:true,
	  minWidth:400,
	  minHeight:300,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "fade",
        duration: 1000
      },
	  closeOnEscape: false
    });
    $("#dialog").dialog( "open" );
    $('#ownLocationInitital').show();
   }else{
   	loadWeather(defaultLocation,'');
   } 

	// GeoLocation 	
	if ("geolocation" in navigator) {
		$('.js-geolocation').show(); 
	} else {
		$('.js-geolocation').hide();
	}
	//Weather  //@params location, woeid
	});

function locate() {
  //navigator.geolocation.getCurrentPosition(function(position) {
  //  loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  //});
    if ($('#ownLocation').is(":hidden")){
	    $('#ownLocation').show();
	    containerHeight = "calc(30vh - 325px);"; 
	    $("#weatherPlace").attr("style", "top:" + containerHeight);
	    $(".js-geolocation").html('Hide Location');
    }else{
    	$('#ownLocation').hide();
    	containerHeight = "calc(30vh - 180px);"; 
	  	$("#weatherPlace").attr("style", "top:" + containerHeight);
	  	$(".js-geolocation").html('Enter Your Location');
    }

};

function clearLocation(){
	localStorage.clear('defaultLocation');
	location.reload();
}

function showDefaultLocationButton(){
	$('.clear-default-location').show();
}


function initialLoad(){
  	      var defaultLocationCity = document.getElementById('cityInitial').value;
		  if(defaultLocationCity){
		  localStorage.setItem('defaultLocation', defaultLocationCity);	
		  loadWeather(defaultLocationCity,'');  
		  $('#dialog').dialog("close");
		  $('#ownLocationInitital').hide();
		  location.reload();
		  }else{
			  return;
		  }
}

function city(){
	var city = document.getElementById('cityAfter').value;
	if(city) {
	  loadWeather(city,'');
	  $('#ownLocation').hide();
	  containerHeight = "calc(30vh - 180px);"; 
	  $("#weatherPlace").attr("style", "top:" + containerHeight);
  	  $(".js-geolocation").html('Enter Your Location');
 	  $(".location").html('Show More');
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
	$('#cityAfter').css("background", colorWeather.cityBackground);
	$('.city-autocomplete').css("background", colorWeather.cityAutocomplete);
}
// Autocomplete Div 

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
