import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FormPotencia from './FormPotencia.js/FormPotencia';
import Algoritmo from './Algoritmo/Algoritmo';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={FormPotencia} />
            <Route exact path="/algoritmo" component={Algoritmo} />
        </Switch>
    </BrowserRouter>
)

export default Routes;