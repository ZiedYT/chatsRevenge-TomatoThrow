var element
TomatoType = {
  x: 0,
  y: 0,
  rotate: 0,
  splatter: false,
  fadeAway: false,
};



var urlParams = new URLSearchParams(window.location.search);
const channelname = urlParams.get('channel'); 
const oauthToken =urlParams.get('token');  
const broadcasterID = urlParams.get('id');  
const rewardID = urlParams.get('reward'); 


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
  listen("channel-points-channel-v1"+"."+broadcasterID);
  if(channelname.toLowerCase()=="ziedyt")
    listen("chat_moderator_actions"+"."+broadcasterID+"."+broadcasterID);
});


function handleMsg(event){
  data = event.data || ""
  topic = data.topic || ""
  console.log(topic)
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