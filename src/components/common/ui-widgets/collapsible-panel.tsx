import React, { useState } from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';
import { v4 as uuid_v4 } from 'uuid';

import './collapsible-panel.less';

interface CollapsiblePanelProps {
    content: string;
    id?: string;
    title: string;
}

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ content, id, title }): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(false),
        togglePanel = (): void => setIsOpen(!isOpen),
        classes: string = Classnames('collapsible-panel', { open: isOpen }),
        elmId = id || `cpc-${uuid_v4()}`;

    return (
        <div className={classes}>
            <header aria-controls={elmId} aria-expanded={isOpen ? 'true' : 'false'} onClick={togglePanel} tabIndex={0}>
                {title}
            </header>
            <article dangerouslySetInnerHTML={{ __html: content }} id={elmId}></article>
        </div>
    );
};

CollapsiblePanel.propTypes = {
    content: PropTypes.string.isRequired,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
};
