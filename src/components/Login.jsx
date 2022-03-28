import { useState, useEffect } from "react";
import "../css/login.scss";
import { RiLoginBoxLine } from "react-icons/ri";
import Cookies from "js-cookie"; //https://www.npmjs.com/package/js-cookie
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoggedStatus } from "../js/shared.js";

function Login(props) {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setLoggedInStatus] = useState(false);

  const [allowedEmailsArray, setAllowedEmailsArray] = useState([
    "kevin.dowd@gmail.com",
    "uksep1790@gmail.com",
    "270045328@yoobeestudent.ac.nz",
    "ryan.bakker2002@gmail.com",
    "senneik@gmail.com",
    "guest",
  ]);

  useEffect(() => {
    if (checkLoggedStatus() == true) {
      setLoggedInStatus(true);
      props.onUpdateLoggedInState(true);
    }
  }, []);

  const showLoginForm = () => {
    setShowLogin(!showLogin);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let userEmail = emailInputRef.current.value;

    if (allowedEmailsArray.includes(userEmail)) {
      console.log("------> ", "allowed");
      Cookies.set("logged_in", userEmail, { expires: 1 });
      setLoggedInStatus(true);
      props.onUpdateLoggedInState(true);
      broadcastStatus(true, userEmail);
    }
  };

  const onLogout = (event) => {
    event.preventDefault();
    Cookies.remove("logged_in");
    setLoggedInStatus(false);
    props.onUpdateLoggedInState(false);
    broadcastStatus(false);
    // navigate('/logged-out');
  };

  const broadcastStatus = (bool, email) => {
    const customEvent = new CustomEvent("onLoginUpdate", {
      detail: { loggedin: bool, email: email },
    });
    document.dispatchEvent(customEvent);
  };

  return (
    <div className="login-wrapper">
      <p onClick={showLoginForm}>
        <span>LOGIN</span>{" "}
        <RiLoginBoxLine
          className={isLoggedIn ? "isLoggedIn" : "isNotLoggedIn"}
        />
      </p>

      {showLogin && !isLoggedIn && (
        <form onSubmit={onSubmit}>
          {/* <input type='email' defaultValue='kevin.dowd@gmail.com' placeholder='email' ref={emailInputRef} required /> */}
          <input
            type="email"
            defaultValue={"kevin.dowd@gmail.com"}
            placeholder="email"
            ref={emailInputRef}
            required
          />
          <button>Login</button>
        </form>
      )}
      {showLogin && isLoggedIn && (
        <form onSubmit={onLogout}>
          <button>Logout</button>
        </form>
      )}
    </div>
  );
}

export default Login;
