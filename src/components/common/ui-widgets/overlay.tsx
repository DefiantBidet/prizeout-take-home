import React from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';

import './overlay.less';

interface OverlayProps {
    onClick?: () => void;
    zIndexType: string;
}

export const Overlay: React.FC<OverlayProps> = ({ zIndexType, onClick }): React.ReactElement => {
    const classes: string = Classnames(`overlay`, {
        [`z-index-${zIndexType}`]: zIndexType,
    });

    return <div data-testid="overlay" className={classes} onClick={onClick}></div>;
};

Overlay.propTypes = {
    onClick: PropTypes.func,
    zIndexType: PropTypes.string.isRequired,
};
