import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import routes from './routes';

import './App.css';
import "./assets/scss/_abstracts.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const router = createBrowserRouter(routes);

function App() {
  return (<RouterProvider router={router} />)
}

export default App;