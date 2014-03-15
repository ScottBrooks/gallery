


/*

FOR ADDITIONAL SUPPORT: Contact the developer at http://www.themeforest.net/user/egobuilders

*/



window.captions = false;// show captions in gallery automatically // false will hide // true will show // 

window.scale_thumbs = 63;// height of gallery thumbnails is percentage of width (see "style.css" .gallery-thumb ) // a setting of 100 will give you square thumbnails

window.speed = 750;// default jQuery animation speed unless otherwise implemented (1000 = 1 second)

window.easeCool = 'easeInOutExpo'; // default jQuery animation style unless otherwise implemented

window.xml = "gallery.xml";// path to gallery parameters (captions text, paths to photos, videos, and thumbnails, button parameters)



/* *************** DO NOT EDIT BELOW THIS LINE UNLESS YOU ARE COMFORTABLE WITH JAVASCRIPT AND JQUERY *************** */
















































$(window).resize(function() {
    resize();
});

$(window).scroll(function(){
	dock_menu();
});

// when everything is done loading...
$(document).ready(function(){
	
	load_xml_thumbnails();// this function contains load_xml_media() for the photos and videos
	resize();
	
});

// determine browser type for auto-srolling

if (window.browser == 'ie'){
	window.scroller = 'html';
} else if (window.browser == 'firefox'){
	window.scroller = 'html';
} else if (window.browser == 'chrome'){
	window.scroller = 'body';
} else {
	window.scroller = 'html, body';
}


















































var sw = $('#site').width();
$('html, body').css({'overflow':'hidden'});
var aw = $('#site').width();
$('html, body').css({'overflow':'visible'});
window.scrollbarWidth = aw - sw;

window.gallery = false;

window.res_nav = false;

window.docked = false;

window.menu_height = $('#menu').height();















































// resize specific items when browser window is resized - see "responsive.css" in main directory

function resize(){

	window.width = $(window).innerWidth();
	window.height = $(window).innerHeight();
	
	window.menu_height = $('#menu').height();
	
	window.window_height = window.height;
	
	$('#full').css({'width':(window.width * (window.gtotal + 2))+'px', 'height':window.height+'px'});
	
	$('.gallery-media').css({'width':window.width+'px', 'height':window.height+'px'});
	
	start_mouse_timer();
	
	$('iframe.video').css({'width':window.width+'px', 'height':(window.height)+'px'});
	
	$('#email-confirmation').css({'height':$('#email-form').height()+'px'});
	
	gjump();
	
	if (window.width < 450 || (window.is_device && window.width < 1100)){
		$('#home').css({'height':'270px'});
	} else if (window.width < 500 || (window.is_device && window.width < 1100)){
		$('#home').css({'height':(window.width * 0.6)+'px'});
	} else {
		$('#home').css({'height':(window.height - $('#menu').height())+'px'});
	}
	
	if ($('.the-nav').css('position') == 'static'){
		window.res_nav = false;
		$('.the-nav').css({'height':'auto'});
		window.dif = -50;
		
	} else if (!window.res_nav){
		$('.the-nav').css({'height':'0px'});
		window.dif = 50;
	}
	
	// if in gallery mode
	if (window.gallery){
		if (window.captions){
			$('#captions').css({'bottom':'0px'});
		} else {
			$('#captions').css({'bottom':-$('#captions').height()+'px'});
		}
	}
	
	// landscape vs portrait
	if (window.width > window.height){
		$('.gallery-photo').css({'background-size':'cover'});
	} else {
		$('.gallery-photo').css({'background-size':'contain'});
	}
	
	$('.gallery-thumb').css({'height':($('.gallery-thumb').width() * (window.scale_thumbs*0.01))+'px'});
	
	dock_menu();
	
	$('#loading').css({'margin-top':(window.height*0.43)+'px'});
	
	//$('#stats').text(window.width + ' x ' + window.height);
	
}




















































// load gallery thumbnails (and then load photos and videos) - see "gallery.xml" in main directory

