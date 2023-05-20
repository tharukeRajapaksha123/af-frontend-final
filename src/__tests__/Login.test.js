import React from 'react';
import axios from 'axios';
import { Login } from '../pages/User/Login';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios');

describe('Login', () => {
  let wrapper;
  const navigateMock = jest.fn();
  
  beforeEach(() => {
    wrapper = mount(<Login />);
    wrapper.setProps({ Navigate: navigateMock });
  });
  
  afterEach(() => {
    wrapper.unmount();
  });
  
  // Test case 1 - to check if the entire form is rendered correctly
  it('renders the form fields correctly', () => {
    expect(wrapper.find('Form')).toHaveLength(1);
    expect(wrapper.find('Form.Control')).toHaveLength(2);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
  
  // Test case 2 - to check if state is updated when value is entered
  it('updates the state when form fields change', () => {
    const emailInput = wrapper.find('Form.Control[placeholder="Email Address"]');
    const passwordInput = wrapper.find('Form.Control[placeholder="Password"]');
    
    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password123' } });
    
    expect(wrapper.find('Login').state('email')).toEqual('test@example.com');
    expect(wrapper.find('Login').state('password')).toEqual('password123');
  });
  
  // Test case 3 - check if form submission triggers correct API call and navigation
  it('sends a request to login and navigates to the home page on successful login', async () => {
    const form = wrapper.find('Form');
    axios.post.mockResolvedValueOnce({ data: { 
      message: 'Login successful',
      user: {
        _id: 'user_id',
        role: 'user_role',
        name: 'user_name',
        email: 'user_email'
      },
      token: 'token_value'
    } });
    
    await form.simulate('submit');
    
    expect(axios.post).toHaveBeenCalledWith('http://localhost:1337/api/auth-controller/login', {
      email: expect.any(String),
      password: expect.any(String)
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(5);
    expect(localStorage.setItem).toHaveBeenCalledWith('uid', 'user_id');
    expect(localStorage.setItem).toHaveBeenCalledWith('Role', 'user_role');
    expect(localStorage.setItem).toHaveBeenCalledWith('Name', 'user_name');
    expect(localStorage.setItem).toHaveBeenCalledWith('Email', 'user_email');
    expect(localStorage.setItem).toHaveBeenCalledWith('Token', 'token_value');
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
  
  // Test case 4 - check if error message is displayed when login fails
  it('displays an error message when login fails', async () => {
    const form = wrapper.find('Form');
    axios.post.mockRejectedValueOnce(new Error('Failed to login'));
    
    await form.simulate('submit');
    
    expect(alert).toHaveBeenCalledWith('UserName or Password incorrect');
  });
  
});
