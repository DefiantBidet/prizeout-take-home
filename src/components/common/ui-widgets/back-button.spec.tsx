import { render, screen } from '../../../testing/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { BackButton } from './back-button';

describe('Test Back Button Component', () => {
    const onClick = jest.fn();

    test('Component matches snapshot', () => {
        const { asFragment } = render(<BackButton onClick={onClick} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Component orientation is correct', () => {
        const { container } = render(<BackButton orientation="right" onClick={onClick} />);

        expect(container.getElementsByClassName('far fa-chevron-right').length).toBe(1);
    });

    test('Component can call onClick', () => {
        render(<BackButton onClick={onClick} />);

        userEvent.click(screen.getByTestId('button'));
        userEvent.click(screen.getByTestId('button'));
        expect(onClick).toHaveBeenCalledTimes(2);
    });
});
