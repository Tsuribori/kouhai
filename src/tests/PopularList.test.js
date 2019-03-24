/**
 * @jest-environment node
 */

import React from 'react';
import './TestSetUp.js';
import PopularList from '../components/PopularList.js';
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
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './TopAiring.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/top/anime/1/airing', {
      status: 200,
      response: data,
    });
    const data2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './TopAiring2.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/top/anime/2/airing', {
      status: 200,
      response: data2,
    });
    const tree = shallow(<PopularList />).dive(); 
    expect(toJson(tree)).toMatchSnapshot(); 
    await tree.instance().loadMorePopular(1);
    expect(toJson(tree)).toMatchSnapshot();
    await tree.instance().loadMorePopular(2);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
