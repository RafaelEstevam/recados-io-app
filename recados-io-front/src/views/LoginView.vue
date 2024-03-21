<template>
  <div class="login view">
    
    <div class="login__wrapper">
      <div>
        <logo :white="true" :showSlogan="true"/>
      </div>
      <div class="login__wrapper__content">
        <form @submit.prevent="handleSubmit" class="login__wrapper__content__form">
          <inputComponent
            :inputName="userName"
            :placeholder="'Nome de usuário'"
            :required="true"
            v-model="userName"
          />

          <inputComponent
            :inputName="channelName"
            :placeholder="'Nome do mural de recados'"
            :required="true"
            :showValidation="channelNameValidation"
            :validationMessage="channelValidationMessage"
            v-model="channelName"
          />

          <checkboxComponent
            :inputName="isAnonymous"
            :label="'Entrar como Anônimo'"
            v-model="isAnonymous"
            @updateCheckBox="updateCheckBox"
          />
          
          <buttonComponent
            :label="'Entrar'"
            :color="'primary'"
            :variant="'filled'"
            :type="'submit'"
          />
        </form>
      </div>
    </div>
    <div class="login_image">
      <div class="login__image__wrapper">
        <Image />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import { useStore } from 'vuex';

  import ButtonComponent from '@/components/Button.vue';
  import InputComponent from '@/components/Input.vue';
  import CheckboxComponent from '@/components/Checkbox.vue';
  import Image from '@/components/Image.vue';
  import Logo from '@/components/Logo.vue';

  import inputValidation from '@/utils/inputValidation';

  export default defineComponent({
    name: 'login',
    
    components: {
      Logo,
      Image,
      ButtonComponent,
      InputComponent,
      CheckboxComponent,
    },

    setup(){
      const store = useStore();
      return {
        $store: store
      }
    },
    
    data(){
      return {
        userName: '',
        channelName: '',
        channelNameValidation: false,
        channelValidationMessage: '',
        isAnonymous: false,
      }
    },

    methods:{
      handleSubmit(){
        
        const data = {
          userName: this.userName,
          isAnonymous: this.isAnonymous,
          id: new Date().getTime().toString(),
          channelName: this.channelName
        };

        if(this.handleValidation(data)){
          this.$store.dispatch('handleLogin', data);
          this.$router.push(`/board/${this.channelName}`);
        };
        
      },

      handleValidation(data: any){
        if(inputValidation.hasSpaces(data.channelName)){
          this.channelNameValidation = true;
          this.channelValidationMessage = 'Esse nome de mural contêm espaços.'
          return false;
        }else{
          this.channelNameValidation = false;
        }

        return true;
      },

      updateCheckBox(value:boolean){
        this.isAnonymous = value;
      },


    }
  });
</script>

<style lang="scss" scoped>

  @import '@/styles/tokens.scss';

  .login{
    display: flex;
  }
  .login_image{
    width: 66%;
    background-color: $white-color;
    padding: $spacing-xxl;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media(max-width: $screen-md){
      width: 10px;
      padding: 0px;
      background-color: $dark-color;
    }
  }

  .login__image__wrapper{
    width: 75%;
    @media(max-width: $screen-md){
      width: 0%;
      display: none;
    }
  }
  .login__wrapper{
    background: $primary-color;
    gap: $spacing-lg;
    padding: $spacing-xxl;
    width: 34%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media(max-width: $screen-md){
      width: 100%;
    }
  }

  .login__wrapper__content__form{
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    background-color: $white-color;
    padding: $spacing-lg;
    border-radius: $spacing-md;
    // @media(max-width: $screen-md){
    //   width: 100%;
    // }
  }
</style>