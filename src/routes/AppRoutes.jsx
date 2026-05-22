import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// temporary pages
// later actual pages yahan import honge
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F]">
      <h1 className="text-5xl font-bold text-[#C9A03D]">
        Prime Reality
      </h1>
    </div>
  );
}
// main routes component
// poori app routing yahan handle hogi
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;