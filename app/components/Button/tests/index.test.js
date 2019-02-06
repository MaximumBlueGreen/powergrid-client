import React from 'react';
import { mount } from 'enzyme';
// import { enzymeFind } from 'styled-components/test-utils';

import StyledButton from '../index';

describe('<Button />', () => {
  it('Renders a <button>', () => {
    const renderedComponent = mount(<StyledButton />);
    expect(renderedComponent.type()).toEqual(StyledButton);
  });
});
