import { shallowMount, mount } from '@vue/test-utils'
import Filter from '@/components/Filter.vue';

describe('Filter.vue', () => {

  const wrapper = mount(Filter);

  const buttonImportant = wrapper.find('#button-important');
  const buttonNotImportant = wrapper.find('#button-not-important');
  const buttonUrgent = wrapper.find('#button-urgent');
  const buttonUndefined = wrapper.find('#button-undefined');

  it('Buttons on filter', () => {
    expect(buttonImportant.classes()).toContain('primary');
    expect(buttonNotImportant.classes()).toContain('secondary');
    expect(buttonUrgent.classes()).toContain('danger');
    expect(buttonUndefined.classes()).toContain('dark');

  });

  it('Checking trigger on buttons', async () => {
    

    await buttonImportant.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();

    await buttonNotImportant.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
    
    await buttonUrgent.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
    
    await buttonUndefined.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
    
  })
  
})

