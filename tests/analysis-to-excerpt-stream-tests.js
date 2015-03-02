var createAnalysisToExcerptStream = require('../analysis-to-excerpt-stream').create;
var test = require('tape');
var conformAsync = require('conform-async');

test('Post packages', function postPackages(t) {
  t.plan(3);

  var tweetStream = createAnalysisToExcerptStream({
    excerptPicker: function pickFunction(analysis, done) {
      
      conformAsync.callBackOnNextTick(
        done, null, '`' + analysis.functions[0] + '`'
      );
    }
  });

  var receivedPackageCount = 0;

  tweetStream.on('data', function onData(excerpt) {
    if (receivedPackageCount === 0) {
      t.deepEqual(
        excerpt,
        {
          text: '`function validateEmailAddress (emailAddress) {`\nhttp://zombo.com',
          code: '`function validateEmailAddress (emailAddress) {`',
          url: 'http://zombo.com'
        },
        'Received package from analysis.'
      );
    }
    else {
      t.deepEqual(
        excerpt,
        {
          text: '`function prestidigitate(really, really, really, long, list, of, parameters, that, just goes on and on and on and on…\nhttp://realultimatepower.net',
          code: '`function prestidigitate(really, really, really, long, list, of, parameters, that, just goes on and on and on and one and on and on till the brink of dawn) {`',
          url: 'http://realultimatepower.net',
        },
        'Received package from analysis.'
      );
    }
    receivedPackageCount += 1;
  });

  tweetStream.on('end', function onEnd() {
    t.pass('Stream ended.');
  });

  tweetStream.write(
    {
      sha: 'hey',
      url: 'http://zombo.com',
      functions: [
        "function validateEmailAddress (emailAddress) {",
        "function(snap) {",
        "function(evt) {",
      ]
    }
  );

  tweetStream.write(
    {
      sha: 'yes',
      url: 'http://realultimatepower.net',
      functions: [
        "function prestidigitate(really, really, really, long, list, of, parameters, that, just goes on and on and on and one and on and on till the brink of dawn) {",
      ]
    }
  );

  // This should trigger the 'end' event.
  tweetStream.end();
});
