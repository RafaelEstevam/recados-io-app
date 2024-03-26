import { shallowMount, mount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox.vue';

describe('Checkbox.vue', () => {

  const label = 'Meu checkbox';
  const inputName = 'checkbox';
  const inputValue = 'checkbox';

  it('render label when passed', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        label,
        inputName,
        inputValue
      }
    });
    expect(wrapper.text()).toMatch(label);

  });
})

