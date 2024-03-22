import API from "@/config/api";

import { MessageInterface } from "@/interfaces/message.interface";
import { UserInterface } from "@/interfaces/user.interface";

const postMessage = async (showUser: boolean, user: UserInterface, channel: string, message: string, messageType: string, callback: Function, finishCallback: Function) => {
  const data:MessageInterface = {
    author: showUser ? user.userName : 'Anônimo',
    channel: `private-${channel}`,
    text: message,
    type: messageType
  };
  try{
    const response = await API.post('/messages/new', data);
    const message:MessageInterface = response.data;
    callback(message);
  }catch(e){
    console.log(e)
  }finally{
    finishCallback()
  }
};

const getMessages = async () => {

};

const deleteMessage = async () => {

}

export {
  postMessage
};