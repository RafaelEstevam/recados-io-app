<template>
  <Loading :isFullScreen="true"/>
  <router-view/>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Loading from '@/components/Loading.vue'

  export default defineComponent({
    name: 'app',
    components: {
      Loading
    }
  })
</script>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}

#app {
  font-family: "Inter var experimental", "Inter var", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.view{
  width: 100%;
  min-height: 100vh;
}

.v-toast__text{
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
}
</style>
