import React, { useEffect } from "react";
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
import SimpleDiningPage from "./pages/SimpleDiningPage";
import HomePage from "./pages/HomePage";
import FoodPage from "./pages/FoodPage";
import BeveragePage from "./pages/BeveragePage";
import OrderPage from "./pages/OrderPage";
import CabinServicePage from "./pages/CabinServicePage";
import WelcomePage from "./pages/WelcomePage";
import FlightInfoPage from "./pages/FlightInfoPage";
import KrisWorldPage from "./pages/KrisWorldPage";
import FeedbackPage from "./pages/FeedbackPage";
import KrisShopPage from "./pages/KrisShopPage";
import { isMobile } from "./platform";
import AircrewDiningPage from "./pages/AircrewDiningPage";

const App: React.FunctionComponent = () => {
  useEffect(() => {
    if (isMobile()) {
      let html = document.getElementById("html");
      if (html) {
        html.setAttribute("mode", "ios");
      }
    }
  }, []);

  return (
    <Router>
      {/* Conditional routing - If not authenticated, bring to login screen */}
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <div className="App">
        <IonPage>
          <IonRouterOutlet>
            <Route path="/welcome" component={WelcomePage} exact={true} />
            <Route path="/home" component={HomePage} exact={true} />
            <Route path="/dining" component={DiningPage} exact={true} />
            <Route
              path="/simple-dining"
              component={SimpleDiningPage}
              exact={true}
            />
            <Route path="/beverage" component={BeveragePage} exact={true} />
            <Route
              path="/food"
              exact={true}
              render={props => <FoodPage {...props} />}
            />
            <Route path="/orders" component={OrderPage} exact={true} />
            <Route path="/service" component={CabinServicePage} exact={true} />
            <Route
              path="/flight-info"
              component={FlightInfoPage}
              exact={true}
            />
            <Route path="/krisworld" component={KrisWorldPage} exact={true} />
            <Route path="/krisshop" component={KrisShopPage} exact={true} />
            <Route path="/feedback" component={FeedbackPage} exact={true} />
            <Route
              path="/aircrew/dining"
              component={AircrewDiningPage}
              exact={true}
            />
          </IonRouterOutlet>
        </IonPage>
      </div>
    </Router>
  );
};

export default App;
