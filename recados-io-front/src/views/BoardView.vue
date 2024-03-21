<template>
  <div class="board view">
    <headerComponent />

    <Filter
      :messages="messages.length"
      @filterAction="handleFilter"
    />
    
    <div class="board__messages">
      <div v-if="messages.length > 0" v-for="message in messages" :key="message._id">
        <message
          :message="message"
          @handleGetMessagesByChannel="handleGetMessagesByChannel"
        />
      </div>
      <h2 v-else class="board__title">Sem recados neste mural.</h2>
      <modal
        @handleClientActions="handleClientActions"
      />
    </div>

  </div>
</template>

<script lang="ts">

  import API from '@/config/api';
  import pusher from '@/config/pusher';
  import scrollDown from '@/utils/scrollDown';

  import HeaderComponent from '@/components/Header.vue';
  import Message from '@/components/Message.vue';
  import Modal from '@/components/Modal.vue';
  import ButtonComponent from '@/components/Button.vue';
  import Filter from '@/components/Filter.vue';

  import { MessageInterface } from '@/interfaces/message.interface';
  import { UserInterface } from '@/interfaces/user.interface';

  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'board',
    components: {
      HeaderComponent,
      ButtonComponent,
      Filter,
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
        show: false,
        important: 0,
        urgent: 0,
        normal: 0,
      }
    },
    
    mounted(){
      this.handleGetMessagesByChannel('undefined');
      this.handleConnect();
    },

    watch:{
      messages(newValue){
        this.normal = newValue.filter((item: MessageInterface) => item.type === 'not-important').length;
        this.important = newValue.filter((item: MessageInterface) => item.type === 'important').length;
        this.urgent = newValue.filter((item: MessageInterface) => item.type === 'urgent').length;
      }
    },

    methods: {

      setShow(show:boolean){
        this.show = show
      },

      async handleGetMessagesByChannel(filter:string){

        const data = {
          channel: this.channelName,
          type: filter
        };

        try{
          const response = await API.post(`/messages/all`, data);
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
      },

      handleFilter(filter:string){
        this.handleGetMessagesByChannel(filter);
      }

    }
    
  });
</script>

<style scoped lang="scss">
  @import  '@/styles/tokens.scss';
  .board{
    background-color: $light-color;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  };

  .board__filter{
    display: flex;
    gap: $spacing-md;
    align-items: center;
  }
  .board__title{
    text-align: left;
    padding: 0 $spacing-xxl;
  }

  .board__messages{
    width: 100%;
    padding: $spacing-xxl;
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-lg;

    @media(max-width: $screen-sm){
      padding-bottom: $spacing-xxl * 3;
    }

    .board__title{
      text-align: center;
      width: 100%;
    }

  }

</style>