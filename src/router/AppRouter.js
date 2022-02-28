import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authCheckingLoginState } from "../actions/actions";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  const dispatch = useDispatch();
  const {checkingLoginState} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(authCheckingLoginState());
  }, [dispatch]);

  if (checkingLoginState)
  {
    return <h5>Espere...</h5>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <PrivateRoute>
              <CalendarScreen />
            </PrivateRoute>
        } />
        <Route path="login" element={
        <PublicRoute>  
        <LoginScreen />
        </PublicRoute>
        } />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
