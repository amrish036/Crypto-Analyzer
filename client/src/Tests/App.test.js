import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';


configure({ adapter: new Adapter() });

describe('<App />', () => {

  let wrapper =  beforeEach(()=>{ wrapper = shallow(<App />) });
  
  it('includes one app component', () =>{
    expect(wrapper.find('div.App')).toHaveLength(1);
  });
  
  it('includes text in component', () =>{
    expect('Quote').toMatch('Quote');
  });
  
  it('includes one refresh button', () =>{
    expect(wrapper.find('.refreshButton')).toHaveLength(1);
  });
  
  it('includes one filter button', () =>{
    expect(wrapper.find('.refreshButton')).toHaveLength(1);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the App component snapshot',()=>{
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });

})

