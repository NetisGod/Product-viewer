import React from 'react'
import {Route, Switch, } from 'react-router-dom'

import App from './App'
import Categories from './Categories'
import Pagination from './Pagination'

import NotFound from './NotFound'

const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/categories/:item' component={App}/>

            <Route path='*' component={NotFound}/>
        </Switch>
    </main>
);

export default Routes;