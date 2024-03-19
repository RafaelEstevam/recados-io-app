<template>
  <header class="header">
    <div class="header__wrapper">
      <h1 class="header__title">Recados.IO</h1>
      <buttonComponent
        :label="'+ Adicionar Recado'"
        :variant="'filled'"
        :color="'primary'"
        @button-action="handleShowModal"
      />
      <div class="header__wrapper__logout">
        <p class="header__wrapper__username">usuário</p>
        <buttonComponent
          :label="'Logout'"
          :variant="'outlined'"
          :color="'secondary'"
          @button-action="handleLogout"
        />
      </div>
    </div>
  </header>
</template>
<script lang="ts">
  import ButtonComponent from '@/components/Button.vue';
  import { useStore } from 'vuex';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'headerComponent',
    components: {
      ButtonComponent
    },
    setup(){
      const store = useStore();
      
      return {
        $store: store
      }
    },
    methods: {
      handleShowModal(){
        this.$store.dispatch('handleShowModal', {showModal: true})
      },
      handleLogout(){
        console.log('logout');
      }
    }
  });

</script>
<style lang="scss" scoped>
  @import '@/styles/tokens.scss';

  .header{
    width: 100%;
    padding: $spacing-md; 
  }

  .header__wrapper{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $dark-color;
    padding: $spacing-md;
    border-radius: $spacing-md;
  }

  .header__title{
    color: $primary-color;
    font-size: $font-xl;
    font-weight: bold;
  }

  .header__wrapper__logout{
    display: flex;
    gap: $spacing-md;
    align-items: center;
  }

  .header__wrapper__username{
    color: $white-color;
    font-weight: bold;
  }

</style>