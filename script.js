var element
TomatoType = {
  x: 0,
  y: 0,
  rotate: 0,
  splatter: false,
  fadeAway: false,
};

const b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function dec(data) {
  data = data.replace(new RegExp('[^' + b + '=]', 'g'), '');
  return (data.replace(/./g, function(x) {
      if (x === '=') return '';
      let r = '', f = b.indexOf(x);
      for (let i = 6; i >= 1; i--) {
          r += (f % Math.pow(2, i) - f % Math.pow(2, i - 1) > 0 ? '1' : '0');
      }
      return r;
  }).replace(/\d\d\d?\d?\d?\d?\d?\d?/g, function(x) {
      if (x.length !== 8) return '';
      let c = 0;
      for (let i = 1; i <= 8; i++) {
          c += (x.charAt(i - 1) === '1' ? Math.pow(2, 8 - i) : 0);
      }
      return String.fromCharCode(c);
  }));
}


var urlParams = new URLSearchParams(window.location.search);

const encryptedData = urlParams.get('key');  
const decryptedData = dec(encryptedData)
console.log(decryptedData)
var arr = decryptedData.split(":")
const oauthToken =arr[0];  
const broadcasterID =arr[1];
const rewardID = arr[2];


function listen(topic) {
  message = {
      type: 'LISTEN',
      nonce: "",
      data: {
          topics: [topic],
          auth_token: oauthToken
      }
  };
  
  ws.send(JSON.stringify(message));
}

const ws = new WebSocket('wss://pubsub-edge.twitch.tv');
ws.addEventListener('open', () => {
  console.log("subscribing to topics");
  console.log(broadcasterID)
  console.log(oauthToken)  
  ws.onmessage = function(event) {
    message = JSON.parse(event.data);
    handleMsg(message)
  };

  // var cmd = `{"type":"LISTEN", "data": {"topics": ["channel-points-channel-v1.${broadcasterID}"],"auth_token": "${oauthToken}"}}`;
  // this.ws.send(cmd);
  ping()
  listen("channel-points-channel-v1"+"."+broadcasterID);
  if(broadcasterID=="46249037")
    listen("chat_moderator_actions"+"."+broadcasterID+"."+broadcasterID);

});


function handleMsg(event){
  data = event.data || ""
  topic = data.topic || ""
  console.log(event)
  if(topic=="chat_moderator_actions"+"."+broadcasterID+"."+broadcasterID)
    throwTomato()
  else if (topic=="channel-points-channel-v1"+"."+broadcasterID ) {
    message=event.data.message
    redemption= message.data.redemption
    redemptionID = redemption.reward.id
    if(redemptionID==rewardID)
      throwTomato()
  }
}

function throwTomato(){
  tomato= TomatoType = {
    x: Math.random()*100,
    y: Math.random()*100,
    rotate: Math.random()*360,
    splatter: false,
    fadeAway: false
  }
  tomatoElement= createTomatoElement(tomato)
  container = document.getElementById("tomatoContainer");
  container.appendChild(tomatoElement);    
}


function ping(){
  console.log("ping")
  ws.send('{"type":"PING"}');
  setTimeout(ping,60000);
}