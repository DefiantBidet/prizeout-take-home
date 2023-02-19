import React, { useState } from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';
import useIsMounted from 'react-is-mounted-hook';

import './copy-content.less';

interface CopyContentProps {
    content: string;
    title: string;
}

export const CopyContent: React.FC<CopyContentProps> = ({
    content,
    title,
}): React.ReactElement => {
    const [contentCopied, setContentCopied] = useState(false),
        classes: string = Classnames('copy-container', {
            'copy-success': contentCopied,
        }),
        copyContent = () => {
            if (copiedTimer) {
                clearTimeout(copiedTimer);
            }
            const elem = document.createElement('textarea');
            elem.value = content;
            document.body.appendChild(elem);
            elem.select();
            document.execCommand('copy');
            document.body.removeChild(elem);
            setContentCopied(true);
            copiedTimer = setTimeout(() => {
                if (isMounted()) {
                    setContentCopied(false);
                }
            }, 2500);
        },
        isMounted = useIsMounted();

    let copiedTimer: ReturnType<typeof setTimeout>;

    return (
        <div className={classes}>
            <div className="copy-label-container">
                <p className="copy-label">{title}</p>
                <p className="copied">Copied!</p>
            </div>
            <div className="copy-value-container" onClick={copyContent}>
                <p className="copy-value">{content}</p>
                <span>
                    <i className="fas fa-copy" title="copy-icon"></i>
                </span>
            </div>
        </div>
    );
};

CopyContent.propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
