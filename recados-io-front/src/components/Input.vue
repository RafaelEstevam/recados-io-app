<template>
  <div class="input">
    <input
      :required="required"
      :name="inputName"
      :id="inputName"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input__field"
      :class="showValidation && 'error-input'"
    />
    <p class="input__validation" v-if="showValidation">{{ validationMessage }}</p>
  </div>
</template>

<script lang="ts">

  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'inputComponent',
    props: {
      type: {
        type: String,
      },
      inputName: {
        type: String,
        required: true
      },
      placeholder:{
        type: String
      },
      required:{
        type: Boolean,
        default: false
      },
      showValidation: {
        type: Boolean,
        default: false,
      },
      validationMessage: {
        type: String
      }
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

  .input{
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    width: 100%;
  }

  .input__field{
    border: 0px;
    border-radius: $spacing-md;
    padding: $spacing-md;
    background-color: $light-color;
    width: 100%;

    &.error-input{
      background-color: $danger-color-light;
      color: $danger-color;
    };
    
  }

  .input__validation{
    font-size: $font-sm;
    color: $danger-color;
  }
</style>