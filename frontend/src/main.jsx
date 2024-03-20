import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import RecipeForm from './pages/RecipeForm.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import SignInForm from './pages/SignInForm.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    children :[
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/about",
        element : <About/>
      },
      {
        path : "/contact",
        element : <Contact/>
      },
      {
        path : "/recipes/create",
        element : <RecipeForm/>
      },
      {
        path : "/recipes/edit/:id",
        element : <RecipeForm/>
      },
      {
        path : "/sign-up",
        element : <SignUpForm/>
      },
      {
        path : "/sign-In",
        element : <SignInForm/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router={router} />

  </React.StrictMode>,
)


