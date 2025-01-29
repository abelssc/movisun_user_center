import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import PrivatesRoute from "./PrivatesRoute";
import Orders from "../pages/orders/Orders";
import OrderDetail from "../pages/orders/OrderDetail";
import PublicRoute from "./PublicRoutes";
import Login from "../pages/auth/Login";


const router= createBrowserRouter([
    {
        path: import.meta.env.VITE_BASE_URL,
        element: <PrivatesRoute/>,
        children: [
            {
                index: true,
                loader: () => redirect("orders"),
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "orders/:id",
                element: <OrderDetail />,
            },
        ],
    },
    {
        path: import.meta.env.VITE_BASE_URL+"/auth",
        element: <PublicRoute />,
        children: [
            {
                path: "login",
                element: <Login />,
            }
        ]
    }
]);

export default function Routes() {
    return <RouterProvider router={router} />
}