import { shallowMount, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Header from '@/components/Header.vue';

describe('Header.vue', () => {

  let wrapper:any;
  let router: any;

  beforeEach(() => {

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'About',
          component: Header
        }
      ]
    });

    wrapper = mount(Header, {
      global: {
        provide: { store },
        plugins: [router]
      }
    });
  })

  it('Buttons on Header', () => {
    const buttonAdd = wrapper.find('#button-modal');
    const buttonLogout = wrapper.find('#button-logout');

    expect(buttonAdd.classes()).toContain('primary');
    expect(buttonAdd.text()).toMatch('+ Adicionar Recado');

    expect(buttonLogout.classes()).toContain('secondary');
    expect(buttonLogout.text()).toMatch('Logout');
  });

  it('Checking trigger on header buttons', async () => {
    const buttonLogout = wrapper.find('#button-logout');
    await buttonLogout.trigger('click');
    expect(router.currentRoute.value.path).toBe('/');
  });
  
})

