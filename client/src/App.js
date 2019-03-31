import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

import Routes from "../src/components/Routes";
import TopNavigation from "./components/topNavigation";
import SideNavigation from "./components/sideNavigation";
import AvailableLoad from "./components/actors/AvailableLoad";
import Acadamic from "./components/actors/Acadamic";
//import Footer from "./components/Footer";
import "./index.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Union from "./components/actors/Union";
import Lecturer from "./components/actors/Lecturer";
import Calender from "./components/Calender/Calender";
import Availabilitytable from "./components/Tables/Availabilitytable";
import BookingForm from "./components/BookingForm/BookingForm";
import HallRegister from "./components/HallRegister/Hallregister";

import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";

import "./App.css";

//check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //  Clear current Profile
    store.dispatch(clearCurrentProfile);
    // Redirect to login
    window.location.href = "/login";
  }
}

const style = {
  //this for Calender
  position: "relative",
  margin: "50px auto"
};

class App extends Component {
  onDayClick = (e, day) => {
    alert(day);
  };

  render() {
    return (
      <Router>
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <Route exact path="/available" component={AvailableLoad} />
          <Route exact path="/acadamic" component={Acadamic} />
          <Route exact path="/lec" component={Lecturer} />
          <Route exact path="/HallRegister" component={HallRegister} />

          <main id="content" className="p-5">
            <Routes />
          </main>

          {/* <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/union" component={Union} />
              <Route exact path="/Lecturer" component={Lecturer} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
            </div>

            <Footer />
            <Calender
              style={style}
              width="302px"
              onDayClick={(e, day) => this.onDayClick(e, day)}
           />
          </div>
        </Router>
      </Provider>   */}
        </div>
      </Router>
    );
  }
}

export default App;
