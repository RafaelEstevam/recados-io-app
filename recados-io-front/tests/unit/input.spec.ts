import { shallowMount, mount } from '@vue/test-utils'
import Input from '@/components/Input.vue';

describe('Input.vue', () => {

  const inputName = 'input';
  const inputValue = '';

  it('render Input with props', () => {
    const wrapper = shallowMount(Input, {
      props: {
        inputName,
        inputValue
      }
    });

    const input = wrapper.find(inputName);
    const inputId = input.attributes('id');
    expect(inputId).toBe(inputName);

  });

  it('Input show error when validated', () => {
    
    const inputValue = 'mostrando validação'
    const inputName = 'input'
    const showValidation = inputValue.length > 10
    const validationMessage = 'O texto é muito grande'

    const wrapper = shallowMount(Input, {
      props: {
        inputName,
        inputValue,
        showValidation,
        validationMessage
      }
    });

    const input = wrapper.find(inputName);
    const error = wrapper.find('p');

    expect(input.classes()).toContain('error-input');
    expect(error.text()).toMatch(validationMessage);

  });
  
})

