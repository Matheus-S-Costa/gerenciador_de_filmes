import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteStructureProps } from '.';
import { RouteWithSubRoutes } from './RouteWithSubRoutes';

export interface RenderRoutesProps {
    routes?: Array<RouteStructureProps>;
}

export const RenderRoutes: React.FC<RenderRoutesProps> = ({ routes }) => (
    <Switch>
        {routes?.map(route => {
            return <RouteWithSubRoutes {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
);
