<template>
  <div class="message" :class="messageType">
    
    <div class="message__header">
      <p class="message__text">{{ formatedDate }}</p>
      <buttonComponent
        :id="`close-${message._id}`"
        :label="'X'"
        :color="messageType"
        :variant="'filled'"
        :type="'submit'"
        :size="'sm'"
        @buttonAction="handleDeleteMessage(message._id)"
      />
    </div>
    
    <div class="message__content">
      {{ message?.text }}
    </div>

    <div class="message__info">
      <div class="message__footer">
        <p class="message__text">Autor: <b>{{ message?.author }}</b></p>
      </div>
      <div class="message__tags">
        <p v-if="newMessage" class="message__tag primary">Novo</p>
        <p class="message__tag" :class="messageType">{{ tag }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import {MessageInterface} from '@/interfaces/message.interface';
  import { useStore } from 'vuex';

  import moment from 'moment';

  import isNewMessage from '@/utils/isNewMessage';
  import defineType from '@/utils/defineType';
  import translateType from '@/utils/translateType';

  import ButtonComponent from './Button.vue';

  export default defineComponent({
    name: 'message',
    components: {
      ButtonComponent
    },
    props: {
      message: {
        default: {id: '1', author: 'Anonimo', type: 'important', channel: '', date: '18-03-2024', text: 'Recado curto'},
        required: true,
        type: Object as PropType<MessageInterface>,
      }
    },

    setup(){
      const store = useStore();
      return {
        $store: store
      }
    },

    data(){
      return {
        messageType: 'primary',
        isNew: false
      }
    },
    
    mounted() {
      this.messageType = this.handleGetType();
    },

    computed:{
      formatedDate():string{
        const date = this?.message?.date || '';
        return moment(new Date(date)).format('DD/MM/yyyy');
      },

      tag():string{
        return translateType(this.message.type)
      },

      newMessage():boolean{
        const date = this.message.date || '';
        return isNewMessage(date);
      }
    },

    emits: ['handleDeleteMessage'],

    methods:{

      handleGetType(){
        return defineType(this.message.type);
      },

      async handleDeleteMessage(id?: string){
        this.$emit('handleDeleteMessage', id);
      },

      handleFinishinRequest(){
        this.$store.dispatch('handleShowLoading', {showLoading: false});
      },
    }
  });
</script>

<style lang="scss" scoped>

  @import '@/styles/tokens.scss';

  .message{
    position: relative;
    background-color: $white-color;
    border-radius: $spacing-md;
    padding: $spacing-md;
    overflow: hidden;
    min-height: 200px;
    min-width: 200px;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: $spacing-md;
    box-shadow: 0px 5px 0px #ccc;

    @media(max-width: $screen-xs){
      max-width: 100%;
    }

    &.primary{
      background-color: $success-color-light;
      box-shadow: 0px 5px 0px $success-color;
      .message__content{
        color: $success-color;
      }
    }

    .message__content{
      font-size: $font-lg;
    }

    &.secondary{
      background-color: $secondary-color-light;
      box-shadow: 0px 5px 0px $secondary-color;
      .message__content{
        color: $secondary-color;
      }
    }

    &.danger{
      background-color: $danger-color-pure;
      box-shadow: 0px 5px 0px $danger-color;
      .message__content{
        color: $danger-color;
      }
    }
  }

  .message__footer{
    width: 100%;
  }

  .message__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .message__text{
    background: #ffffff60;
    font-size: $font-sm;
    padding: $spacing-sm;
    border-radius: $spacing-sm;
    color: $gray-color;
    b{
      font-size: $font-sm;
    }
  }

  .message__info{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
  }

  .message__tags{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-sm;
  }

  .message__tag{
    color: $white-color;
    font-size: $font-xs;
    padding: $spacing-xs $spacing-sm;
    border-radius: $spacing-md;
    display: inline-block;
    &.primary{
      background-color: $success-color;
    }

    &.secondary{
      background-color: $secondary-color;
    }

    &.danger{
      background-color: $danger-color;
    }
  }

</style>