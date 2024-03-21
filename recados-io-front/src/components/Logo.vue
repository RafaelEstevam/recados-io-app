<template>
  <div class="logo">
    <h1 class="logo__title" :class="white && 'white'">Recados.<span>IO</span></h1>
    <p class="logo__slogan" v-if="showSlogan">Tão simples quanto deixar um recado.</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'logo',
    props: {
      white: {
        type: Boolean,
        default: false
      },
      showSlogan: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/tokens.scss';

  .logo{
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  .logo__title{
    font-weight: 900;
    font-size: $font-xxl;
    text-shadow: 0px 1px 0px #eee, 0px 2px 0px #ddd, 0px 3px 0px #ccc, 0px 4px 0px #bbb, 0px 5px 0px #aaa ;

    span{
      // color: $dark-color;
      font-size: $font-xxl;
      // text-shadow: 0px 1px 0px #232331, 0px 2px 0px #1f1e2b, 0px 3px 0px #1b1b25, 0px 4px 0px #12121a, 0px 5px 0px rgb(16, 16, 22) ;
    }

    &.white{
      color: $white-color
    }
  }

  .logo__slogan{
    font-size: $font-sm;
    font-weight: bold;
  }

</style>