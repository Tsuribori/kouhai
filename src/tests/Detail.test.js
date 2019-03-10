/**
 * @jest-environment node
 */

import React from 'react';
import './TestSetUp.js';
import Detail from '../components/Detail.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moxios from 'moxios';

const path = require('path');
const fs = require('fs');

describe('Detail test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Test Detail snapshot', async () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Detail.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/anime/1', {
      status: 200,
      response: data,
    });
    const match = {'params': {'mal_id': 1}};
    const tree = shallow(<Detail match={match} />);
    expect(toJson(tree)).toMatchSnapshot();
    await tree.instance().getDetail();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
