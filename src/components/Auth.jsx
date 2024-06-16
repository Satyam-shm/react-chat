import React from "react";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleLogo from "../assets/Google.png";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default function Auth(props) {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      cookies.set("auth-token", res.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Sign in with Google</h2>
      <button onClick={signInWithGoogle}>
        <img src={GoogleLogo} alt="Google Logo" height={50} width={400} />
      </button>
    </div>
  );
}
