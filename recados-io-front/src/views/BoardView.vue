<template>
  <div class="board view">
    <h1>Board</h1>
    <div class="board__messages">
      <div v-for="message in messages" :key="message._id">
        <message :message="message" />
      </div>
      <button @click="setShow(true)">+ Add recado</button>
      <modal v-if="show" @setShow="setShow"/>
    </div>
  </div>
</template>

<script lang="ts">

  import Message from '@/components/Message.vue';
  import Modal from '@/components/Modal.vue';
  import API from '@/config/api';

  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'board',
    components: {
      Message,
      Modal
    },
    setup() {
      const route = useRoute();
      return {
        route
      };
    },
    data(){
      return {
        messages: [],
        show: false
      }
    },
    async mounted(){
      try{
        const response = await API.get(`/messages/all/${this.$route.params.channel}`);
        this.messages = response.data;
      }catch(e){
        console.log(e)
      }
    },
    methods: {
      setShow(show:boolean){
        this.show = show
      }
    }
    
  });
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