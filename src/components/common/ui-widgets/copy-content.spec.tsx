import { render, screen } from '../../../testing/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import { CopyContent } from './copy-content';

jest.useFakeTimers();

describe('Test Copy Component', () => {
    const content = `Copy Me Content`;
    const title = `Copy Title`;
    const mockDocumentExecCommand = jest.fn((): boolean => true);

    beforeEach(() => {
        document.execCommand = mockDocumentExecCommand;
    });

    test('Component matches snapshot', () => {
        const { asFragment } = render(<CopyContent content={content} title={title} />);
        expect(asFragment()).toMatchSnapshot();
    });

    // test copied message shows
    test('Copied message shows when clicking on the container', () => {
        render(<CopyContent content={content} title={title} />);

        userEvent.click(screen.queryByTitle('copy-icon'), { button: 0 });
        expect(screen.getByText('Copied!')).toBeVisible();
    });

    test('Copy to clipboard function has been called', async () => {
        render(<CopyContent content={content} title={title} />);
        userEvent.click(screen.queryByTitle('copy-icon'), { button: 0 });
        expect(mockDocumentExecCommand.mock.calls.length).toBe(1);
    });

    // test('Copied message hides after timeout', async () => {
    //     act(() => {
    //         render(<CopyContent content={content} title={title} />);
    //     });

    //     userEvent.click(screen.queryByTitle('copy-icon'), { button: 0 });

    //     act(() => {
    //         jest.runAllTimers();
    //     });

    //     expect(screen.getByText('Copied!')).not.toBeVisible();
    // });
});
