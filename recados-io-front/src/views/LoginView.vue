<template>
  <div class="login view">
    <div class="login_image">
      <p>LOgin</p>
    </div>
    <div class="login__wrapper">
      <div>
        <h1>Recados.IO</h1>
      </div>
      <div class="login__wrapper__content">
        <form @submit.prevent="handleSubmit" class="login__wrapper__content__form">

          <input required name="userName" id="userName" v-model="userName" />
          <input required name="channelName" id="channelName" v-model="channelName" />

          <div>
            <input type="checkbox" id="isAnonymous" v-model="isAnonymous" />
            <p>Entrar como Anônimo</p>
          </div>
          
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
      <p>LOgin</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import ButtonComponent from '@/components/Button.vue';
import { useStore } from 'vuex';

  export default defineComponent({
    name: 'login',
    
    components: {
      ButtonComponent
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

        this.$store.dispatch('handleLogin', data);
        this.$router.push(`/board/${this.channelName}`);
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
    width: 50%;
    background-color: $dark-color;
  }
  .login__wrapper{
    background: $light-color;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  .login__wrapper__content__form{
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    background-color: $white-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
  }
</style>