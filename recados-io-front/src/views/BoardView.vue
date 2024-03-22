<template>
  <div class="board view">
    <headerComponent />

    <Filter
      :messages="messages.length"
      :connectedUsers="connectedUsers"
      @filterAction="handleFilter"
    />
    
    <div class="board__messages" >
      <message
        :message="message"
        :key="message._id"
        v-if="messages.length > 0"
        v-for="message in messages"
        @handleGetMessagesByChannel="handleGetMessagesByChannel"
        @handleRefreshMessagesListOfChannel="handleRefreshMessagesListOfChannel"
      />
      <h2 v-else class="board__title">Sem recados neste mural.</h2>
    </div>

    <modal
      :modalTitle="'Novo recado'"
      :showModal="showModal"
      @closeModal="handleCloseModal"
    >
      <addMessage @handleClientActions="handleClientActions"/>
    </modal>

  </div>
</template>

<script lang="ts">

  import { getMessages } from '@/services/message';
  import { MessageInterface } from '@/interfaces/message.interface';
  import { UserInterface } from '@/interfaces/user.interface';

  import { computed, defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';

  // import API from '@/config/api';
  import pusher from '@/config/pusher';
  import scrollDown from '@/utils/scrollDown';

  import HeaderComponent from '@/components/Header.vue';
  import Message from '@/components/Message.vue';
  import Modal from '@/components/Modal.vue';
  import ButtonComponent from '@/components/Button.vue';
  import Filter from '@/components/Filter.vue';

  import AddMessage from '@/modules/AddMessage.vue';

  export default defineComponent({
    name: 'board',
    components: {
    HeaderComponent,
    ButtonComponent,
    Filter,
    Message,
    Modal,
    AddMessage
  },
    
    setup() {
      const store = useStore();
      const route = useRoute();

      const channelName = `private-${route.params.channel}`;
      const channel = pusher.subscribe(channelName);
      const channelEvent = 'client-my-event';
      
      const showModal = computed(() => store.state.showModal)

      return {
        $store: store,
        route,
        showModal,
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
        connectedUsers: 0
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
        this.$store.dispatch('handleShowLoading', {showLoading: true});
        this.messages = await getMessages(this.channelName, filter, this.handleFinishinRequest);
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

          if(data.type === 'list-updated'){
            this.handleGetMessagesByChannel('undefined');
          }
          
        });

        this.channel.bind('pusher:subscription_count', (data: any) => {
          this.connectedUsers = data.subscription_count;
        })
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
        await this.handleGetMessagesByChannel('undefined');
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
      },

      handleRefreshMessagesListOfChannel(){
        this.channel.trigger(this.channelEvent, {
          type: "list-updated"
        })
      },

      handleCloseModal(){
        this.$store.dispatch('handleShowModal', {showModal: false})
      },

      handleFinishinRequest(){
        this.$store.dispatch('handleShowLoading', {showLoading: false});
      },

    },

    beforeRouteLeave(){
      pusher.unsubscribe(this.channelName);
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

    @media(max-width: $screen-xs){
      flex-direction: column;
    }

    .board__title{
      text-align: center;
      width: 100%;
    }

  }

</style>