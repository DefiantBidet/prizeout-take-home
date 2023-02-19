import React, { useState } from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';
import { useHotkeys } from 'react-hotkeys-hook';

import './tool-tip.less';

interface ToolTipProps {
    content: string;
    id?: string;
    title: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({ content, id, title }): React.ReactElement => {
    const [isShowing, setIsShowing] = useState(false),
        showToolTip = (): void => setIsShowing(true),
        hideToolTip = (): void => setIsShowing(false),
        classes: string = Classnames('tool-tip', { showing: isShowing }),
        elmId = id || `tt-id`,
        contentId = `${elmId}-content`;

    useHotkeys('esc', () => {
        if (document.activeElement === document.getElementById(elmId)) {
            hideToolTip();
        }
    });

    useHotkeys('enter', () => {
        if (document.activeElement === document.getElementById(elmId)) {
            showToolTip();
        }
    });

    return (
        <div
            onBlur={hideToolTip}
            onFocus={showToolTip}
            aria-hidden={!isShowing ? 'true' : 'false'}
            className={classes}
            id={elmId}
            tabIndex={0}
        >
            <header aria-describedby={contentId} onMouseEnter={showToolTip} onMouseLeave={hideToolTip}>
                {title}
            </header>
            <article id={contentId}>{content}</article>
        </div>
    );
};

ToolTip.propTypes = {
    content: PropTypes.string.isRequired,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
};
