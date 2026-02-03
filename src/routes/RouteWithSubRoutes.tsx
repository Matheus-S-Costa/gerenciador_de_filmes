import React from 'react';
import { Route } from 'react-router-dom';
import { RouteStructureProps } from '.';

export const RouteWithSubRoutes: React.FC<RouteStructureProps> = route => (
    <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
    />
);
