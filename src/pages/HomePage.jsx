import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import StudentForm from "../Components/StudentForm.jsx";

const NotFound = () => <h1 className="text-center text-amber-300 text-5xl mt-20">404 - Page Not Found</h1>;

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/form", element: <StudentForm /> },
    { path: "*", element: <NotFound /> }, 
]);

function Pages() {
    return <RouterProvider router={router} />;
}

export default Pages;
