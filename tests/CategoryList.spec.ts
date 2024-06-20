import { mount } from '@vue/test-utils';
import CategoryList from '@/components/CategoryList.vue';

/* describe('CategoryList.vue', () => {
  it('renders categories and options correctly', () => {
    const categories = [
      { name: 'Life partner', options: [{ text: 'Spouse', optOut: false, optIn: false }] }
    ];

    const wrapper = mount(CategoryList, {
      props: { categories }
    });

    expect(wrapper.find('h2').text()).toBe('Life partner');
    expect(wrapper.find('li').text()).toBe('Spouse');
  });

  it('applies struck-out class to struck-out options', () => {
    const categories = [
      { name: 'Life partner', options: [{ text: 'Spouse', optOut: true, optIn: false }] }
    ];

    const wrapper = mount(CategoryList, {
      props: { categories }
    });

    expect(wrapper.find('span').classes()).toContain('struck-out');
  });

  it('applies optIn class to optIn options', () => {
    const categories = [
      { name: 'Life partner', options: [{ text: 'Spouse', optOut: false, optIn: true }] }
    ];

    const wrapper = mount(CategoryList, {
      props: { categories }
    });

    expect(wrapper.find('span').classes()).toContain('optIn');
  });
});
*/
