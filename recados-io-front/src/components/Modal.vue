<template>
  <div class="modal" v-if="showModal">
    <div class="modal__wrapper">
      <div class="modal__wrapper__header">
        <h2 class="modal__wrapper__header__title">{{ modalTitle }}</h2>
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
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import { defineComponent } from "vue";
  import ButtonComponent from '@/components/Button.vue';

  export default defineComponent({
    name: 'modal',

    components: {
      ButtonComponent
    },

    props:{
      showModal: {
        type: Boolean,
        required: true
      },
      modalTitle:{
        type: String,
        required: true
      },
    },

    emits: ['closeModal'],

    watch: {},

    methods: {
      handleCloseModal(){
        this.$emit('closeModal')
      }
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