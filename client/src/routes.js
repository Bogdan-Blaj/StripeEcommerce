import React from 'react'
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home/home';
import RegisterLogin from './components/RegisterLogin/registerLogin';
import Layout from './hoc/layout';
import Register from './components/RegisterLogin/register';
import Auth from './components/Login/Auth';

const Routes = () => {
    return(
        <Layout>
            <Switch>
                <Route path ="/" exact component = {Home} />
                <Route path ="/auth" exact component = {Auth} />
            </Switch>
        </Layout>

    )
}

export default Routes;