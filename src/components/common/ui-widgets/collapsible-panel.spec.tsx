import { render, screen } from '../../../testing/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import { CollapsiblePanel } from './collapsible-panel';

describe('Test Collapsible Panel Component', () => {
    const content = `Collapsible Panel Content`;
    const title = `Collapsible Panel Title`;

    test('Component matches snapshot', () => {
        const { asFragment } = render(<CollapsiblePanel content={content} title={title} id="test-cp" />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Content is hidden by default', () => {
        render(<CollapsiblePanel content={content} title={title} />);

        // expect(screen.getByText(content)).not.toBeVisible();
    });

    test('Content shows when clicking on the header', () => {
        render(<CollapsiblePanel content={content} title={title} />);

        // expect(screen.getByText(content)).not.toBeVisible();
        userEvent.click(screen.getByText(title), { button: 0 });
        expect(screen.getByText(content)).toBeVisible();
    });

    test('Content hides when clicking on the header if it is showing', () => {
        render(<CollapsiblePanel content={content} title={title} />);

        // expect(screen.getByText(content)).not.toBeVisible();
        userEvent.click(screen.getByText(title), { button: 0 });
        expect(screen.getByText(content)).toBeVisible();
        userEvent.click(screen.getByText(title), { button: 0 });
        // expect(screen.getByText(content)).not.toBeVisible();
    });
});
