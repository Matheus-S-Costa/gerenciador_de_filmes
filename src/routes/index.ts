import { moviesModuleRoute } from '../modules/movies/config/routes';
import { myListModuleRoutes } from '../modules/myList/config/routes';
import { RenderRoutesProps } from './RenderRoutes';

export interface RouteStructureProps {
    path: string;
    key: string;
    exact: true;
    component: React.FC<RenderRoutesProps>;
    routes?: Array<RouteStructureProps>;
}

export const routes: Array<RouteStructureProps> = [
    ...moviesModuleRoute,
    ...myListModuleRoutes,
];
