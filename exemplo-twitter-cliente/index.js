const socket = io('http://localhost:3000');

const mostrarTweet = tweet => {
    console.log(tweet);
    const { text, extended_tweet, retweeted_status, user } = tweet;

    let texto = '';
    if(retweeted_status) {
        texto = retweeted_status.extended_tweet 
            ? retweeted_status.extended_tweet.full_text
            : text;
    } else {
        texto = extended_tweet ? extended_tweet.full_text : text;
    }
    
    const novoTweet = `
        <div class="tweet">
            <img src="${user.profile_image_url}" alt="Thumb usuário">
            <span><b>${user.screen_name}:</b> ${texto}</span>
        </div>
    `;

    $('#tweets').append(novoTweet);
}

socket.on('tweet', tweet => mostrarTweet(tweet));

var Twit = require('twit');
const express = require('express');
const app = express();
const server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');



// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));





io.on('connection', function(socket) {

    T.get('search/tweets', { q: 'bolsonaro', count: 100 }, function(err, data, response) {
      var tweetArray=[];
        for (let index = 0; index < data.statuses.length; index++) {
            const tweet = data.statuses[index];
            var tweetbody = {
              'text': tweet.text,
              'userScreenName': "@" + tweet.user.screen_name,            
              'userDeion': tweet.user.deion,
            }
          }
        io.emit('allTweet',tweetArray)
    })

    var stream = T.stream('statuses/filter', { track: 'bolsonaro', language: 'en' })

    stream.on('tweet', function (tweet) {
        io.emit('tweet',{ 'tweet': tweet });
    })
});

var T = new Twit({
  consumer_key:         'Of5GTNKVpoS1b5FIgdcUkWxDD',
  consumer_secret:      'T6nAUt32p4YQuZOjUODcUQv3qzhbHdJjrH0FYSgdrTyYWGvkLP',
  access_token:         '155238701-kjeyVyo1baHwQQ8786EBXAnILrCuC3UzCkmGPk7r',
  access_token_secret:  '6vLbDEGOb4m8L7t9PixkXzXc5UtCF9vdBng3fgyFRu3mx',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
