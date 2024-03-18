<template>
  <div class="message">{{ message?.text }}</div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import {MessageInterface} from '@/interfaces/message.interface';

  export default {
    name: 'message',
    props: {
      message: {
        default:{id: '1', author: 'Anonimo', type: 'important', channel: '', date: '18-03-2024', text: 'Recado curto'},
        required: true,
        type: Object as PropType<MessageInterface>,
      }
    },
    
    mounted() {
      console.log(this);
    },
  }
</script>

<style lang="scss" scoped>

  @import '@/styles/tokens.scss';

  .message{
    background-color: $white-color;
    border-radius: $spacing-md;
    min-height: 200px;
    min-width: 200px;
    max-width: 200px;
  }
</style>