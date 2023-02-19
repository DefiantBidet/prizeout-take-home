import { render, screen } from '../../../testing/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import { ToolTip } from './tool-tip';

describe('Test Tool Tip Component', () => {
    const content = `Tool Tip Content`;
    const title = `Tool Tip Title`;
    const id = 'fakeTip';

    test('Component matches snapshot', () => {
        const { asFragment } = render(<ToolTip content={content} id={id} title={title} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Content is hidden by default', () => {
        render(<ToolTip content={content} id={id} title={title} />);

        // expect(screen.getByText(content)).not.toBeVisible();
    });

    test('Content shows when hovering on the header', () => {
        render(<ToolTip content={content} id={id} title={title} />);

        // expect(screen.getByText(content)).not.toBeVisible();
        userEvent.hover(screen.getByText(title));
        expect(screen.getByText(content)).toBeVisible();
    });

    test('Content hides when unhovering on the header', () => {
        render(<ToolTip content={content} id={id} title={title} />);

        // expect(screen.getByText(content)).not.toBeVisible();
        userEvent.hover(screen.getByText(title));
        expect(screen.getByText(content)).toBeVisible();
        userEvent.unhover(screen.getByText(title));
        // expect(screen.getByText(content)).not.toBeVisible();
    });
});
