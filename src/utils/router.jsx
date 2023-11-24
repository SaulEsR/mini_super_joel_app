import Categories from "../views/Categories";
import Shop from "../views/Shop";

const routes = [
    {
        name: "Tienda",
        path: "/",
        element: <Shop />,
        index: 0,
    },
    {
        name: "Categorias",
        path: "/categories",
        element: <Categories />,
        index: 1,
    },
];

export default routes;
