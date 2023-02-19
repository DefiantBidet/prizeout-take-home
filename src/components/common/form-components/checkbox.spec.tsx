import { render, screen } from '../../../testing/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import { Checkbox } from './checkbox';

describe('Test Checkbox Component', () => {
    const content = `Checkbox content`;
    const id = `checkbox-test-id`;
    const isRequired = true;
    const title = `Checkbox content`;

    // Matches snapshot
    test('Component matches snapshot', () => {
        const { asFragment } = render(<Checkbox content={content} id={id} isRequired={isRequired} title={title} />);

        expect(asFragment()).toMatchSnapshot();
    });

    // Checkbox has description
    test('Checkbox description is displayed', () => {
        render(<Checkbox content={content} id={id} isRequired={isRequired} title={title} />);

        expect(screen.getByText(content)).toBeVisible();
    });

    // Checkbox has type checkbox
    test('Checkbox input has type checkbox', () => {
        render(<Checkbox content={content} id={id} isRequired={isRequired} title={title} />);

        expect(screen.getByTestId('checkbox-input')).toHaveAttribute('type', expect.stringContaining('checkbox'));
    });

    // class of "checkbox"
    test('Checkbox has a class of checkbox', () => {
        render(<Checkbox content={content} id={id} isRequired={isRequired} title={title} />);

        expect(screen.getByTestId('checkbox-label')).toHaveClass('checkbox');
    });

    // is Required? aria-required
    test('Checkbox is required', () => {
        render(<Checkbox content={content} id={id} isRequired={isRequired} title={title} />);

        expect(screen.getByTestId('checkbox-input')).toBeRequired();
    });

    // Checkbox is not required
    test('Checkbox is not required', () => {
        render(<Checkbox content={content} id={id} title={title} />);

        expect(screen.getByTestId('checkbox-input')).not.toBeRequired();
    });

    // Checkbox is checked on click
    test('Checkbox is checked', () => {
        render(<Checkbox content={content} id={id} isRequired={isRequired} title={title} />);

        userEvent.click(screen.getByText(content));
        expect(screen.getByTestId('checkbox-input')).toBeChecked();
        expect(screen.getByTestId('checkbox-input-control')).toHaveAttribute('aria-checked');
    });
});
