import { shallowMount, mount } from '@vue/test-utils'
import Message from '@/components/Message.vue';

describe('Message.vue', () => {

  const message = {id: '1', author: 'Anônimo', type: 'important', channel: '', date: '18-03-2024', text: 'Recado curto'};

  it('Message is a important message', () => {
    const wrapper = shallowMount(Message, {
      props: {
        message
      }
    });
    expect(wrapper.classes()).toContain('primary');
  });

  it('It is a anonymous message', () => {
    const wrapper = shallowMount(Message, {
      props: {
        message
      }
    });
    const anonymous = wrapper.find('.message__info').find('b');
    expect(anonymous.text()).toMatch('Anônimo');
  });

  it('Deleting the message', async () => {
    const wrapper = mount(Message, {
      props: {
        message
      }
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
})

