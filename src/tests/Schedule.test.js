/**
 * @jest-environment node
 */

import React from 'react';
import './TestSetUp.js';
import Schedule from '../components/Schedule.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moxios from 'moxios';

const path = require('path');
const fs = require('fs');

describe('Schedule test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Test Schedule snapshot', async () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Schedule.json')));
    moxios.stubRequest('https://api.jikan.moe/v3/schedule', {
      status: 200,
      response: data,
    });
    const tree = shallow(<Schedule />).dive();
    expect(toJson(tree)).toMatchSnapshot();
    await tree.instance().getSchedule();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
