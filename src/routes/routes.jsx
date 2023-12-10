import Home from '../views/Home';
import Categories from '../views/Categories';
import About from '../views/About';

const routes = [
  {
    name: 'Inicio',
    path: '/',
    element: <Home />,
    index: 0,
  },
  {
    name: 'Categorias',
    path: '/categories',
    element: <Categories />,
    index: 1,
  },
  {
    name: 'Acerca de',
    path: '/about',
    element: <About />,
    index: 2,
  },
];

export default routes;
