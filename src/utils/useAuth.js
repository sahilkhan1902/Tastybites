import { useState } from "react";

const useAuth = () => {
  const [isloggedin, setisLoggedin] = useState(false);

  const handleLogin = () => {
    setisLoggedin(true);
  };

  const handleLogout = () => {
    setisLoggedin(false);
  };

  return {
    isloggedin,
    handleLogin,
    handleLogout
  };
};

export default useAuth;