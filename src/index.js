import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Cipher from './pages/Cipher';
import Name from './pages/Name';
import Levels from './pages/Levels';
import LeaderBoard from './pages/LeaderBoard';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Home/>},
  { path: '/Name', element: <Name/> },
  { path: '/Levels', element: <Levels/>},
  { path: '/Cipher-game', element:<Cipher/>},
  { path: '/Leaderboard', element:<LeaderBoard/>},
  // Add more routes here
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

