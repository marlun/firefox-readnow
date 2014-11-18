var readnow = require("./data/readnow");

exports["test parsing styles"] = function(assert) {
	var prefString = 'fontFamily:Arial,fontSize:12px';
	var prefs = readnow.parseStyles(prefString);
  assert.equal(prefs.length, 2);
	assert.equal(prefs.fontFamily, 'Arial');
	assert.equal(prefs.fontSize, '12px');
};

// exports["test main async"] = function(assert, done) {
//   assert.pass("async Unit test running!");
//   done();
// };

require("sdk/test").run(exports);
