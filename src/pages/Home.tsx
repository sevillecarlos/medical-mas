import React, { useEffect } from "react";
import Auth from "../components/Auth";
import Appointment from "./Appointment";
import { authAction } from "../store/slices/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    dispatch(authAction.getToken());
    return () => {
      // cleanup;
    };
  }, [dispatch]);

  return <div>{auth.token ? <Appointment /> : <Auth />}</div>;
};

Home.propTypes = {};

export default Home;
