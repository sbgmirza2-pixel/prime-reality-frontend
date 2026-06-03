import { Navigate } from "react-router-dom";

import {
  getAccessToken,
  getUserRole,
} from "../utils/helpers/authHelper";

// protected route
// token + role dono check ho rahe hain

function PrivateRoute({ children, allowedRole }) {
  const token = getAccessToken();

  const role = getUserRole();

  // agar token nahi hai to login pe bhej do

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // agar role match nahi kar raha to unauthorized page pe bhej do

  const normalizedAllowedRole = allowedRole?.toString().toLowerCase();
  const normalizedRole = role?.toString().toLowerCase();

  if (normalizedAllowedRole && normalizedRole !== normalizedAllowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}


export default PrivateRoute;
