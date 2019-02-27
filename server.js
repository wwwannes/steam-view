var express = require('express');

var app = express();
var request = require('request');

app.set('port', 3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/GetSteamID', function(req, res) {
	var steamkey = req.query.key;
  var username = req.query.username;

	var url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key='+steamkey+'&vanityurl='+username;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetProfile', function(req, res) {
	var steamkey = req.query.key;
  var userid = req.query.steamids;

	var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+steamkey+'&steamids='+userid+'&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetFriendList', function(req, res) {
	var steamkey = req.query.key;
  var userid = req.query.steamid;

	var url = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key='+steamkey+'&steamid='+userid+'&relationship=friend&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetProfileLevel', function(req, res) {
	var steamkey = req.query.key;
  var userid = req.query.steamid;

	var url = 'http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key='+steamkey+'&steamid='+userid;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetOwnedGames', function(req, res) {
	var steamkey = req.query.key;
  var userid = req.query.steamid;

	var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+steamkey+'&steamid='+userid+'&include_appinfo=1&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetPlayerAchievements', function(req, res) {
	var steamkey = req.query.key;
  var userid = req.query.steamid;
  var appid = req.query.appid;

	var url = 'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid='+appid+'&key='+steamkey+'&steamid='+userid+'&include_appinfo=1&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetRecentlyPlayedGames', function(req, res) {
	var steamkey = req.query.key;
  var userid = req.query.steamid;

	var url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key='+steamkey+'&steamid='+userid+'&include_appinfo=1&count=5&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetDetailsOfGame', function(req, res) {
	var appids = req.query.appid; //needs to be comma seperated

	var url = 'https://store.steampowered.com/api/appdetails/?appids='+appids;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetPriceOfGame', function(req, res) {
	var appids = req.query.appid; //needs to be comma seperated

	var url = 'https://store.steampowered.com/api/appdetails/?appids='+appids+'&filters=price_overview';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.get('/GetTopGames', function(req, res) {
	var url = 'http://steamspy.com/api.php?request=top100forever';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
