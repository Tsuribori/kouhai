import React from 'react';
import './TestSetUp.js';
import AnimePreview from '../components/AnimePreview.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const path = require('path');
const fs = require('fs');

describe('AnimePreview test', () => {
  test('Test AnimePreview snapshot', () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Detail.json')));
    const tree = shallow(<AnimePreview {...data} />).dive();
    expect(toJson(tree)).toMatchSnapshot();
  });
}); 
