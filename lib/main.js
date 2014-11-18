const buttons = require("sdk/ui/button/action");
const self = require("sdk/self");
const tabs = require("sdk/tabs");
const Hotkey = require('sdk/hotkeys').Hotkey;
const prefs = require('sdk/simple-prefs').prefs;

let actionHotkey = Hotkey({
	combo: prefs['hotkey'],
	onPress: function() {
		makeReadable();
	}
})

let button = buttons.ActionButton({
	id: "readnow-link",
	label: "Make main content readable in place",
	icon: {
		"16": "./readnow.png",
		"32": "./readnow-64.png",
		"64": "./readnow-64.png"
	},
	onClick: function() {
		makeReadable();
	}
});

function makeReadable() {
	let worker = tabs.activeTab.attach({
		contentScriptFile: self.data.url("readnow.js")
	})
	worker.port.emit('makeReadable', prefs);
}
