import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { IonPage, IonRouterOutlet, IonProgressBar } from "@ionic/react";
import './App.css';

/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

const Home = React.lazy(() => import("./pages/Home"));
const Menu = React.lazy(() => import("./pages/Menu"));

const App: React.SFC = () => (
    <Router>
      {/* Conditional routing - If not authenticated, bring to login screen */}
      <Route
          exact
          path="/"
          render={() =>
              <Redirect to="/home" />
          }
      />
      <div className="App">
        <IonPage>
          <Suspense fallback={<IonProgressBar type="indeterminate"></IonProgressBar>}>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/menu" component={Menu} exact={true} />
            </IonRouterOutlet>
          </Suspense>
        </IonPage>
      </div>
    </Router>
);

export default App;
