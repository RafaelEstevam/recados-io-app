<template>
  <div class="modal" v-if="showModal">
    <div class="modal__wrapper">
      <div class="modal__wrapper__header">
        <h2 class="modal__wrapper__header__title">Novo recado</h2>
        <button @click="handleCloseModal">X</button>
      </div>
      <div class="modal__wrapper__content">
        <div>
          <div>
            <select v-model="messageType">
              <option>Selecione uma prioridade</option>
              <option value="not-important">Normal</option>
              <option value="important">Importante</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
          <div>
            <textarea @keydown="handleIsTyping" placeholder="Escreva seu recado" v-model="message" :disabled="message.length == 50"></textarea>
            <p>{{message.length}}/50</p>
          </div>

          <div v-if="user.isAnonymous">
            <p>Você entrou como um usuário anônimo.</p>
            <p>Quer se identificar no recado? <input type="checkbox" v-model="showUser" /></p>
          </div>
          
        </div>
        <div v-if="acceptGptSuggestion" class="modal__wrapper__gpt__message">
          <p>Corrigido com IA: {{ gptMessage }}</p>
        </div>
      </div>
      <div class="modal__wrapper__footer">
        <div v-if="!acceptGptSuggestion" class="modal__wrapper__footer__buttons">
          <button @click="handleSubmitToGPT" :disabled="isLoading">Salvar recado</button>
        </div>
        <div v-else class="modal__wrapper__footer__buttons">
          <button @click="handleAcceptGPTcorrection">Aceitar correção e salvar</button>
          <button @click="handleSubmit">Salvar sem correção</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import { computed, defineComponent } from "vue";

  import API from '@/config/api';
  import GPT from '@/config/gpt';

  import { MessageInterface } from '@/interfaces/message.interface';
  import { useRoute } from 'vue-router';
  import { useStore } from "vuex";

  import debounce from '@/utils/debounce';

  export default defineComponent({
    name: 'modal',

    setup() {

      const notificationTime = 2000;
      const route = useRoute();
      const store = useStore();
      const showModal = computed(() => store.state.showModal);
      const user = computed(() => store.state.user);

      return {
        route,
        $store: store,
        showModal,
        user,
        notificationTime
      };
    },
    
    data(){
      return {
        message: '',
        gptMessage: '',
        messageType: 'not-important',
        acceptGptSuggestion: false,
        isLoading: false,
        showUser: true,
        userIsTyping: false
      }
    },

    emits: ['setShow', 'handleClientActions'],
    
    methods: {

      handleCloseModal(){
        this.$store.dispatch('handleShowModal', {showModal: false})
      },
      
      handleAllowNotification(){
        this.userIsTyping = false;
      },

      handleIsTyping(){
        if(!this.userIsTyping){
          this.$emit('handleClientActions', 'typing', this.user)
          this.userIsTyping = true;
        }
        debounce(this.notificationTime, this.handleAllowNotification);
      },

      async handleSubmit(){
        const data:MessageInterface = {
          author: this.showUser ? this.user.userName : 'Anônimo',
          channel: `private-${this.$route.params.channel}`,
          text: this.message,
          type: this.messageType
        };
        try{
          const response = await API.post('/messages/new', data);
          const message:MessageInterface = response.data;
          this.$emit('handleClientActions', 'sendMessage', message);
        }catch(e){
          console.log(e)
        };
      },

      async handleSubmitToGPT(){
        this.isLoading = true;
        const data = {
          model: "gpt-3.5-turbo",
          messages: [
            {role: "user",
            content: `Corriga somente a ortografia da seguinte sentença: ${this.message.replace(/(\r\n|\n|\r)/gm, " ")}. Sem alterar o sentido da frase.`}
          ],
          max_tokens: 56,
          temperature: 0.5
        }
        try{
          const gptResponse = await GPT.post('/chat/completions', data);
          this.acceptGptSuggestion = true;
          this.gptMessage = gptResponse.data.choices[0].message.content;
        }catch(e){
          console.log(e)
        }
      },

      async handleAcceptGPTcorrection(){
        this.message = this.gptMessage;
        await this.handleSubmit();
      },
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/tokens.scss';
  .modal{
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100vh;
    background-color: #00000060;
    // backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .modal__wrapper{
    width: $screen-xs;
    min-height: $screen-xs;
    background-color: $white-color;
    border-radius: $spacing-md;
    padding:$spacing-md;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: $spacing-md;
  }

  .modal__wrapper__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal__wrapper__gpt__message{
    background-color: $primary-color;
    color: $dark-color;
    padding: $spacing-md;
  }

  .modal__wrapper__header__title{
    font-size: $font-xl;
  }
</style>