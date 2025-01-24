import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import PrivatesRoute from "./PrivatesRoute";
import Profile from "../pages/profile/Profile";
import Password from "../pages/profile/Password";
import Address from "../pages/profile/Address";
import Orders from "../pages/orders/Orders";
import OrderDetail from "../pages/orders/OrderDetail";
import Refund from "../pages/interests/Refund";
import Reviews from "../pages/interests/Reviews";


const router= createBrowserRouter([
    {
        path: import.meta.env.VITE_BASE_URL,
        element: <PrivatesRoute/>,
        children: [
            {
                index: true,
                loader: () => redirect("profile"),
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "password",
                element: <Password />,
            },
            {
                path: "my-address",
                element: <Address />,
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "orders/:id",
                element: <OrderDetail />,
            },
            {
                path: "reviews",
                element: <Reviews />,
            },
            {
                path: "refunds",
                element: <Refund />,
            }
        ],
    },
]);

export default function Routes() {
    return <RouterProvider router={router} />
}