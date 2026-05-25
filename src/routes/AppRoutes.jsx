import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/public/Home";
import ContactUs from "../pages/public/ContactUs";

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

        {/* contact route */}
        <Route
          path="/contact"
          element={<ContactUs />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;