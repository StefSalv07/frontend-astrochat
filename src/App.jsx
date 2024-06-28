import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthAsync, signOutAsync } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(checkAuthAsync()).unwrap();
        console.log("result: " + result);
      } catch (error) {
        console.error("Error in fetchData:", error);
        if (error === "Token expired") {
          const signOutResult = await dispatch(signOutAsync());
          if (signOutResult.payload.status === 200) {
            navigate("/");
          }
        } else if (error === "Token not found") {
          return;
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
