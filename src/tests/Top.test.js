/**
 * @jest-environment node
 */

import React from 'react';
import './TestSetUp.js';
import Top from '../components/Top.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moxios from 'moxios';

const path = require('path');
const fs = require('fs');

describe('PopularList test', () => {
  beforeEach(() => {
    moxios.install();
  });
  
  afterEach(() => {
    moxios.uninstall();
  });

  test('Test PopularList snapshot', async () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Top.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/top/anime/1', {
      status: 200,
      response: data,
    });
    const data2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Top2.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/top/anime/2', {
      status: 200,
      response: data2,
    });
    const tree = shallow(<Top />).dive();
    expect(toJson(tree)).toMatchSnapshot();
    await tree.instance().loadMoreTop(1);
    expect(toJson(tree)).toMatchSnapshot();
    await tree.instance().loadMoreTop(2);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
