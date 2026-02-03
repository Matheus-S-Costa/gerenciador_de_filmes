import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with label', () => {
    render(<Button label="my button" />);
    const btn = screen.getByText(/my button/i);
    expect(btn).toBeInTheDocument();
});
