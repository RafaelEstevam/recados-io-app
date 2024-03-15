import Pusher from 'pusher';

const pusher = new Pusher({
    appId:'1769831',
    key: '1c458ef2083750c2ffa9',
    secret: '126ba7cd283cef7f1b96',
    cluster: 'us2',
    useTLS: true
});

export { pusher }