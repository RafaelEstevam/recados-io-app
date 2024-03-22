<template>
  <div class="modal" v-if="showModal">
    <div class="modal__wrapper">
      <div class="modal__wrapper__header">
        <h2 class="modal__wrapper__header__title">Novo recado</h2>
        <buttonComponent
          :id="`close-modal`"
          :label="'X'"
          :color="'dark'"
          :variant="'filled'"
          :type="'submit'"
          :size="'md'"
          @buttonAction="handleCloseModal"
        />
      </div>
      <div class="modal__wrapper__content">

        <selectComponent
          :inputName="messageType"
          :requred="true"
          v-model="messageType"
        />

        <textareaComponent
          :inputName="message"
          :limit="50"
          :disabled="message.length == 50"
          :placeholder="'Deixe seu recado'"
          v-model="message"
        />

        <div v-if="anonyousUser" class="modal__checkbox__wrapper">
          <p>Você entrou como um usuário anônimo.</p>
          <checkboxComponent
            :inputName="showUser"
            :label="'Quer se identificar no recado?'"
            v-model="showUser"
            @updateCheckBox="updateCheckBox"
          />
        </div>

        <div v-if="!acceptGptSuggestion" class="modal__wrapper__footer__buttons">
          <buttonComponent
            :id="'button-modal'"
            :label="`Salvar recado`"
            :variant="'filled'"
            :color="'primary'"
            :fullwidth="true"
            :disabled="message.length <= 3"
            @button-action="handleSubmit"
          />
        </div>

        <div v-if="acceptGptSuggestion" class="modal__wrapper__gpt__message">
          <p class="modal__wrapper__gpt__message__text"><span>Corrigido com IA:</span> {{ gptMessage }}</p>
          <buttonComponent
            :id="'button-modal'"
            :label="`Aceitar correção e salvar`"
            :variant="'filled'"
            :color="'secondary'"
            :size="'sm'"
            @button-action="handleAcceptGPTcorrection"
          />
        </div>

        <div v-if="acceptGptSuggestion" class="modal__wrapper__footer__buttons">
          <buttonComponent
            :id="'button-modal'"
            :label="`Salvar sem correção`"
            :variant="'filled'"
            :color="'primary'"
            :fullwidth="true"
            @button-action="handleSubmit"
          />
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

  import ButtonComponent from '@/components/Button.vue';
  import SelectComponent from '@/components/Select.vue';
  import TextareaComponent from '@/components/Textarea.vue';
  import CheckboxComponent from '@/components/Checkbox.vue';


  export default defineComponent({
    name: 'modal',

    components: {
      ButtonComponent,
      SelectComponent,
      TextareaComponent,
      CheckboxComponent
    },

    setup() {

      const notificationTime = 5000;
      const route = useRoute();
      const store = useStore();
      const showModal = computed(() => store.state.showModal);
      const user = computed(() => store.state.user);
      const anonyousUser = user.value.isAnonymous;

      return {
        route,
        $store: store,
        showModal,
        user,
        anonyousUser,
        notificationTime
      };
    },
    
    data(){

      return {
        message: '',
        gptMessage: '',
        messageType: '',
        acceptGptSuggestion: false,
        isLoading: false,
        showUser: !this.anonyousUser,
        userIsTyping: false
      }
    },

    emits: ['setShow', 'handleClientActions'],

    watch: {
      message(){
        this.handleIsTyping();
      },
    },

    methods: {

      handleCloseModal(){
        this.handleResetModal();
        this.$store.dispatch('handleShowModal', {showModal: false})
      },
      
      handleAllowNotification(){
        this.userIsTyping = false;
      },

      handleIsTyping(){
        if(!this.userIsTyping){
          this.$emit('handleClientActions', 'typing', this.user)
          this.userIsTyping = true;
          debounce(this.notificationTime, this.handleAllowNotification)();
        }
      },

      handleResetModal(){
        this.message = '',
        this.gptMessage = '',
        this.messageType = '',
        this.acceptGptSuggestion = false,
        this.isLoading = false,
        this.showUser = !this.anonyousUser,
        this.userIsTyping = false
      },

      async handleSubmit(){
        this.$store.dispatch('handleShowLoading', {showLoading: true});
        
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
          this.handleCloseModal();
        }catch(e){
          console.log(e)
        }finally{
          this.$store.dispatch('handleShowLoading', {showLoading: false});
        }

      },

      async handleSubmitToGPT(){
        this.$store.dispatch('handleShowLoading', {showLoading: true});
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
        }finally{
          this.$store.dispatch('handleShowLoading', {showLoading: false});
        }
      },

      async handleAcceptGPTcorrection(){
        this.message = this.gptMessage;
        await this.handleSubmit();
      },

      updateCheckBox(value:boolean){
        this.showUser = value;
      },
    },

    destroyed() {
      this.handleResetModal()
    },
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/tokens.scss';
  .modal{
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100vh;
    background-color: #00000060;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $spacing-md;
  }

  .modal__wrapper{
    width: 100%;
    max-width: $screen-xs;
    background-color: $white-color;
    border-radius: $spacing-md;
    padding:$spacing-lg;
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  .modal__wrapper__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal__wrapper__content{
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  .modal__wrapper__gpt__message{
    background-color: $secondary-color-light;
    color: $secondary-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  .modal__wrapper__gpt__message__text{
    color: $dark-color;
    span{
      color: $secondary-color;
    }
  }

  .modal__wrapper__header__title{
    font-size: $font-xl;
  }

  .modal__checkbox__wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
  }
</style>