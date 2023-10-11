import ErrorPage from "../error-page";
import Expriment from "./expriment";
import HomePage from "./home";
import Layout from "./layout";
import NewExpriment from "./newExpriment";

const routes = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/products-and-swatches",
                element: <div>Contact</div>
            },
            {
                path: "/expriment",
                element: <Expriment />
            },
            {
                path: "/expriment/new",
                element: <NewExpriment />
            }
        ]
    },

];

export default routes;