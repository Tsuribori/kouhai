import React from 'react';
import './TestSetUp.js';
import Loading from '../components/Loading.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('Test Loading snapshot', () => {
  const tree = shallow(<Loading />).dive();
  expect(toJson(tree)).toMatchSnapshot();
});
