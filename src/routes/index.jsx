import ErrorPage from "../error-page";
import Expriment from "./expriment";
import HomePage from "./home";
import Layout from "./layout";
import NewExpriment from "./newExpriment";
import UpdateExpriment from "./updateExpriment";
import Contributors from "./contributors";

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
                path: "/experiment/new",
                element: <UpdateExpriment />
            },
            {
                path: "/experiment/:id",
                element: <UpdateExpriment />
            },
            {
                path: "/manage-contributors",
                element: <Contributors />
            },
        ]
    },

];

export default routes;