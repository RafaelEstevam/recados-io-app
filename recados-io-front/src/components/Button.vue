<template>
  <button
    class="button"
    :type="type"
    :class="variantColor"
    @click="$emit('buttonAction')"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'buttonComponent',
    props: {
      label: {
        type: String,
        required: true,
      },
      variant: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        default: 'button',
        validator: (value: string) => ['button', 'submit', 'reset'].includes(value),
      },
    },
    computed:{
      variantColor():string {
        return `${this.variant} ${this.color}`
      }
    },
    emits: ['buttonAction']
  })
</script>

<style lang="scss" scoped>
  .button{
    border: 0px;
    padding: $spacing-sm $spacing-md;
    color: $white-color;
    font-weight: bold;
    border-radius: $spacing-md;
    opacity: 0.8;
    cursor: pointer;
    transition: linear all 0.1s;

    &:hover{
      opacity: 1;
    }

    &:active{
      transform: scale(0.98);
    }

    &.filled{
      &.primary{
        background-color: $primary-color;
      }
      &.secondary{
        background-color: $secondary-color;
      }
      &.danger{
        background-color: $danger-color;
      }
    }

    &.outlined{
      border: 1px solid;
      background: transparent;
      &.primary{
        border-color: $primary-color;
        color: $primary-color;
      }
      &.secondary{
        border-color: $secondary-color;
        color: $secondary-color;

      }
      &.danger{
        border-color: $danger-color;
        color: $danger-color;

      }
    }

  }
</style>