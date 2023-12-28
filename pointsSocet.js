class ChannelPointsListener {
    constructor(token,broadcaster_id,reward_id) {
    this.ws = new WebSocket('wss://pubsub-edge.twitch.tv');
    const cmd = `{"type":"LISTEN", "data": {"topics": ["channel-points-channel-v1.${broadcaster_id}"],"auth_token": "${token}"}}`;
    this.ws.send(cmd);
    
    this.ws.addEventListener('open', () => {
        this.makeSocket();
    });

    this.ws.addEventListener('message', (event) => {
        this.handleMessage(event);
    });
    }

    spinPing() {
    const interval = setInterval(() => {
        if (!this.parent.run_flag) {
        clearInterval(interval);
        return;
        }

        console.log('pinging...');

        this.ws.send('{"type":"PING"}');
    }, 60000);
    }

    handleMessage(event) {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
    }

    makeSocket() {

    }

}
