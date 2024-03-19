<template>
  <div class="message" :class="messageType">
    <div class="message__header">
      <p>{{ message?.date }}</p>
      <button @click="handleDeleteMessage(message._id)">X</button>
    </div>
    
    <div class="message__content">
      {{ message?.text }}
    </div>

    <div class="message__footer">
      <p>{{ message?.author }}</p>
    </div>
  </div>
</template>

<script lang="ts">

  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import API from '@/config/api';
  import {MessageInterface} from '@/interfaces/message.interface';

  export default defineComponent({
    name: 'message',

    props: {
      message: {
        default:{id: '1', author: 'Anonimo', type: 'important', channel: '', date: '18-03-2024', text: 'Recado curto'},
        required: true,
        type: Object as PropType<MessageInterface>,
      }
    },

    data(){
      return {
        messageType: 'primary'
      }
    },
    
    mounted() {
      this.messageType = this.handleGetType();
    },

    emits: ['handleGetMessagesByChannel'],

    methods:{
      handleGetType(){
        switch(this.message.type){
          case 'not-important':
            return 'secondary';
          case 'urgent':
            return 'danger';
          default:
            return 'primary';
        }
      },
      async handleDeleteMessage(id?: string){
        try{
          const response = await API.delete(`/messages/delete/${id}`);
          this.$emit('handleGetMessagesByChannel');
        }catch(e){
          console.log(e);
        }
      }
    }
  });
</script>

<style lang="scss" scoped>

  @import '@/styles/tokens.scss';

  .message{
    position: relative;
    background-color: $white-color;
    border-radius: $spacing-md;
    min-height: 200px;
    min-width: 200px;
    max-width: 200px;
    padding: $spacing-md;
    overflow: hidden;

    &.primary{
      background-color: $primary-color;
    }

    &.secondary{
      background-color: $secondary-color;
    }

    &.danger{
      background-color: $danger-color;
    }

    &:after{
      content: ' ';
      width: 50px;
      height: 50px;
      position: absolute;
      z-index: 10;
      bottom: -25px;
      right: -25px;
      background-color: #00000020;
      transform: rotate(45deg);
    }
  }

  .message__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>