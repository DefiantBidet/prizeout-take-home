import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const RouterWrapper = ({
    component,
    restricted,
    path,
}: {
    component: React.FC | React.ComponentType;
    restricted: boolean;
    path: string;
}): JSX.Element => {
    const isLoggedIn: boolean = cookies.get('accessTokenIssued') != null;
    const Component = component;
    return <Route path={path} render={() => (!isLoggedIn && restricted ? <Redirect to="/" /> : <Component />)} />;
};

export default RouterWrapper;
