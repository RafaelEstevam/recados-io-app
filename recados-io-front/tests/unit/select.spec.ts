import { shallowMount, mount } from '@vue/test-utils'
import Select from '@/components/Select.vue';

describe('Select.vue', () => {

  const inputName = 'textarea';
  const inputValue = '';

  it('render Select with props', () => {
    const wrapper = mount(Select, {
      props: {
        inputName,
        inputValue
      }
    });

    const select = wrapper.find('select');
    const selectId = select.attributes('id');

    expect(selectId).toBe(inputName);

  });

  it('Select show options to select message type', () => {
    const inputName = 'select';
    const inputValue = '';

    const wrapper = mount(Select, {
      props: {
        inputName,
        inputValue
      }
    });

    const selectElement = wrapper.find('select');
    const options = selectElement.findAll('option');

    expect(options.length).toBe(4);

    expect(options[0].text()).toBe('Selecione uma prioridade');
    expect(options[1].text()).toBe('Normal');
    expect(options[2].text()).toBe('Importante');
    expect(options[3].text()).toBe('Urgente');

  });
  
})

