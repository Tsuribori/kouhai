import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from '@material-ui/icons';
import App from '../components/App';
import './TestSetUp.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('App test', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Test App snapshot', () => {
    const tree = shallow(<App />).dive();
    expect(toJson(tree)).toMatchSnapshot();
    const event = {currentTarget: <Menu />};
    tree.instance().handleMenu(event);
    expect(toJson(tree)).toMatchSnapshot();
    tree.instance().handleClose();
    expect(toJson(tree)).toMatchSnapshot();
  });
});
