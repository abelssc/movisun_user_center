import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import PrivatesRoute from "./PrivatesRoute";
import Profile from "../pages/profile/Profile";
import Password from "../pages/profile/Password";
import Address from "../pages/profile/Address";


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
                path: "my-addresss",
                element: <Address />,
            }
        ],
    },
]);

export default function Routes() {
    return <RouterProvider router={router} />
}