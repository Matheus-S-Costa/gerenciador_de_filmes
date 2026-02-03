import { RouteStructureProps } from '../../../routes';
import { MyList } from '../pages/MyList';

export enum MyListRoutePaths {
    MyList = '/my-list',
}
export const myListModuleRoutes: Array<RouteStructureProps> = [
    {
        path: MyListRoutePaths.MyList,
        key: 'MY_LIST',
        exact: true,
        component: MyList,
    },
];
