/**
 * @jest-environment node
 */

import React from 'react';
import './TestSetUp.js';
import Search from '../components/Search.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moxios from 'moxios';

const path = require('path');
const fs = require('fs');

describe('Search test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Test Search snapshot', async () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Search.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/search/anime?q=NHK', {
      status: 200,
      response: data,
    });
    const data2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Search2.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/search/anime?q=Cowboy', {
      status: 200,
      response: data2,
    });
    const tree = shallow(<Search handleHide={() => null}/>).dive();
    expect(toJson(tree)).toMatchSnapshot();
    tree.instance().onSearch("NHK");
    await tree.instance().loadMoreResults(1);
    expect(toJson(tree)).toMatchSnapshot();
    tree.instance().onSearch("Cowboy");
    await tree.instance().loadMoreResults(1);
    expect(toJson(tree)).toMatchSnapshot();
  });
}); 
