import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from './pages/Main';
import { IRootState } from "./store";

const App: FunctionComponent = () => {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <Router>

      {<Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/dashboard'
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
      </Routes>}
    </Router>
  );
}

export default App;