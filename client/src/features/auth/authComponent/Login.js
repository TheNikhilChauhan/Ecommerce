import { React, useState } from "react";

import styles from "../../../styles/Username.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../../navbar/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //function to handle submit
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }; */

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen ">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center ">
            <h3 className="text-5xl font-bold">Hello again!</h3>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              We Welcome you to our website!
            </span>
          </div>

          <form className="py-1">
            {/* onSubmit={handleSubmit} */}
            <div className="textbox flex flex-col items-center py-4 gap-6">
              <input
                type="email"
                placeholder="Email"
                className={styles.textbox}
                value={email}
                /* onChange={(e) => setEmail(e.target.value)} */
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.textbox}
                value={password}
                /*  onChange={(e) => setPassword(e.target.value)} */
              />
              <button
                className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-500"
                type="submit"
              >
                Let's Go
              </button>
            </div>
            <div className="text-center py-4 flex flex-col gap-3">
              <span>
                Not a Member?
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
              <span>
                Forgot Password?
                {/* <Link className="text-red-500" to="/reset">
                  Recover Now
                </Link> */}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
