<template>
  <div class="board view">
    <h1>Board</h1>
    <div class="board__messages">
      <div v-for="message in messages" :key="message.id">
        <message :message="message" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import Message from '@/components/Message.vue';

  export default {
    name: 'board',
    components: {
      Message
    },
    data(){
      return {
        messages: [
          {id: '1', author: 'Anonimo', type: 'important', channel: '', date: '18-03-2024', text: 'Recado curto'},
          {id: '2', author: 'Anonimo', type: 'important', channel: '', date: '18-03-2024', text: 'Recado curto'},
          {id: '3', author: 'Rafael', type: 'not-important', channel: '', date: '18-03-2024', text: 'Recado curto'},
          {id: '4', author: 'Anonimo', type: 'urgent', channel: '', date: '18-03-2024', text: 'Recado curto'},
          {id: '5', author: 'Rafael', type: 'urgent', channel: '', date: '18-03-2024', text: 'Recado curto'},
          {id: '6', author: 'Anonimo', type: 'not-important', channel: '', date: '18-03-2024', text: 'Recado curto'},
          {id: '7', author: 'Anonimo', type: 'not-important', channel: '', date: '18-03-2024', text: 'Recado curto'},
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import  '@/styles/tokens.scss';
  .board{
    background-color: $light-color;
  };

  .board__messages{
    width: 100%;
    padding: $spacing-md;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: $spacing-lg;
  }

</style>