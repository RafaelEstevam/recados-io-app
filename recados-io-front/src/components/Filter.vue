<template>
  <div class="filter">
    <h2 class="filter__title">Recados no quadro ({{ messages }})</h2>

    <div class="filter__buttons">

      <p>Filtrar por: </p>

      <buttonComponent
        :id="'button-important'"
        :label="`Importante`"
        :variant="'outlined'"
        :color="'primary'"
        @button-action="handleFilter('important')"
      />

      <buttonComponent
        :id="'button-not-important'"
        :label="`Normal`"
        :variant="'outlined'"
        :color="'secondary'"
        @button-action="handleFilter('not-important')"
      />

      <buttonComponent
        :id="'button-urgent'"
        :label="`Urgente`"
        :variant="'outlined'"
        :color="'danger'"
        @button-action="handleFilter('urgent')"
      />

      <buttonComponent
        :id="'button-undefined'"
        :label="`Todos`"
        :variant="'outlined'"
        :color="'dark'"
        @button-action="handleFilter('undefined')"
      />

    </div>

    <p>Usuários conectados: {{ connectedUsers }}</p>

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ButtonComponent from './Button.vue';

  export default defineComponent({
    name: 'filter',
    components: {
      ButtonComponent
    },

    props:{
      messages:{
        type: Number,
        required: true
      },
      connectedUsers: {
        type: Number,
        default: 0
      }
    },

    emits: ['filterAction'],

    methods: {
      handleFilter(filter: string){
        this.$emit('filterAction', filter);
      }
    }
  });
</script>

<style lang="scss">

  @import  '@/styles/tokens.scss';

  .filter{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-md;
    padding: $spacing-md $spacing-xxl;
    background: $white-color;

    @media(max-width: $screen-sm){
      flex-direction: column;
    }
  }
  .filter__title{
    text-align: left;
  }

  .filter__buttons{
    display: flex;
    align-items: center;
    gap: $spacing-md;

    @media(max-width: $screen-sm){
      flex-wrap: wrap;

      .md{
        padding: $spacing-sm $spacing-md;
        font-size: $spacing-md;
      }
    }
  }
  
</style>