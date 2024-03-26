import { shallowMount, mount } from '@vue/test-utils'
import Button from '@/components/Button.vue';

describe('Button.vue', () => {

  const label = 'Meu Botão';
  const id = 'meu-botao';
  const variant = 'filled';
  const color = 'primary';
  const type = 'button';

  it('render label when passed', () => {
    const wrapper = shallowMount(Button, {
      props: {
        id,
        label,
        variant,
        color,
        type
      }
    });

    const button = wrapper.find('#meu-botao');
    const buttonId = button.attributes('id');

    expect(wrapper.text()).toMatch(label);
    expect(wrapper.classes()).toContain('primary');
    expect(wrapper.classes()).toContain('filled');
    expect(buttonId).toBe(id);

  });

  it('Emits click event when clicked', async () => {
    const wrapper = shallowMount(Button, {
      props: {
        id,
        label,
        variant,
        color,
        type
      }
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
  
})

