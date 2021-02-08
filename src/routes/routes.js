import React, { Suspense, lazy } from 'react';
import {Route, Switch} from "react-router";

const Users = lazy(() => import('./users/view'));

const Routes = () => {
    return <div>
        <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
                <Route path='/' component={Users} />
            </Switch>
        </Suspense>
    </div>
};

export default Routes;
