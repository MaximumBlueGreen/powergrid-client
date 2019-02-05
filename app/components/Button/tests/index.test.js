import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import Button from '../index';

describe('<Button />', () => {
  it('Expect to have unit tests specified', () => {
    const wrapper = mount(<Button />);
    const renderedComponent = enzymeFind(wrapper, Button);
    expect(renderedComponent.type()).toEqual('button');
  });
});
