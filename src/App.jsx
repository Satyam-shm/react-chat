import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Room from "./components/Room";

const cookies = new Cookies();

export default function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  return isAuth ? <Room /> : <Auth setIsAuth={setIsAuth} />;
}
