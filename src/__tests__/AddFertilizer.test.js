import React from 'react';
import axios from 'axios';
import { AddHarvest } from '../pages/HarvestHandling/AddHarvest';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios');

describe('AddHarvest', () => {
  let wrapper;
  const toastSuccessSpy = jest.spyOn(toast, 'success');
  const toastErrorSpy = jest.spyOn(toast, 'error');
  
  beforeEach(() => {
    wrapper = mount(<AddHarvest />);
  });
  
  afterEach(() => {
    wrapper.unmount();
  });
  
  // Test case 1 - to check if the entire form is rendered correctly
  it('renders the form fields correctly', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
    expect(wrapper.find('Form.Control')).toHaveLength(5);
    expect(wrapper.find('Form.Select')).toHaveLength(2);
    expect(wrapper.find('Form.Control[type="file"]')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
  
  // Test case 2 - to check if state is updated when value is entered
  it('updates the state when form fields change', () => {
    const produceNameInput = wrapper.find('Form.Control[placeholder="Name of Produce.."]');
    const categorySelect = wrapper.find('Form.Select').at(0);
    const measurementUnitSelect = wrapper.find('Form.Select').at(1);
    const priceInput = wrapper.find('Form.Control[placeholder="Unit Price (In LKR).."]');
    const quantityInput = wrapper.find('Form.Control[placeholder="Unit Price (In LKR).."]');
    
    produceNameInput.simulate('change', { target: { value: 'Test Produce' } });
    categorySelect.simulate('change', { target: { value: 'Fruits' } });
    measurementUnitSelect.simulate('change', { target: { value: 'Kg' } });
    priceInput.simulate('change', { target: { value: '10.00' } });
    quantityInput.simulate('change', { target: { value: '5' } });
    
    expect(wrapper.find('AddHarvest').state('ProduceName')).toEqual('Test Produce');
    expect(wrapper.find('AddHarvest').state('Category')).toEqual('Fruits');
    expect(wrapper.find('AddHarvest').state('MeasurementUnit')).toEqual('Kg');
    expect(wrapper.find('AddHarvest').state('Price')).toEqual('10.00');
    expect(wrapper.find('AddHarvest').state('Quantity')).toEqual('5');
  });
  
  // Test case 3 - check if toast is displayed when success occurs
  it('calls the toast success message and sends a request to create a new harvest when form is submitted successfully', async () => {
    const form = wrapper.find('Form');
    axios.post.mockResolvedValueOnce({ data: {} });
    
    await form.simulate('submit');
    
    expect(toastSuccessSpy).toHaveBeenCalledWith('Product Insert Successful');
    expect(axios.post).toHaveBeenCalledWith('http://localhost:1337/api/harvest-controller/', expect.any(FormData));
  });
  
  // Test case 4 - check if error message is displayed when success occurs
  it('calls the toast error message when form submission fails', async () => {
    const form = wrapper.find('Form');
    axios.post.mockRejectedValueOnce(new Error('Failed to create harvest'));
    
    await form.simulate('submit');
    
    expect(toastErrorSpy).toHaveBeenCalledWith('Product Insert Unsuccesful');
  });
  
});
