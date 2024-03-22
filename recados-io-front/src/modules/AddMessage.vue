<template>
  <div class="addMessage">
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

    <div v-if="anonyousUser" class="addMessage__checkbox__wrapper">
      <p>Você entrou como um usuário anônimo.</p>
      <checkboxComponent
        :inputName="showUser"
        :label="'Quer se identificar no recado?'"
        v-model="showUser"
        @updateCheckBox="updateCheckBox"
      />
    </div>

    <div v-if="!acceptGptSuggestion" class="addMessage__wrapper__footer__buttons">
      <buttonComponent
        :id="'button-modal'"
        :label="`Salvar recado`"
        :variant="'filled'"
        :color="'primary'"
        :fullwidth="true"
        :disabled="message.length <= 3 || messageType === ''"
        @button-action="handleSubmitToGPT"
      />
    </div>

    <div v-if="acceptGptSuggestion" class="addMessage__wrapper__gpt__message">
      <p class="addMessage__wrapper__gpt__message__text"><span>Corrigido com IA:</span> {{ gptMessage }}</p>
      <buttonComponent
        :id="'button-modal'"
        :label="`Aceitar correção e salvar`"
        :variant="'filled'"
        :color="'secondary'"
        :size="'sm'"
        @button-action="handleAcceptGPTcorrection"
      />
    </div>

    <div v-if="acceptGptSuggestion" class="addMessage__wrapper__footer__buttons">
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
</template>

<script lang="ts">
  import { defineComponent, computed, defineAsyncComponent } from "vue";

  import API from '../config/api';
  import GPT from '../config/gpt';

  import { MessageInterface } from '../interfaces/message.interface';
  import { useRoute } from 'vue-router';
  import { useStore } from "vuex";

  import debounce from '../utils/debounce';

  import ButtonComponent from '../components/Button.vue';
  import SelectComponent from '../components/Select.vue';
  import TextareaComponent from '../components/Textarea.vue';
  import CheckboxComponent from '../components/Checkbox.vue';

  export default defineComponent({
    name: 'addMessage',

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

    emits: ['setShow', 'handleClientActions', 'sendComponent'],

    watch: {
      message(){
        this.handleIsTyping();
      },
    },

    methods: {

      handleCloseModal(){
        this.handleResetForm();
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

      handleResetForm(){
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

      sendComponent() {
        const componentPromise = import('./AddMessage.vue');
        componentPromise.then((component:any) => {
          this.$emit('sendComponent', defineAsyncComponent(() => component));
        });
      }
    },

    destroyed() {
      this.handleResetForm()
    },
  })
</script>

<style lang="scss" scoped>

  @import '@/styles/tokens.scss';

  .addMessage{
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
  
  .addMessage__wrapper__gpt__message{
    background-color: $secondary-color-light;
    color: $secondary-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  .addMessage__wrapper__gpt__message__text{
    color: $dark-color;
    span{
      color: $secondary-color;
    }
  }

  .addMessage__checkbox__wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
  }
  
</style>