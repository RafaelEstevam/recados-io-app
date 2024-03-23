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
      <addMessage @handleClientSendMessage="handleClientSendMessage"/>
    </modal>

  </div>
</template>

<script lang="ts">

  import { computed, defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';

  import { getMessages } from '@/services/message';
  import { PusherConnection, PusherMessage } from '@/services/pusher';
  import { MessageInterface } from '@/interfaces/message.interface';

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
      const channelName = `${route.params.channel}`;
      const showModal = computed(() => store.state.showModal);
      const user = computed(() => store.state.user);

      const channel = new PusherConnection(channelName);
      channel.handleConnect();

      return {
        $store: store,
        route,
        user,
        showModal,
        channel,
        channelName,
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
        connectedUsers: 0,
        channel: '',
      }
    },
    
    mounted(){
      this.handleGetMessagesByChannel('undefined');
      this.handleConnectinOnBoard();
    },

    watch:{
      messages(newValue){
        this.normal = newValue.filter((item: MessageInterface) => item.type === 'not-important').length;
        this.important = newValue.filter((item: MessageInterface) => item.type === 'important').length;
        this.urgent = newValue.filter((item: MessageInterface) => item.type === 'urgent').length;
      },
      showModal(show){
        if(show){
          this.handleClientTyping();
        }
      }
    },

    methods: {

      async handleGetMessagesByChannel(filter:string){
        this.$store.dispatch('handleShowLoading', {showLoading: true});
        this.messages = await getMessages(this.channelName, filter, this.handleFinishinRequest);
      },

      setShow(show:boolean){
        this.show = show
      },

      handleCountConnection(data:any){
        this.connectedUsers = data.subscription_count;
      },

      handleNewMessage({data}:any){
        const newMessage:MessageInterface = {
          _id: data._id,
          author: data.author,
          date: data.date,
          text: data.text,
          type: data.type,
          channel: data.channel
        };

        this.messages.push(newMessage);
        scrollDown();
      },

      handleUserIsTyping({data}:any){
        this.$toast.info(`Usuário ${!data.isAnonymous ? data.userName : 'Anônimo'} está deixando um recado`);
      },

      handleListUpdatedOnBoard(){
        this.$toast.default(`A lista foi atualizada.`,);
        this.handleGetMessagesByChannel('undefined');
      },

      handleMessagesOnBoard(bindData:any){
        PusherMessage(bindData, this.handleNewMessage, this.handleUserIsTyping, this.handleListUpdatedOnBoard)
      },

      handleConnectinOnBoard(){
        this.channel.handleBindOnChannelByBindName('client-my-event', this.handleMessagesOnBoard);
        this.channel.handleBindOnChannelByBindName('pusher:subscription_count', this.handleCountConnection)
      },

      handleClientTyping(){
        this.channel.handleTrigger({data: this.user, type: 'typing'})
      },

      handleClientSendMessage(data: any){
        this.channel.handleTrigger({data, type: 'message'});
        this.handleListUpdatedOnBoard();
        scrollDown();
      },

      handleRefreshMessagesListOfChannel(){
        this.channel.handleTrigger({type: "list-updated"})
      },

      handleFilter(filter:string){
        this.handleGetMessagesByChannel(filter);
      },

      handleCloseModal(){
        this.$store.dispatch('handleShowModal', {showModal: false})
      },

      handleFinishinRequest(){
        this.$store.dispatch('handleShowLoading', {showLoading: false});
      },

    },

    beforeRouteLeave(){
      this.channel.handleUnsubscribe();
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