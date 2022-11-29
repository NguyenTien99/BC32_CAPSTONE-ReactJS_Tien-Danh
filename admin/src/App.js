import "./App.module.scss";
import routes from "./Router/routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
