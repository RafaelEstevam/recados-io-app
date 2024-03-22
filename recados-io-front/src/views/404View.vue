<template>
  <div class="four0four view">
    <div class="four0four__wrapper">
      <h1 class="title">404</h1>
      <p class="text">Não existe nada por aqui.</p>
      <buttonComponent
        :id="`four0four-button`"
        :label="'Voltar ao login'"
        :color="'primary'"
        :variant="'outlined'"
        :type="'button'"
        @buttonAction="handleGoToLogin"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ButtonComponent from '@/components/Button.vue';

  export default defineComponent({
    name: '404',
    components: {
      ButtonComponent
    },
    methods: {
      handleGoToLogin(){
        this.$router.push('/');
      }
    },
  });
</script>

<style lang="scss" scoped>

  .four0four{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $dark-color;
  }

  .four0four__wrapper{
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
  .title{
    font-size: 7rem;
    color: $primary-color;
  }

  .text{
    color: $white-color;
  }
</style>
