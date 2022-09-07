import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startChecking } from "../actions/auth";
import "./loading.css";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {!!uid ? (
          <Route path="/*" element={<CalendarScreen />} />
        ) : (
          <Route path="login/*" element={<LoginScreen />} />
        )}{" "}
        <Route path="/*" element={<Navigate to="login" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
