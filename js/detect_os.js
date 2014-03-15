

// javascript detect OS

// This script sets OSName variable as follows:
// "Windows"    for all versions of Windows
// "MacOS"      for all versions of Macintosh OS
// "Linux"      for all versions of Linux
// "UNIX"       for all other UNIX flavors 
// "Unknown OS" indicates failure to detect the OS

window.os="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) window.os="windows";
if (navigator.appVersion.indexOf("Mac")!=-1) window.os="mac";
if (navigator.appVersion.indexOf("X11")!=-1) window.os="unix";
if (navigator.appVersion.indexOf("Linux")!=-1) window.os="linux";

window.device = navigator.userAgent;

if (window.device.indexOf('Android') > 0){
	window.device = 'android';
	
} else if (window.device.indexOf('iPhone') > 0){
	window.device = 'iphone';
	
} else if (window.device.indexOf('Blackberry') > 0){
	window.device = 'blackberry';
	
} else if (window.device.indexOf('iPad') > 0){
	window.device = 'ipad';
	
} else if (window.device.indexOf('Windows') > 0){
	window.device = 'windows';
	
} else if (window.device.indexOf('Mac') > 0){
	window.device = 'mac';
	
}


if (window.device == 'android' || window.device == 'iphone' || window.device == 'ipad' || window.device == 'blackberry'){
	window.is_device = true;
} else {
	window.is_device = false;
}


//alert(window.device);

/*
window.device = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
*/

//document.write('<p>Your OS: '+OSName+'</p>');

