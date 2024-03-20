<template>
  <div class="board view">
    <headerComponent />
    <div class="board__messages">
      <div v-for="message in messages" :key="message._id">
        <message
          :message="message"
          @handleGetMessagesByChannel="handleGetMessagesByChannel"
        />
      </div>
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
  import scrollDown from '@/utils/scrollDown'

  import { MessageInterface } from '@/interfaces/message.interface';
  import { UserInterface } from '@/interfaces/user.interface';

  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useToast } from 'vue-toast-notification';

  export default defineComponent({
    name: 'board',
    components: {
      HeaderComponent,
      Message,
      Modal
    },
    
    setup() {
      const $toast = useToast();
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
            scrollDown();

          };

          if(data.type === 'typing'){
            this.$toast.info(`Usuário ${!data.isAnonymous ? data.userName : 'Anônimo'} está deixando um recado`);
          }
          
        }); 
      },

      handleClientActions(action:string, data:any){
        switch(action){
          case 'typing':
            this.handleClientTyping(data)
            break;
          default:
            this.handleSendToChannel(data)
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

      handleClientTyping(data: UserInterface){
        this.channel.trigger(this.channelEvent, {
          channelName: this.channelName,
          id: data.id,
          userName: data.userName,
          isAnonymous: data.isAnonymous ,
          type: "typing"
        });
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