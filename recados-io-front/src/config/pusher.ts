import Pusher from 'pusher-js';

const pusher = new Pusher(
  process.env.VUE_APP_PUSHER_CONNECTION_KEY,
  {
    cluster: 'us2',
    authEndpoint: `${process.env.VUE_APP_API}/pusher/auth`
  }
);

export default pusher;