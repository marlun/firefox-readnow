self.port.on('makeReadable', function(prefs) {
	styleTarget(findTargetElement(), prefs);
});

function styleTarget(target, prefs) {
	let headers = target.querySelectorAll('h1,h2,h3,h4');
	let styles = parseStyles(prefs['style-header']);
	styleElements(headers, styles);

	let paragraphs = target.querySelectorAll('p');
	let styles = parseStyles(prefs['style-paragraphs']);
	styleElements(paragraphs, styles);

	let listItems = target.querySelectorAll('li');
	let styles = parseStyles(prefs['style-list-items']);
	styleElements(listItems, styles);

	let codeListings = target.querySelectorAll('pre,code,.code');
	let styles = parseStyles(prefs['style-code-listings']);
	styleElements(codeListings, styles);
}

function styleElements(elements, styles) {
	for (let el of elements) {
		for (let {name, value} of styles) {
			el.style[name] = value;
		}
	}
}

function findTargetElement() {
	let mostParagraphs = 0;
	let target = null;
	let selectors = [
		'div[class*="content"]',
		'div[class*="main"]',
		'div[class*="body"]',
		'article'
	];
	let elements = document.querySelectorAll(selectors.join(','));
	for (let el of elements) {
		let count = el.querySelectorAll('p').length;
		if (count > mostParagraphs) {
			mostParagraphs = count;
			target = el;
		}
	}

	return target;
}

function parseStyles(prefString) {
	let prefs = [];
	let pairs = prefString.split(',');
	for (let pair of pairs) {
		let [name, value] = pair.split(':');
		prefs.push({name, value});
	}
	return prefs;
}
