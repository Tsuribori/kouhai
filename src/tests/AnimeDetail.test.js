import React from 'react';
import './TestSetUp.js';
import AnimeDetail from '../components/AnimeDetail.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const path = require('path');
const fs = require('fs');

describe('AnimeDetail test', () => {
  test('Test AnimeDetail snapshot', () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Detail.json')));
    const tree = shallow(<AnimeDetail {...data} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
