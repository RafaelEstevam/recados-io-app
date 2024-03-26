import { shallowMount, mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {

  const modalTitle = 'Título do modal';

  it('Modal is showed', () => {
    let showModal = true;
    const modalTitle = 'Título do modal';
    const wrapper = mount(Modal, {
      props: {
        showModal,
        modalTitle
      }
    });
    expect(wrapper.vm.showModal).toBe(true);
  });

  it('Modal is closed', () => {
    let showModal = false;
    const wrapper = mount(Modal, {
      props: {
        showModal,
        modalTitle
      }
    });
    expect(wrapper.vm.showModal).toBe(false);
  });
  
})

