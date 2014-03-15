

// javascript detect browser

var agent = navigator.userAgent;
var bn  = navigator.appName;
var nametemp, vertemp;

if ((vertemp = agent.indexOf("Opera")) != -1) {
	bn = "opera";
} else if ((vertemp = agent.indexOf("MSIE")) != -1) {
	bn = "ie";
} else if ((vertemp = agent.indexOf("Chrome")) != -1) {
	bn = "chrome";
} else if ((vertemp = agent.indexOf("Safari")) != -1) {
	bn = "safari";
} else if ((vertemp = agent.indexOf("Firefox")) != -1) {
	bn = "firefox";
} else if ( (nametemp = agent.lastIndexOf(' ')+1) < (vertemp = agent.lastIndexOf('/')) ) {
	bn = agent.substring(nametemp, vertemp);
	if (bn.toLowerCase() == bn.toUpperCase()) {
		bn = navigator.appName;
	}
}

window.browser = bn;
