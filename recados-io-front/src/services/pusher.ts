import pusher from '@/config/pusher';
import { MessageInterface } from '@/interfaces/message.interface';

class PusherConnection {

  public channel:any;
  private channelName: string = '';
  private channelEvent: string = 'client-my-event';

  constructor(channelName: string){
    this.channelName = `private-${channelName}`
    this.channel = pusher.subscribe(channelName);
  };

  handleConnect(){
    this.channel = pusher.subscribe(this.channelName);
  };

  handleTrigger(data:any){
    this.channel.trigger(this.channelEvent, data)
  };

  handleBindOnChannelByBindName(eventName: string = 'client-my-event', bindCallback: Function){
    this.channel.bind(eventName, (data:any) => {
      bindCallback(data);
    });
  }

  handleGetPusherConnection(){
    return this.channel;
  };

  handleUnsubscribe(){
    pusher.unsubscribe(this.channelName);
  };

}

const PusherMessage = (data: any, messageCallback: Function, typingCallback: Function, listUpdated: Function) => {

  if(data.type === 'message'){
    messageCallback(data);
  };

  if(data.type === 'typing'){
    typingCallback(data);
  }

  if(data.type === 'list-updated'){
    listUpdated(data);
  }
}

export {
  PusherConnection,
  PusherMessage
};