import { React, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "../../../styles/Username.module.css";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import Navbar from "../../navbar/Navbar";
import { useForm } from "react-hook-form";
import { checkUserAsync, selectError, selectUserLoggedIn } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/userSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUserLoggedIn);
  const error = useSelector(selectError);
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
    <div>
      {user && <Navigate to="/" replace={true}></Navigate>}

      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center ">
              <h3 className="text-5xl font-bold">Hello again!</h3>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                We Welcome you to our website!
              </span>
            </div>

            <form
              noValidate
              className="py-1 overflow-x-visible "
              onSubmit={handleSubmit((data) =>
                dispatch(
                  checkUserAsync({
                    email: data.email,
                    password: data.password,
                  })
                )
              )}
            >
              <div className="textbox flex flex-col items-center py-4 gap-6">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  placeholder="Email"
                  className={styles.textbox}
                />
                {errors.email && (
                  <p
                    onClick={() => {
                      toast.success("Successfully LoggedIn!");
                    }}
                    className="text-red-500"
                  >
                    {errors.email.message}
                  </p>
                )}

                <input
                  type="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters \n - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n - Can contain special characters`,
                    },
                  })}
                  placeholder="Password"
                  className={styles.textbox}
                  onClick={() => {
                    toast.error(
                      `- at least 8 characters \n - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n - Can contain special characters`
                    );
                  }}
                  /*  onChange={(e) => setPassword(e.target.value)} */
                />

                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <div>
                  {error && (
                    <p className="text-red-500">{error || error.message}</p>
                  )}
                </div>

                <button
                  className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-500"
                  type="submit"
                  onClick={() => {
                    toast.success("Successfully LoggedIn!");
                  }}
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
                  <Link className="text-red-500" to="/forgot-password">
                    Recover Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
