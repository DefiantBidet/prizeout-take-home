import React from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';

import './button.less';

interface ButtonProps {
    ariaLabel: string;
    className?: string;
    color?: string;
    icon?: string;
    id?: string;
    isDisabled?: boolean;
    isInline?: boolean;
    isLink?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    size?: string;
    text?: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

export const Button: React.FC<ButtonProps> = ({
    ariaLabel,
    className,
    color,
    isDisabled,
    icon,
    id,
    isInline,
    isLink,
    isLoading,
    onClick,
    size,
    text,
    type,
}): React.ReactElement => {
    const classes: string = Classnames(
        `button`,
        { [`button--${color}`]: color },
        { [`button--${size}`]: size },
        { 'button--disabled': isDisabled },
        { 'button--link': isLink },
        { 'button--inline': isInline },
        { 'button--loading': isLoading },
        className,
    );

    return (
        <button
            data-testid="button"
            onClick={onClick}
            id={id}
            type={type}
            className={classes}
            aria-label={ariaLabel}
            title={text}
            disabled={isDisabled}
        >
            {!isLoading && text && <span>{text}</span>}

            {icon && <i className={icon}></i>}

            {isLoading && (
                <div className="button__icon-wrapper">
                    <i data-testid="button-loading" className="fas fa-spinner fa-spin"></i>
                </div>
            )}
        </button>
    );
};

Button.propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isInline: PropTypes.bool,
    isLink: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.oneOf(['submit', 'reset', 'button', undefined]),
};
