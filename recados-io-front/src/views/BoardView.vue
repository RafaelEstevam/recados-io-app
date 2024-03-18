<template>
  <div class="board view">
    <h1>Board</h1>
    <div class="board__messages">
      <div v-for="message in messages" :key="message._id">
        <message :message="message" />
      </div>
      <button @click="setShow(true)">+ Add recado</button>
      <modal v-if="show" @setShow="setShow"/>
    </div>
  </div>
</template>

<script lang="ts">

  import Message from '@/components/Message.vue';
  import Modal from '@/components/Modal.vue';
  import API from '@/config/api';
  import pusher from '@/config/pusher';
import { MessageInterface } from '@/interfaces/message.interface';

  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

  // const channelName = 'my-channel';
  // const channel = pusher.subscribe(channelName);

  export default defineComponent({
    name: 'board',
    components: {
      Message,
      Modal
    },
    
    setup() {
      const route = useRoute();
      const channelName = `private-${route.params.channel}`;
      const channel = pusher.subscribe(channelName);
      const channelEvent = 'client-my-event';

      return {
        route,
        channelEvent,
        channelName,
        channel,
      };
    },

    data(): any{

      return {
        messages: new Array<MessageInterface>(),
        auth: '',
        showTyping: false,
        show: false
      }
    },
    
    mounted(){
      // const {channel} = this.$route.params;
      // this.handlePusherConnect(channel);
      // await this.handlePusherLogin();
      this.handleGetMessagesByChannel();
      this.handleConnect();
      // this.handleLogin();
      // await this.handleConnect();
    },

    created() {
    },

    methods: {
      setShow(show:boolean){
        this.show = show
      },

      async handleGetMessagesByChannel(){
        try{
          const response = await API.get(`/messages/all/${this.$route.params.channel}`);
          this.messages = response.data;
        }catch(e){
          console.log(e)
        }
      },

      // handleLogin(){
      //   this.socket_id = pusher.connection.socket_id;
      //   const data = {
      //     socket_id: pusher.connection.socket_id,
      //     user_id: new Date().getTime(),
      //     channel: this.channelName
      //   };
      //   API.post('/pusher/auth', data).then((response:any) => {
      //     this.auth = response.data.auth;
      //   });
      // },

      handleConnect(){
        this.channel = pusher.subscribe(this.channelName);

        this.channel.bind(this.channelEvent, (data:any) => {

          if(data.type === 'message'){
            const newMessage:MessageInterface = {
              _id: data.message._id,
              author: data.message.author,
              date: data.message.date,
              text: data.message.text,
              type: data.message.type,
              channel: data.message.channel
            };
            
            this.messages.push(newMessage);
          };

          if(data.type === 'typing'){
            this.showTyping = true
          }

          if(data.type === 'not-typing'){
            this.showTyping = false
          }
        }); 
      }

      // handlePusherLogin: () => {
        // console.log(pusher.connection);
        // console.log(pusher.connection.socket_id);

        // const data = {
        //   socket_id: pusher.connection.socket_id,
        //   user_id: new Date().getTime(),
        //   channel: channelName
        // };

        // console.log(data);

        // try{
        //   const auth = await API.post('/pusher/auth', data);
        // }catch(e){
        //   console.log(e);
        // }
      // },

      // handlePusherConnect(channelName?: any){
      //   this.channel = pusher.subscribe(channelName);

      //   this.channel.bind(this.channelEvent, (data:any) => {
      //     if(data.type === 'message'){
      //         const newMessage:MessageProps = {
      //             id: (new Date().getTime()).toString(),
      //             author: 'teste',
      //             date: (new Date().getTime()).toString(),
      //             text: data.message,
      //             type: 'not-important'
      //         }
      //         this.messages.push(newMessage);
      //     }

      //     if(data.type === 'typing'){
      //         this.showTyping = true
      //     }

      //     if(data.type === 'not-typing'){
      //         this.showTyping = false
      //     }
      //   }); 
      // }
    }
    
  });
</script>

<style scoped lang="scss">
  @import  '@/styles/tokens.scss';
  .board{
    background-color: $light-color;
  };

  .board__messages{
    width: 100%;
    padding: $spacing-md;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: $spacing-lg;
  }

</style>