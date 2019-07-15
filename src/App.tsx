import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import "./App.css";

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

import DiningPage from "./pages/DiningPage";
import HomePage from "./pages/HomePage";
import FoodPage from "./pages/FoodPage";

// const HomePage = React.lazy(() => import("./pages/HomePage"));
// const DiningPage = React.lazy(() => import("./pages/DiningPage"));

const App: React.SFC = () => (
  <Router>
    {/* Conditional routing - If not authenticated, bring to login screen */}
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <div className="App">
      <IonPage>
        <IonRouterOutlet>
          <Route path="/home" component={HomePage} exact={true} />
          <Route path="/dining" component={DiningPage} exact={true} />
          <Route
            path="/food"
            exact={true}
            render={props => <FoodPage {...props} />}
          />
        </IonRouterOutlet>
      </IonPage>
    </div>
  </Router>
);

export default App;
