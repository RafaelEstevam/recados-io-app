<template>
  <div class="textarea">
    <textarea
      :required="required"
      :disabled="disabled"
      :name="inputName"
      :id="inputName"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :maxlength="limit"
      @input="$emit('update:modelValue', $event.target.value)"
      class="textarea__field"
      :class="showValidation && 'error-input'"
    >
    </textarea>
    <p>{{ value.length }}/{{ limit }}</p>
    <p class="textarea__validation" v-if="showValidation">{{ validationMessage }}</p>
  </div>
</template>

<script lang="ts">

  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'textareaComponent',
    props: {
      type: {
        type: String,
      },
      inputName: {
        type: String,
        required: true
      },
      inputValue: {
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
      disabled:{
        type: Boolean,
        default: false
      },
      showValidation: {
        type: Boolean,
        default: false,
      },
      validationMessage: {
        type: String
      },
      limit:{
        type: Number
      }
    },
    
    setup(props, { emit }) {

      const value = computed({
        get: () => props.inputValue,
        set: (newValue) => {
          emit('update:inputValue', newValue);
        },
      });

      return {
        value
      };
    },
    
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

  .textarea__field{
    border: 0px;
    border-radius: $spacing-md;
    padding: $spacing-md;
    background-color: $light-color;
    width: 100%;
    height: 100px;

    &.error-input{
      background-color: $danger-color-light;
      color: $danger-color;
    };
    
  }

  .textarea__validation{
    font-size: $font-sm;
    color: $danger-color;
  }
</style>