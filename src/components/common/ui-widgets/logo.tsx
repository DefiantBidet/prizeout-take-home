import React, { Fragment } from 'react';
import Classnames from 'classnames';

import './logo.less';

export const Logo: React.FC = (): React.ReactElement => {
    const classes: string = Classnames(`logo`),
        imgSrc = 'https://assets.prizeout.com/Prizeout-logo.svg';

    return (
        <Fragment>
            <img data-testid="logo" className={classes} src={imgSrc} alt="Prizeout logo" />
        </Fragment>
    );
};
