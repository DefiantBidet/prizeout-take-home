import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid_v4 } from 'uuid';

import './checkbox.less';

interface CheckboxProps {
    content: string;
    id?: string;
    isRequired?: boolean;
    register?: Record<string, unknown>;
    title: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ content, id, isRequired, register, title }): React.ReactElement => {
    const [isChecked, setIsChecked] = useState(false),
        toggleChecked = (): void => setIsChecked(!isChecked),
        elmId = id || `checkbox-${uuid_v4()}`;

    return (
        <Fragment>
            <label data-testid="checkbox-label" className="checkbox" htmlFor={elmId}>
                <input
                    data-testid="checkbox-input"
                    id={elmId}
                    className="checkbox__input"
                    type="checkbox"
                    title={title}
                    onClick={toggleChecked}
                    {...register}
                    aria-required={isRequired}
                    defaultChecked={isChecked}
                />
                <span
                    data-testid="checkbox-input-control"
                    className="checkbox__control"
                    aria-checked={isChecked}
                    aria-labelledby={elmId}
                >
                    <small data-testid="checkbox-description" dangerouslySetInnerHTML={{ __html: content }}></small>
                </span>
            </label>
        </Fragment>
    );
};

Checkbox.propTypes = {
    content: PropTypes.string.isRequired,
    id: PropTypes.string,
    isRequired: PropTypes.bool,
    register: PropTypes.any,
    title: PropTypes.string,
};
