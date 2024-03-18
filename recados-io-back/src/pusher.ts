import Pusher from 'pusher';

const pusher = new Pusher({
    appId:'1769831',
    // key: '1c458ef2083750c2ffa9',
    // secret: '126ba7cd283cef7f1b96',
    key: process.env.PUSHER_CONNECTION_KEY || '',
    secret: process.env.PUSHER_CONNECTION_SECRET || '',
    cluster: 'us2',
    useTLS: true
});

export { pusher }