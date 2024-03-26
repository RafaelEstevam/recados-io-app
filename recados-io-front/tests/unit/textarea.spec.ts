import { shallowMount, mount } from '@vue/test-utils'
import Textarea from '@/components/Textarea.vue';

describe('Textarea.vue', () => {

  const inputName = 'textarea';
  const inputValue = '';
  const limit = 50

  it('render Textarea with props', () => {
    const wrapper = mount(Textarea, {
      props: {
        inputName,
        inputValue,
        limit
      }
    });

    const textarea = wrapper.find('textarea');
    const textareaId = textarea.attributes('id');
    const textareaLimit = textarea.attributes('maxlength');

    expect(textareaId).toBe(inputName);
    expect(textareaLimit).toBe(limit.toFixed(0));

  });

  it('Textarea show error when validated', () => {
    
    const inputValue = 'Ab'
    const inputName = 'textarea'
    const limit = 50;
    const showValidation = inputValue.length < 3
    const validationMessage = 'O texto é muito curto.'

    const wrapper = mount(Textarea, {
      props: {
        inputName,
        inputValue,
        showValidation,
        validationMessage,
        limit
      }
    });

    const input = wrapper.find('textarea');
    const error = wrapper.find('.textarea__validation');

    expect(input.classes()).toContain('error-input');
    expect(error.text()).toMatch(validationMessage);

  });
  
})

