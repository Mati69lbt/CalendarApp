import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<CalendarScreen />} />
        <Route path="login/*" element={<LoginScreen />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
