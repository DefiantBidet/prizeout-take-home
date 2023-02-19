import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../form-components';

import './back-button.less';

interface BackButtonProps {
    onClick: () => void;
    orientation?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, orientation }): React.ReactElement => {
    const icon = orientation === 'right' ? 'far fa-chevron-right' : 'far fa-chevron-left';
    const ariaLabel = orientation === 'right' ? 'Move forward' : 'Move back';

    return <Button ariaLabel={ariaLabel} icon={icon} onClick={onClick} className="back-button" />;
};

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    orientation: PropTypes.string,
};
