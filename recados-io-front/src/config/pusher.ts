import Pusher from 'pusher-js';

const pusher = new Pusher(
  '1c458ef2083750c2ffa9',
  {
    cluster: 'us2',
    authEndpoint: 'http://localhost:8888/pusher/auth'
  }
);

export default pusher;