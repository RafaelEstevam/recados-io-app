<template>
  <button
    class="button"
    :id="id"
    :size="size"
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
      id: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        default: 'md',
      },
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
      fullwidth: {
        type: Boolean,
        default: false,
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
        return `${this.variant} ${this.color} ${this.size} ${this.fullwidth && 'fullWidth'}`
      }
    },
    emits: ['buttonAction']
  })
</script>

<style lang="scss" scoped>
  .button{
    border: 0px;
    padding: $spacing-md $spacing-md;
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

      &.dark{
        background-color: $dark-color;
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

      &.dark{
        border-color: $dark-color;
        color: $dark-color;
      }
    }

    &.sm{
      padding: $spacing-sm;
      font-size: $font-sm;
    }

    &.fullWidth{
      width: 100%;
    }

  }
</style>