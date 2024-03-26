<template>
  <header class="header">
    <div class="header__wrapper">
      
      <div class="header__title">
        <Logo :white="true"/>
      </div>

      <div class="header__button">
        <buttonComponent
          :id="'button-modal'"
          :label="'+ Adicionar Recado'"
          :variant="'filled'"
          :color="'primary'"
          :fullwidth="true"
          @button-action="handleShowModal"
        />
      </div>
      
      <div class="header__wrapper__logout">
        <p class="header__wrapper__username">{{ userInfo }}</p>
        <buttonComponent
          :id="'button-logout'"
          :label="'Logout'"
          :variant="'filled'"
          :color="'secondary'"
          @button-action="handleLogout"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { useStore } from 'vuex';
  import { computed, defineComponent } from 'vue';

  import ButtonComponent from './Button.vue';
  import Logo from './Logo.vue';
import { removeUserData } from '@/services/user';

  export default defineComponent({
    name: 'headerComponent',
    components: {
      ButtonComponent,
      Logo
    },

    setup(){
      const store = useStore();
      const user = computed(() => store.state.user);
      return {
        $store: store,
        user
      }
    },

    computed:{
      userInfo(): string{
        return `${this.user.userName} ${this.user.isAnonymous ? '(Anônimo)': ''}`
      }
    },

    methods: {
      handleShowModal(){
        this.$store.dispatch('handleShowModal', {showModal: true})
      },
      handleLogout(){
        removeUserData();
        this.$router.push(`/`);
      }
    }
  });

</script>

<style lang="scss">

  @import '@/styles/tokens.scss';

  .header{
    width: 100%;
  }

  .header__wrapper{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $dark-color;
    padding: $spacing-md $spacing-xxl;
    @media(max-width: $screen-sm){
      padding: $spacing-md;
    }
  }

  .header__title{
    color: $primary-color;
    font-size: $font-xl;
    font-weight: bold;

    .logo__title{
      @media(max-width: $screen-sm){
        font-size: $font-lg;
        text-shadow: none;
        span{
          font-size: $font-lg;
          text-shadow: none;
        }
      }
    }
  }

  .header__button{
    @media(max-width: $screen-sm){
      padding: $spacing-md;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      background: $dark-color;
    }
  }

  .header__wrapper__logout{
    display: flex;
    align-items: center;
    gap: $spacing-md;
    
    @media(max-width: $screen-xs){
      flex-direction: column;
    }
  }

  .header__wrapper__username{
    color: $white-color;
    font-weight: bold;

    @media(max-width: $screen-xs){
      display: none;
    }
  }

</style>