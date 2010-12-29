// ==UserScript==
// @include http://*
// @include https://*
// ==/UserScript==

var active = false;

function toggleFirebug() {
	var firebugEl = document.getElementById('FirebugLite');
	if( firebugEl ) {
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).removeChild(firebugEl);
		updateStatus(false);
	} else {
		firebugEl = document.createElementNS && document.documentElement.namespaceURI;
		firebugEl = firebugEl ? document.createElementNS	(firebugEl, 'script') : document.createElement('script');
		firebugEl.setAttribute('id', 'FirebugLite');
		firebugEl.setAttribute('src', 'https://getfirebug.com/firebug-lite.js#startOpened');
		firebugEl.setAttribute('FirebugLite', '4');
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(firebugEl);
		firebugEl = new Image;
		firebugEl.setAttribute('src', 'https://getfirebug.com/releases/lite/latest/skin/xp/sprite.png');
		updateStatus(true);
	}
}

function updateStatus(isActive) {
	opera.extension.postMessage({
		action: 'updateStatus',
		status: isActive ? '1' : '0'
	});
}

opera.extension.addEventListener( 'message', function( msg ) {
	if(msg.data.action == 'toggleFirebug' || msg.data.action == 'autoRun')
		toggleFirebug();
}, false);

opera.extension.postMessage({
	action: 'load'
});
