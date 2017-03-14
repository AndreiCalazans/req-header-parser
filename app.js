var express =  require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const useragent = require('useragent');
const PORT  = process.env.PORT || 3000;


app.use(function(req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https'){
    res.redirect('http://'+ req.hostname + req.url);
  }else {
    next();
  }
});
app.use(bodyParser.urlencoded({exteneded: false}));
app.use(bodyParser.json());

app.get('/' , function(req, res, next) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/whoami', function(req, res, next) {
  var agent = useragent.parse(req.headers['user-agent']);
  var response = {
    "ipaddress": req.ip,
    "language": req.acceptsLanguages()[0],
    "software": agent.os.toString()
  };
    res.json(response);
})

app.listen(PORT, function() {
  console.log('server is up on port ' + PORT);
});
