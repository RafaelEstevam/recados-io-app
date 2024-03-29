<template>
  <div class="notification" :class="showIsTyping.isTyping && 'active'">
    <p class="notification__text">Usuário <b>{{ userName || 'Anônimo' }}</b> está deixando um recado.</p>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'notification',
    setup: () => {
      const store = useStore();
      const showIsTyping = computed(() => store.state.showTyping);
      return {
        showIsTyping
      }
    },

    data(){
      const userName = '';
      return {
        userName
      }
    },
    watch: {
      showIsTyping({user}){
        this.userName = user.isAnonymous ? 'Anônimo' : user.userName;
      }
    }
  })
</script>

<style scoped lang="scss">

  @import '@/styles/tokens.scss';
  .notification{
    position: fixed;
    width: 100%;
    background-color: $secondary-color;
    padding: $spacing-md;
    bottom: -100%;
    z-index: 1000;
    transition: 0.5s linear all;
    &.active{
      bottom: 0
    }
  }

  .notification__text{
    color: $white-color;
  }
</style>