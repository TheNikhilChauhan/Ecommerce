import { React, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "../../../styles/Username.module.css";
import { useForm } from "react-hook-form";
import { selectUserLoggedIn, createUserAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
/* import {Link} from 'react-router-dom'
import axios from 'axios' */
/* import { useNavigate } from 'react-router-dom'; */

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUserLoggedIn);

  return (
    <div>
      {user?.email && <Navigate to="/login"></Navigate>}
      <div className="container mx-auto overflow-y-scroll">
        <div className="flex justify-center items-center h-screen ">
          <div
            className={styles.glass}
            style={{ width: "45%", paddingTop: "3em", height: "74%" }}
          >
            <div className="title flex flex-col items-center ">
              <h3 className="text-5xl font-bold">Register</h3>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us.
              </span>
            </div>

            <form
              noValidate
              className="py-1 overflow-x-visible "
              onSubmit={handleSubmit((data) =>
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
                  })
                )
              )}
            >
              <div className="textbox flex flex-col items-center gap-6 rounded-xl">
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

                  /* onChange={(e) => setEmail(e.target.value)} */
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <input
                  type="password"
                  id="passowrd"
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

                  /* onChange={(e) => setPassword(e.target.value)} */
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}

                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirm-password", {
                    required: "Confirm Password is required!!",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matching",
                  })}
                  placeholder="Confirm Password"
                  className={styles.textbox}

                  /* onChange={(e) => setPassword(e.target.value)} */
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}

                <button
                  className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-500"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already Registered?
                  <Link className="text-red-500" to="/login">
                    Login Now
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
