import React from 'react';
import axios from 'axios';
import { LoanForm } from '../pages/Loan/LoanForm';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios');

describe('LoanForm', () => {
  let wrapper;
  const toastSuccessSpy = jest.spyOn(toast, 'success');
  const toastErrorSpy = jest.spyOn(toast, 'error');
  
  beforeEach(() => {
    wrapper = mount(<LoanForm />);
  });
  
  afterEach(() => {
    wrapper.unmount();
  });
  
  // Test case 1 - to check if the entire form is rendered correctly
  it('renders the form fields correctly', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
    expect(wrapper.find('Form.Control')).toHaveLength(5);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
  
  // Test case 2 - to check if state is updated when value is entered
  it('updates the state when form fields change', () => {
    const reasonInput = wrapper.find('Form.Control[placeholder="Brief description .."]');
    const specialNoticeInput = wrapper.find('Form.Control[placeholder="Brief description of special.."]');
    const amountInput = wrapper.find('Form.Control[placeholder="Amount (In LKR).."]');
    const paymentDateInput = wrapper.find('Form.Control[type="date"]');
    
    reasonInput.simulate('change', { target: { value: 'Test reason' } });
    specialNoticeInput.simulate('change', { target: { value: 'Test special notice' } });
    amountInput.simulate('change', { target: { value: '10000' } });
    paymentDateInput.simulate('change', { target: { value: '2023-05-20' } });
    
    expect(wrapper.find('LoanForm').state('reason')).toEqual('Test reason');
    expect(wrapper.find('LoanForm').state('special_notice')).toEqual('Test special notice');
    expect(wrapper.find('LoanForm').state('amount')).toEqual('10000');
    expect(wrapper.find('LoanForm').state('time')).toEqual('2023-05-20');
  });
  
  // Test case 3 - check if toast is displayed when success occurs
  it('calls the toast success message and sends a request to create a new loan when form is submitted successfully', async () => {
    const form = wrapper.find('Form');
    axios.post.mockResolvedValueOnce({ data: {} });
    
    await form.simulate('submit');
    
    expect(toastSuccessSpy).toHaveBeenCalledWith('Loan Requested Successfully');
    expect(axios.post).toHaveBeenCalledWith('http://localhost:1337/api/loan-controller/', expect.any(Object));
  });
  
  // Test case 4 - check if error message is displayed when success occurs
  it('calls the toast error message when form submission fails', async () => {
    const form = wrapper.find('Form');
    axios.post.mockRejectedValueOnce(new Error('Failed to request loan'));
    
    await form.simulate('submit');
    
    expect(toastErrorSpy).toHaveBeenCalledWith('Publish Unsuccesful');
  });
  
});
