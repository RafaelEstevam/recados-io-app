<template>
  <div class="board view">
    <headerComponent />
    <div class="board__messages">
      <div v-for="message in messages" :key="message._id">
        <message :message="message" />
      </div>
      <button @click="setShow(true)">+ Add recado</button>
      <modal
        @handleClientActions="handleClientActions"
      />
    </div>
  </div>
</template>

<script lang="ts">

  import HeaderComponent from '@/components/Header.vue';
  import Message from '@/components/Message.vue';
  import Modal from '@/components/Modal.vue';
  import API from '@/config/api';
  import pusher from '@/config/pusher';
  import { MessageInterface } from '@/interfaces/message.interface';

  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'board',
    components: {
      HeaderComponent,
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
      this.handleGetMessagesByChannel();
      this.handleConnect();
    },

    created() {
    },

    methods: {

      setShow(show:boolean){
        this.show = show
      },

      async handleGetMessagesByChannel(){
        try{
          const response = await API.get(`/messages/all/private-${this.$route.params.channel}`);
          this.messages = response.data;
        }catch(e){
          console.log(e)
        }
      },

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
      },

      handleClientActions(action:string, message:MessageInterface){
        switch(action){
          case 'typing':
            this.handleClientTyping()
            break;
          case 'not-typing':
            this.handleClientNotTyping()
            break;
          default:
            this.handleSendToChannel(message)
            break;
        }
      },

      async handleSendToChannel(message: MessageInterface){
        this.channel.trigger(this.channelEvent,{
          message,
          type: 'message'
        });

        await this.handleGetMessagesByChannel();
      },

      handleClientTyping(){
        this.channel.trigger(this.channelEvent, {channelName: this.channelName, id: '123', userName: 'teste', type: "typing"});
      },

      handleClientNotTyping(){
        this.channel.trigger(this.channelEvent, {channelName: this.channelName, id: '123', userName: 'teste', type: "not-typing"});
      }
      
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