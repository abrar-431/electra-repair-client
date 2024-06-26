import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from '../Components/Root'
import Services from "../Layout/Services";
import Home from "../Layout/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import AddService from "../Components/AddService";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../Layout/ServiceDetails";
import ManageService from "../Layout/ManageService";
import ErrorPage from "../Components/ErrorPage";
import BookedService from "../Layout/BookedService";
import UpdateService from "../Components/UpdateService";
import ServiceToDo from "../Components/ServiceToDo";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
            path: '/services',
            element: <Services></Services>,
            loader: ()=>fetch('https://assignment-11-server-side-alpha.vercel.app/services')
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/add-service',
          element: <PrivateRoute><AddService></AddService></PrivateRoute>
        },
        {
          path: '/services/:id',
          element:<PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
          loader: ({params})=>fetch(`https://assignment-11-server-side-alpha.vercel.app/services/${params.id}`)
        },
        {
          path: '/manage-service',
          element: <PrivateRoute><ManageService></ManageService></PrivateRoute>
        },
        {
          path: '/booked-service',
          element: <PrivateRoute><BookedService></BookedService></PrivateRoute>,
          loader: ()=>fetch('https://assignment-11-server-side-alpha.vercel.app/booked-services')
        },
        {
          path: '/update-service/:id',
          element: <PrivateRoute><UpdateService></UpdateService></PrivateRoute>,
          loader: ({params})=>fetch(`https://assignment-11-server-side-alpha.vercel.app/services/${params.id}`)
        },
        {
          path: '/todo-service',
          element: <PrivateRoute><ServiceToDo></ServiceToDo></PrivateRoute>,
          loader: ()=>fetch('https://assignment-11-server-side-alpha.vercel.app/booked-services')
        }
      ]
    },
  ]);

  export default router;