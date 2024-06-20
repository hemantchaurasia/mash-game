import { mount } from '@vue/test-utils';
import GameControls from '@/components/GameControls.vue';
/*
describe('GameControls.vue', () => {
  it('emits updateCount and runGame events when button is clicked', async () => {
    const wrapper = mount(GameControls);

    wrapper.setData({ count: 4 });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().updateCount).toBeTruthy();
    expect(wrapper.emitted().updateCount[0]).toEqual([4]);
    expect(wrapper.emitted().runGame).toBeTruthy();
  });

  it('updates count when input value changes', async () => {
    const wrapper = mount(GameControls);

    const input = wrapper.find('input');
    await input.setValue(4);

    expect(wrapper.vm.count).toBe(4);
  });
});
*/