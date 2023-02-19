import React from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';

import './alert.less';

interface AlertProps {
    message: string;
    type: 'error' | 'warning' | 'success' | undefined;
}

export const Alert: React.FC<AlertProps> = ({ message, type }): React.ReactElement => {
    const classes: string = Classnames(`alert`, `alert--${type}`);

    return (
        <div data-testid="alert-icon" className={classes} role="alert" aria-atomic="true">
            <span className="alert__icon"></span>
            <p className="alert__message">{message}</p>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'warning', 'success', undefined]),
};
