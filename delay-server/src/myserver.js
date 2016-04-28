var express = require('express');
var suspend = require('suspend');
var app = express();
 
delayControl = function() {
  var delay = 0;
  return {delayedResponse :
          function(res) {
            var hangtime = delay*1000;
            console.log('sending after '+ hangtime + ' milliseconds');
            setTimeout(function () {
              res.send('Hello World');
              console.log('sent');
            }, hangtime);
          },
          setDelay :
          function(req, res) {
            delay = req.params.delay;
            res.send("delay set to " + delay + " seconds")
          }}
}()

app.get('/hello', function (req, res) {
  delayControl.delayedResponse(res);
})

app.get('/delay/:delay', function(req, res) {
  delayControl.setDelay(req, res);
})
 
app.listen(3000);