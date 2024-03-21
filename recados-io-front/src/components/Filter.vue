<template>
  <div class="filter">
    <h2 class="filter__title">Recados no quadro ({{ messages }})</h2>
    
    <p>Filtrar por: </p>

    <div class="filter__buttons">

      <buttonComponent
        :id="'button-modal'"
        :label="`Importante`"
        :variant="'outlined'"
        :color="'primary'"
        @button-action="handleFilter('important')"
      />

      <buttonComponent
        :id="'button-modal'"
        :label="`Normal`"
        :variant="'outlined'"
        :color="'secondary'"
        @button-action="handleFilter('not-important')"
      />

      <buttonComponent
        :id="'button-modal'"
        :label="`Urgente`"
        :variant="'outlined'"
        :color="'danger'"
        @button-action="handleFilter('urgent')"
      />

      <buttonComponent
        :id="'button-modal'"
        :label="`Todos`"
        :variant="'outlined'"
        :color="'dark'"
        @button-action="handleFilter('')"
      />

    </div>
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

  .filter__messages{
    width: 100%;
    padding: 0 $spacing-xxl $spacing-xxl;
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-lg;

    .filter__title{
      text-align: center;
      width: 100%;
    }
  }

  .filter__buttons{
    display: flex;
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