import React from 'react';
import { shallow, mount } from 'enzyme';
import Sidebar from './sidebar';

const props = {
  onClick: jest.fn(),
  toggle: jest.fn(),
};

beforeEach(() => {
  props.onClick.mockReset();
});

test('renders a sidebar with children', () => {
  const wrapper = mount(<Sidebar {...props}><div className="child" /></Sidebar>);

  expect(wrapper.find(Sidebar)).toHaveLength(1);
  expect(wrapper.find('.child')).toHaveLength(1);
});

test('renders a context bar if editor is focused', () => {
  const wrapper = mount(<Sidebar {...props} editorFocused />);
  expect(wrapper.find('.sidebar__context-bar')).toHaveLength(1);
});

test('clicking the close button should toggle the sidebar off', () => {
  const wrapper = shallow(<Sidebar {...props} />);
  wrapper.find('.sidebar__close').simulate('click');
  expect(props.toggle).toHaveBeenCalled();
});
