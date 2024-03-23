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

const getMessages = async (channelName: string, filter: string, finishCallback: Function) => {
  const data = {
    channel: `private-${channelName}`,
    type: filter
  };
  try{
    const response = await API.post(`/messages/all`, data);
    return response.data;
  }catch(e){
    console.log(e)
    return [];
  }finally{
    finishCallback()
  }
};

const deleteMessage = async (callback: Function, finishCallback: Function, id?: string) => {
  try{
    const response = await API.delete(`/messages/delete/${id}`);
    callback()
  }catch(e){
    console.log(e);
  }finally{
    finishCallback()
  }
}

export {
  postMessage,
  getMessages,
  deleteMessage
};