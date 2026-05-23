import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/public/Home";

// main routes component
// poori app routing yahan handle hogi

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home route */}
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;