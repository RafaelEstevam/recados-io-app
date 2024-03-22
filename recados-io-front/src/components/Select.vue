<template>
  <div class="select">
    <select
      :required="required"
      :name="inputName"
      :id="inputName"
      :value="value"
      @input="$emit('update:modelValue', $event.target.value)"
      class="select__field"
    >
      <option value="not-important">Selecione uma prioridade</option>
      <option value="not-important">Normal</option>
      <option value="important">Importante</option>
      <option value="urgent">Urgente</option>
    </select>
  </div>
</template>

<script lang="ts">

  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'inputComponent',
    props: {
      inputName: {
        type: String,
        required: true
      },
      required:{
        type: Boolean,
        default: false
      },
    },
    
    setup(props, { emit }) {
      const value = computed({
        get: () => props.inputName,
        set: (newValue) => {
          emit('update:inputName', newValue);
        },
      });

      return {
        value
      };
    }
  })
</script>

<style lang="scss" scoped>
  @import '@/styles/tokens.scss';

  .select{
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    width: 100%;
  }

  .select__field{
    border: 0px;
    border-radius: $spacing-md;
    padding: $spacing-md;
    background-color: $light-color;
    width: 100%;

    &.error-select{
      background-color: $danger-color-light;
      color: $danger-color;
    };
    
  }

  .select__validation{
    font-size: $font-sm;
    color: $danger-color;
  }
</style>