function load_xml_thumbnails(){
	
	var g = 0;
	var captions;
	
	var vid = '';
	
	window.gfullsize = new Array();
	window.gtype = new Array();
	
	window.gheader = new Array();
	window.gtitle = new Array();
	window.gdescription = new Array();
	window.gbutton = new Array();
	window.glink = new Array();
	
	window.xml += "?0";// prevents caching xml
	
	$.ajax({ 
		
		url: window.xml,
		dataType: "xml",
		success: function(data) {
			
			$(data).find("media").each( function() {
				
				g++;
				
				window.gheader[g] = $(this).find("header").text();
				
				if ($(this).find("fullsize").text()){
					
					window.gfullsize[g] = $(this).find("fullsize").text();
					
					window.gfullsize[g] = window.gfullsize[g].replace(/\s/g, '');
					
					// if vimeo
					if (window.gfullsize[g].indexOf('vimeo.com') != -1 || window.gfullsize[g].length == 8){
						
						// convert all vimeo formats to one type
						if (window.gfullsize[g].indexOf('http://vimeo.com/') != -1 && window.gfullsize[g].length == 25){
							window.gfullsize[g] = window.gfullsize[g].replace('http://vimeo.com/', 'http://player.vimeo.com/video/');
							//alert('vimeo totally wrong url');
							
						} else if (window.gfullsize[g].indexOf('http://www.vimeo.com/') != -1 && window.gfullsize[g].length == 29){
							window.gfullsize[g] = window.gfullsize[g].replace('http://www.vimeo.com/', 'http://player.vimeo.com/video/');
							//alert('vimeo totally wrong url');
							
						} else if (window.gfullsize[g].indexOf('//www.vimeo.com') != -1){
							window.gfullsize[g] = window.gfullsize[g].replace('//www.vimeo.com', '//player.vimeo.com');
							//alert('vimeo www to player');
							
						} else if (window.gfullsize[g].length == 8){
							window.gfullsize[g] = 'http://player.vimeo.com/video/' + window.gfullsize[g];
							//alert('vimeo 8');
						
						} else {
							//alert('vimeo embed');
						}
						
						window.gtype[g] = 'vimeo';
						var media_type = 'video';
						//alert('g2: ' + g);
						
					// if youtube
					} else if (window.gfullsize[g].indexOf('youtube.com') != -1 || window.gfullsize[g].length == 11){
						
						// convert all youtube formats to one type
						if (window.gfullsize[g].indexOf('watch?v=') != -1){
							//var str="How are you doing today?";
							window.gfullsize[g] = window.gfullsize[g].split("watch?v=");
							// http://www.youtube.com/watch?v=DZOeYzEBNb4 - wrong
							// http://www.youtube.com/embed/pyDvOCbJWtU - right
							window.gfullsize[g] = 'http://www.youtube.com/embed/' + window.gfullsize[g][1];
							//alert('youtube watch?v=');
							
						} else if (window.gfullsize[g].indexOf('youtube.com/embed/') != -1){
							window.gfullsize[g] = window.gfullsize[g];
							//alert('youtube embed');
							
						} else if (window.gfullsize[g].length == 11){
							window.gfullsize[g] = 'http://www.youtube.com/embed/' + window.gfullsize[g];
							//alert('youtube 11');
							
						} else {
							window.gfullsize[g] = window.gfullsize[g];
							//alert('youtube ok as is.');
							
						}
						
						
						window.gtype[g] = 'youtube';
						var media_type = 'video';
						//alert('g: ' + g);
						
					// if photo
					} else {
						window.gtype[g] = 'photo';
						var media_type = 'photo';
						
					}
					
					
				}
				
				window.gtitle[g] = $(this).find("title").text();
				window.gdescription[g] = $(this).find("description").text();
				window.gbutton[g] = $(this).find("button").text();
				window.glink[g] = $(this).find("link").text();
				
				captions = '';
				
				// create gallery thumbnails
				captions += '<div class="gallery-thumb th-' + g + '" style="background-image:url(' + $(this).find("thumbnail").text() + ');">';
				captions += '<div id="g' + g + '" class="gallery-th-' + media_type + '" onClick="show_slideshow(this.id);">&nbsp;</div>';
				captions += '</div>';
				
				$("#thumbs").append(captions);
				
			});
			
			window.gtotal = g;
			
			$('.gallery-thumb').css({'height':($('.gallery-thumb').width() * (window.scale_thumbs*0.01))+'px'});
			
			load_xml_media();
			
		}
		
	});	// end ajax
 	
 	
}













