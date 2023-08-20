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
import { Provider } from "react-redux";
import dataCenter from "./dataBase/dataCenter"
import App from "./App";
import Overview from "./components/Overview";
import HomePage from "./pages/HomePage";
import DisplayProducts from "./components/DisplayProducts";
import PagesContainer from "./pages/PagesContainer";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Overview />} />
          <Route path="categories/:category" element={<DisplayProducts />} />
        </Route>
        <Route path="/:sign-up" element={<SignUpPage />} />
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
  <Provider store={dataCenter}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);