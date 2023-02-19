import React from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';

import './bonus-tag.less';

interface BonusTagProps {
    size?: string;
    type: string;
    value: number;
}

export const BonusTag: React.FC<BonusTagProps> = ({ type, value, size }): React.ReactElement => {
    const classes: string = Classnames(
        `bonus-tag`,
        { monetary: type === 'monetary' },
        { [`bonus-tag--${size}`]: size },
    );
    const bonus = type === 'monetary' ? `$${value}` : `${value}%`;

    return (
        <div className={classes}>
            <div className="bonus-tag__container">
                <div>
                    <i className="fak fa-prizeout-bonus-icon" />
                    <small>{bonus}</small>
                </div>
            </div>
        </div>
    );
};

BonusTag.propTypes = {
    size: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};
