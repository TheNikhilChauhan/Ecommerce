import { React, useState } from "react";

import styles from "../../../styles/Username.module.css";
import { Link, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  checkUserAsync,
  selectError,
  selectMailSent,
  selectUserLoggedIn,
} from "../authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const mailSent = useSelector(selectMailSent);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen ">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center ">
              <h3 className="text-5xl font-bold">Forgot Password!</h3>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Enter your email to reset the password
              </span>
            </div>

            <form
              noValidate
              className="py-1 overflow-x-visible "
              onSubmit={handleSubmit((data) => {
                console.log(data);
                /*  dispatch(resetPasswordRequest(data.email)); */
              })}
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
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                {mailSent && <p className="text-green-500">Mail Sent</p>}

                <button
                  className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-500"
                  type="submit"
                >
                  Send Email
                </button>
              </div>
              <div className="text-center py-4 flex flex-col gap-3">
                <span>
                  Go back to -
                  <Link className="text-red-500" to="/login">
                    Login
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
