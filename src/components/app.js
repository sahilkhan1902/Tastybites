import React, { Suspense, lazy, useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";
import RestaurantMenu from "./RestaurantMenu";
import Shimmer from "./shimmer";
import Cart from "./Cart";
import { createBrowserRouter,  RouterProvider , Outlet } from "react-router-dom";
import RestaurantMenu from "./RestaurantMenu";
import Body from "./Body";
import Profile from "./profile";
import { Provider } from "react-redux"
import store from "../utils/Store";
import UserContext from "../utils/UserContext";
// import UserContext from "../utils/UserContext";
const Instamart = lazy(()=> import("./Instamart"))

const AppLayout =()=>{
    return(
        <Provider store={store}>
        <UserContext.Provider value={{
            name : 'Sahil Khan'
        }}>
                <Header/>
                <Outlet/>
                <Footer/>
        </UserContext.Provider>
        </Provider>
    )
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        errorElement : <Error />,
        children:[ {
            path: "/",
            element: <Body/>,
            errorElement : <Error />
        },, {
            path: "/about",
            element: <About/>,
            errorElement : <Error />,
            children : [{
                path : "profile",
                element: < Profile/>
            }]
        },
        {
            path: "/contact",
            element: <Contact/>,
            errorElement : <Error />
        },
        {
            path: "/restaurant/:id",
            element: <RestaurantMenu/>,
            errorElement : <Error />
        }, {
            path : '/cart',
            element : <Cart/>,
        },
        {
            path : '/instamart',
            element : (
                <Suspense fallback={<Shimmer/>}>
                    <Instamart/>
                </Suspense>
            ),
        },]
    },
    
   
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
