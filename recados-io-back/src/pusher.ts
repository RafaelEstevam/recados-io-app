import Pusher from 'pusher';

const pusher = new Pusher({
    appId:'1769831',
    key: process.env.PUSHER_CONNECTION_KEY || '',
    secret: process.env.PUSHER_CONNECTION_SECRET || '',
    cluster: 'us2',
    useTLS: true
});

export { pusher }