import Pusher from 'pusher';

const pusher = new Pusher({
    appId: process.env.PUSHER_CONNECTION_ID || '',
    key: process.env.PUSHER_CONNECTION_KEY || '',
    secret: process.env.PUSHER_CONNECTION_SECRET || '',
    cluster: 'us2',
    useTLS: true
});

export { pusher }