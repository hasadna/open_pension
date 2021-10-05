import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {Breadcrumbs} from "./Breadcrumbs";

describe('Breadcrumbs', () => {

  it('Checking a single crumb', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={['🍕']} />);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('li').at(0).html().includes('svg')).toBeFalsy();
  });

  it('Rendering two crumbs', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={['🍕', '🍣']} />);
    expect(wrapper.find('li').length).toBe(2);

    // Checking the first one contains the svg icon.
    expect(wrapper.find('li').at(0).html().includes('svg')).toBeTruthy();
    expect(wrapper.find('li').at(1).html().includes('svg')).toBeFalsy();
  });

  it('Rendering three items', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={['🍕', '🍣', '🍝']} />);
    expect(wrapper.find('li').length).toBe(3);

    // Checking the first one contains the svg icon.
    expect(wrapper.find('li').at(0).html().includes('svg')).toBeTruthy();
    expect(wrapper.find('li').at(1).html().includes('svg')).toBeTruthy();
    expect(wrapper.find('li').at(2).html().includes('svg')).toBeFalsy();
  });

});
