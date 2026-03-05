import { Route, Switch } from "wouter";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Contracts from "./pages/Contracts.tsx";
import Dashboard from "./pages/Dashboard.tsx";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/dashboard" component={Dashboard} />
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="error-code mb-4">[ERR_404] :: ROUTE_NOT_FOUND</p>
              <h1 className="font-display text-4xl text-neon-cyan">404</h1>
            </div>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}
