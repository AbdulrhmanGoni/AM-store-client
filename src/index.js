import "normalize.css/normalize.css"
import "./index.css"
import "./FormCustomize.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import dataCenter from "./dataBase/dataCenter"

import App from "./App";
import Overview from "./components/Overview";
import HomePage from "./pages/HomePage";
import DisplayProducts from "./components/DisplayProducts";
import PagesContainer from "./pages/PagesContainer";
import SingUpPage from "./pages/SingUpPage";
import LogInPage from "./pages/LogInPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Overview />} />
          <Route path="categories/:category" element={<DisplayProducts />} />
        </Route>
        <Route path="/sing-up" element={<SingUpPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/:pagePath/:id" element={<PagesContainer />} />
        <Route path="/:pagePath" element={<PagesContainer />} />
      </Route>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={"919302714566-ovuqf6qk6hsobdj29fecmui8eub7bqn6.apps.googleusercontent.com"}>
    <Provider store={dataCenter}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
