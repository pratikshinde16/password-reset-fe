import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const url = "http://localhost:8080/api/users";
      const url = "https://password-reset-gtx1.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErr(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
         
          <h1>User Login</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            className={styles.form_container}
            onSubmit={handleSubmit}
            id="myForm"
          >
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Name"
              name="displayName"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            ></input>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              autoComplete="on"
              required
              className={styles.input}
            ></input>
            {err && <div className={styles.error_msg}>{err}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
