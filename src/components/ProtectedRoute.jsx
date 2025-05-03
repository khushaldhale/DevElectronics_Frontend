import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminRoute }) => {
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const userInfo = useSelector((state) => {
    return state.auth.userInfo;
  });

  //   if not logged in  then redirect to login route
  if (!isLoggedIn) {
    return <Navigate to={"/login"}></Navigate>;
  }

  console.log(isLoggedIn, userInfo.accountType);

  if (isLoggedIn && userInfo.accountType == "admin" && !adminRoute) {
    return (
      <div>
        <p>This is a protected route for User only</p>
      </div>
    );
  }

  if (isLoggedIn && userInfo.accountType == "user" && adminRoute) {
    return (
      <div>
        <p>This is a protected route for Admin only</p>
      </div>
    );
  }

  //    if everything goes well then redirect it
  return children;
};

export default ProtectedRoute;
