import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders header', () => {
    render(<App />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
});

test('renders home router with form', () => {
    render(<App />);
    const button = screen.getByText(/search/i);
    expect(button).toBeInTheDocument();
});