// load gallery photos and videos - see "gallery.xml" in main directory

function load_xml_media(){
	
	// load photos and videos into full size slideshow gallery
	$('#full').css({'width':((window.gtotal+2)*window.width)+'px'});
	
	for (var i=1;i<=window.gtotal;i++){
		//alert(window.width + ' ' + window.height);
		if (window.gtype[i] == 'photo'){
			$('#full').append('<div class="gallery-media gm-' + i + '" style="width:' + window.width + 'px;height:' + window.height + 'px;"><div class="gallery-photo" style="background-image:url(' + window.gfullsize[i] + ');">&nbsp;</div>');
			//alert('photo' + ' ' + i + ' ' + window.gfullsize[i]);
		} else if (window.gtype[i] == 'vimeo'){
			$('#full').append('<div class="gallery-media gm-' + i + '" style="width:' + window.width + 'px;height:' + window.height + 'px;"><div class="gallery-video"><iframe class="video" id="vimeo" src="' + window.gfullsize[i] + '" width="100%" height="' + window.height + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>');
			//alert('vimeo' + ' ' + i + ' ' + window.gfullsize[i]); // onmouseover="" 
		} else if (window.gtype[i] == 'youtube'){
			$('#full').append('<div class="gallery-media gm-' + i + '" style="width:' + window.width + 'px;height:' + window.height + 'px;"><div class="gallery-video"><iframe class="video" id="youtube" src="' + window.gfullsize[i] + '?autoplay=0&fs=1&wmode=transparent" width="100%" height="' + window.height + '" frameborder="0" allowfullscreen></iframe></div></div>');
			//alert('youtube' + ' ' + i + ' ' + window.gfullsize[i]); // onmouseover="" 
		}
		
	}
	
	$('.gm-' + window.gtotal).clone().prependTo('#full').css({'width':window.width+'px', 'height':'100%', 'float':'left', 'margin':'0'});
	
	$('.gm-1').clone().appendTo('#full').css({'width':window.width+'px', 'height':'100%', 'float':'left', 'margin':'0'});
	
	// position gallery
	$('#full').css({'left':-window.width + 'px'});
	
	// hide gallery
	$('#full').css({'display':'none'});
	
	$(window.scroller).animate({ scrollTop: ($('#home').offset().top) }, 500, 'linear');// force site to start at very top // don't go lower than 500!
	
	$('#intro').delay(1000).fadeOut(window.speed, 'linear');// fadeout "loading" overlay
	
}










// stick menu to top of browser window when scrolling down below home page

function dock_menu(){
	
	if (window.is_device){
		
		//
		
	} else if (window.width >= 980){
	
		//alert(window.scroller);
		if (!window.docked && ((window.height - $('#menu').height()) - $(window.scroller).scrollTop() <= 0)) {
			//alert(1);
			
			$('#menu').css({
				position : 'fixed',
				top: 0
			});
			$('#home').css({'padding-bottom':window.menu_height+'px'});
			window.docked = true;
			
		} else if ( window.width < 500 || ( window.docked && $(window.scroller).scrollTop() <= ( window.height - $('#menu').height() ) ) ) {
			//alert(2);
			$('#menu').css({
				position : 'static'
			});
			$('#home').css({'padding-bottom':'0px'});
			window.docked = false;
		} else {
			//alert(3);
		}

	} else { // undock
		$('#menu').css({
			position : 'static'
		});
		$('#home').css({'padding-bottom':'0px'});
		window.docked = false;
	}
	
}

















































// scroll to gallery page from Home
$('#home').click(function(){
	
	if (window.width < 980){
		window.dif = 75;
	} else if (window.width < 1300){
		window.dif = 44;
	} else if (window.width < 1500){
		window.dif = 72;
	} else if (window.width < 3000){
		window.dif = 40;
	}
	
	var section = 'menu';
	var target = $('#' + section).offset().top + window.dif;
	
	$(window.scroller).animate({ scrollTop:target }, window.speed, 'easeInOutExpo');
	
});





// scroll to very top (from logo in nav bar)
$('div#logo-nav').click(function(){
	if (window.docked){
		$("html, body").animate({ scrollTop: $('#home').offset().top }, window.speed, window.easeCool);
	} else {
		
		if (window.width < 980){
			window.dif = -50;
		} else if (window.width < 1300){
			window.dif = -30;
		} else if (window.width < 1500){
			window.dif = -5;
		} else if (window.width < 3000){
			window.dif = -55;
		}
		
		$(window.scroller).animate({ scrollTop: $('#gallery').offset().top + window.dif }, window.speed, window.easeCool);
	}
});

// scroll to very top (from logo and arrow at bottom of page)
$('.go-to-top').click(function(){
	$("html, body").animate({ scrollTop: $('#home').offset().top }, window.speed, window.easeCool);
});





// scroll to section when nav button clicked
$('a.menu').click(function(e){
	e.preventDefault();
	
	var section = $(this).text().toLowerCase();
	
	if (section == 'home'){
		window.dif = 0;
	} else if (window.width < 980){
		window.dif = 50;
	} else if (window.width < 1300){
		window.dif = -25;
	} else if (window.width < 1500){
		window.dif = 0;
	} else {
		window.dif = -50;
	}
	
	if (window.res_nav){//
		$('.the-nav').css({'height':'0px'});
		$('.the-logo, .the-picker').show();
		var this_speed = 1500;
	} else {
		var this_speed = 750;
	}
	
	var target = $('#' + section).offset().top + window.dif;
	
	$(window.scroller).animate({scrollTop:target}, this_speed, 'easeInOutExpo', function(){
		// done scrolling to section
	});
	
});

// scroll-button
$('.scroll-button').click(function(){
	
	var section = $(this).attr('name').toLowerCase();
	
	if (section == 'home'){
		window.dif = 0;
	} else if (window.width < 980){
		window.dif = 50;
	} else if (window.width < 1300){
		window.dif = -25;
	} else if (window.width < 1500){
		window.dif = 0;
	} else {
		window.dif = -50;
	}
	
	if (window.res_nav){//
		$('.the-nav').css({'height':'0px'});
		$('.the-logo, .the-picker').show();
		var this_speed = 1500;
	} else {
		var this_speed = 750;
	}
	
	var target = $('#' + section).offset().top + window.dif;
	
	$(window.scroller).animate({scrollTop:target}, this_speed, 'easeInOutExpo', function(){
		// done scrolling to section
	});
	
	//$("html, body").animate({ scrollTop: ($('#' + $(this).attr('name')).offset().top + window.dif) }, window.speed, window.easeCool);
	
});


















































// when gallery thumbnail is clicked...

$('#menu-btn').click(function(){
	if ($('.the-nav').height() == 0){
		
		if (window.width < 980){
			window.dif = -50;
		} else if (window.width < 1300){
			window.dif = -25;
		} else if (window.width < 1500){
			window.dif = 0;
		} else {
			window.dif = -50;
		}
		
		$('.the-logo, .the-picker').hide();
		$("html, body").animate({ scrollTop: ($('#menu').offset().top + (window.dif + 125)) }, window.speed, window.easeCool);
		$('.the-nav').animate({'height':window.height+'px'}, 750, window.easeCool, function(){
			//
		});
	} else {
		$('.the-nav').animate({'height':'0px'}, 500, window.easeCool, function(){
			$('.the-logo, .the-picker').show();
		});
	}
	window.res_nav = true;
});



// when fullsized gallery image is clicked (does not apply to videos)

$('#full').mousedown(function(e){
	var p = parseInt($('#full').css('left'));
    window.xp = (-p) + e.pageX;
    window.g = true;
    window.xs = e.pageX;
});




// when (X) is clicked in fullsized gallery (escape key also hides gallery slideshow)

$('#hide-slideshow').click(function(){
	hide_slideshow();
}); 





// show fullsized gallery slideshow

window.gnum = 1;

function show_slideshow(thc){
	
	window.timer_started = true;
	
	$('#site').css({'padding-right':window.scrollbarWidth+'px'});
	
	var myth = thc.split('g');
	var th = myth[1];
	
	window.gnum = th;
	
	$('html, body').css({'overflow':'hidden'});
	
	// get window width and height AFTER scrollbar is hidden
	
	window.width = $(window).innerWidth();
	window.height = $(window).innerHeight();
	
	gjump();
	
	$('.gallery-media').css({'width':window.width+'px', 'height':window.height+'px'});
	
	// landscape vs portrait
	if (window.width > window.height){
		$('.gallery-photo').css({'background-size':'cover'});
	} else {
		$('.gallery-photo').css({'background-size':'contain'});
	}
	
	$('#full').css({'width':(window.width * (window.gtotal + 2))+'px', 'height':window.height+'px'});
	
	gtext();
	
	if (window.height > window.width){
		$('.gallery-media').css({'background-size':'contain'});
	} else {
		$('.gallery-media').css({'background-size':'cover'});
	}
	
	if (window.gtype[gnum] == 'photo'){
		$('.gallery-video').hide();
	} else {
		$('.gallery-video').show();
	}
	
	if (window.captions){
		var the_captions = ', #captions';
	} else {
		var the_captions = '';
	}
	
	$('#slideshow-header').show();
	$('#controls').hide();
	var the_controls = ', #controls';
	
	// show slideshow
	$('#full' + the_controls + the_captions).fadeIn(window.speed, 'linear', function(){
		
		window.timer_started = false;
		
		$('#site').css({'visibility':'hidden'});
		
		$('.gallery-video').delay(500).show();
		
	});
	
	window.gallery = true;
	
}








// hide fullsized gallery slideshow

function hide_slideshow(){
	
	clearTimeout(window.mouseStopped);
	
	if ($('#full').css('display') != 'none'){
		
		if (window.gtype[gnum] == 'photo'){
			$('.gallery-video').hide();
		}
		
		$('#site').css({'visibility':'visible', 'padding-right':'0px'});
		$("html, body").animate({ scrollTop: ($('#thumbs').offset().top - 150) }, 1);
		
		$('html, body').css({'overflow':'visible'});
		
		if (window.captions){
			var the_captions = ', #captions';
		} else {
			var the_captions = '';
		}
		
		// hide slideshow
		$.when($('#full, #controls' + the_captions).fadeOut(window.speed, 'linear')).done(function(){
			
			$('#slideshow-header').hide();
			$('#captions').hide();
			
		});
		
		window.gallery = false;
		
	}
}




// when Escape and Arrows keys are pressed during fullsized gallery slideshow

$(document).keydown(function(e){
	
	if (window.gallery){
		
		if(e.which == 32){// spacebar
			window.gnum++;
			window.dir = 'same';
			slide();
        	return false;
		}
		
		if (e.keyCode == 37){// left arrow
			window.gnum--;
			window.dir = 'same';
			slide();
			return false;
		}
		
		if (e.keyCode == 39){// right arrow
			window.gnum++;
			window.dir = 'same';
			slide();
			return false;
		}
		
		if (e.keyCode == 38){// up arrow
			if (!window.captions){
				show_captions();
			}
			start_mouse_timer();
			return false;
		}
		
		if (e.keyCode == 40){// down arrow
			if (window.captions){
				hide_captions();
			}
			return false;
		}
		
		if (e.keyCode == 27){// escape
			hide_slideshow();
			return false;
		}
		
	}
	
});















































// when mouse is moved during fullsized gallery slideshow (after mouse button is pushed down but not yet released)

$('body').mousemove(function(e){
	e.preventDefault();
	
	window.x = e.pageX;
	window.y = e.pageY;

	if (window.g){
		$('#full').css({'left':(window.x-window.xp)+'px'});
	}
	
	if ($('#full').css('display') != 'none' && window.gallery){
		start_mouse_timer();
	}
	
});






// hide gallery slideshow buttons if mouse doesn' move for two seconds

window.delay_seconds_after_stop = 2;// 2 second delay before hiding gallery slideshow buttons
window.timer_started = false;// DO NOT EDIT THIS LINE

function start_mouse_timer(){
	
	clearTimeout(window.mouseStopped);
	
	if (!window.timer_started){
		$('#controls').fadeIn(300);
	}
	
	window.timer_started = true;
	
	window.mouseStopped = setTimeout(function(){
		
		// DO STUFF HERE AFTER MOUSE STOPS DURING GALLERY ////////////////
		if (window.gtype[gnum] == 'photo'){
			
			$('#controls').fadeOut(500);
			
			window.timer_started = false;// DO NOT EDIT THIS LINE
			
		}
		// ///////////////////////////////////////////////////////////////
		
	}, window.delay_seconds_after_stop * 1000);
	
	
	
}






// when mouse button is released during fullsized gallery slideshow

$('#full').mouseup(function(e){
	
	var p = parseInt($('#full').css('left'));
    window.g = false;
    window.xf = e.pageX;
    
    if (window.xf == window.xs){
    	window.dir = 'same';
    } else if (window.xf < window.xs){
    	window.dir = 'left';
    } else if (window.xf > window.xs){
    	window.dir = 'right';
    }


    
    if (e.pageX >= window.width * 0.5 && e.pageX <= window.width * 0.5 && window.dir == 'same'){
		window.gnum++;
    } else if ((e.pageX > window.width * 0.5 && window.dir == 'same') || window.dir == 'left'){
		window.gnum++;
    } else if ((e.pageX < window.width * 0.5 && window.dir == 'same') || window.dir == 'right'){
		window.gnum--;
    }
    
    slide();
    
});

$('#gallery-left').click(function(){
	
	window.gnum--;
	window.dir = 'same';
	slide();
	
});

$('#gallery-right').click(function(){
	
	window.gnum++;
	window.dir = 'same';
	slide();
	
});

$('#toggle-captions').click(function(){
	
	if (window.captions){
		hide_captions();
	} else {
		show_captions();
	}
	
	start_mouse_timer();
	
});

function show_captions(){
	$('#captions').show().css({'bottom':-$('#captions').height()+'px'}).animate({'bottom':'0px'}, window.speed * 0.5, 'easeInOutExpo');
	window.captions = true;
}

$('#hide-captions').click(function(){
	
	hide_captions();
	
});

function hide_captions(){
	$('#captions').css({'bottom':'0px'}).animate({'bottom':(-$('#captions').height())+'px'}, window.speed * 0.5, 'easeInOutExpo');
	window.captions = false;
}

function slide(){
	
	var jump = -((window.width * window.gnum) - (window.width)) - window.width;
	
    if (window.gnum < 1){
    	window.gnum = window.gtotal;
    } else if (window.gnum > window.gtotal){
    	window.gnum = 1;
    }
    
	gtext();
	
	$('.gallery-caption-content').hide();
	
	$('.gallery-caption-content').fadeIn(450, 'linear');
	
	if (window.dir == 'same'){
	    $('#full').animate({left:jump + 'px'}, 500, 'easeInOutExpo', function(){
	    	gjump();
	    });
	} else {
	    $('#full').animate({left:jump + 'px'}, 500, 'easeOutExpo', function(){
	    	gjump();
	    });
	}
	
	if (window.gtype[gnum] == 'photo'){
	} else {
		$('#controls').fadeIn();
	}
	clearTimeout(window.mouseStopped);
	window.timer_started = false;
	start_mouse_timer();
	
}

function gjump(){
	
	$('#full').css({left:-(window.width * window.gnum) + 'px'});
	
}

function gtext(){
	
	if (window.gheader[window.gnum] != ''){
		$('#gallery-header').fadeIn();
		$('#gallery-header').html(window.gheader[window.gnum]);
	} else {
		$('#gallery-header').fadeOut();
	}
	
	$('#gallery-title').html(window.gtitle[window.gnum]);
	
	$('#gallery-description').html(window.gdescription[window.gnum]);
	
	window.gbutton[window.gnum] = $.trim(window.gbutton[window.gnum]);
	window.glink[window.gnum] = $.trim(window.glink[window.gnum]);
	
	if (window.glink[window.gnum] != '' && window.glink[window.gnum].indexOf('http://') == -1 && window.glink[window.gnum].indexOf('https://') == -1){
		window.glink[window.gnum] = 'http://' + window.glink[window.gnum];
	}
	
	if (window.gbutton[window.gnum] != '' && window.glink[window.gnum] != ''){
		$('#gallery-link').html('<a class="button-caption" href="' + window.glink[window.gnum] + '" target="_blank">' + window.gbutton[window.gnum] + '</a>');
	} else {
		$('#gallery-link').html('&nbsp;');
	}
	
	if (!window.captions){
		$('#captions').css({'bottom':-$('#captions').height()+'px'});
	}
	
}







