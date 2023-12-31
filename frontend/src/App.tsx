import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';
import Spinner from './components/Spinner/Spinner';


let API_IP = process.env.REACT_APP_API_IP
if (!API_IP) {
  API_IP = '127.0.0.1'
}

export const API_URL = `http://${API_IP}:8000/api/v1/pizzas`


const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const SinglePizza = React.lazy(
  () => import(/* webpackChunkName: "SinglePizza" */ './pages/SinglePizza/SinglePizza'),
);

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <SinglePizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Spinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
