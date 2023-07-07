import { React, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import styles from "../../../styles/Username.module.css";
/* import {Link} from 'react-router-dom'
import axios from 'axios' */
/* import { useNavigate } from 'react-router-dom'; */

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  /* const navigate = useNavigate() */

  /* //form submit function
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer})
            
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            toast.error('Something went wrong')
        }
        
        
    } */

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen ">
          <div
            className={styles.glass}
            style={{ width: "45%", paddingTop: "3em", height: "78%" }}
          >
            <div className="title flex flex-col items-center ">
              <h3 className="text-5xl font-bold">Register</h3>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us.
              </span>
            </div>

            <form className="py-1 overflow-x-visible">
              {/* onSubmit={handleSubmit} */}
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="text"
                  placeholder="Username"
                  className={styles.textbox}
                  value={name}
                  /* onChange={(e) => setName(e.target.value)} */
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  className={styles.textbox}
                  value={email}
                  /* onChange={(e) => setEmail(e.target.value)} */
                  required
                />

                <input
                  type="password"
                  id="passowrd"
                  placeholder="Password"
                  className={styles.textbox}
                  value={password}
                  /* onChange={(e) => setPassword(e.target.value)} */
                  required
                />

                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  className={styles.textbox}
                  value={password}
                  /* onChange={(e) => setPassword(e.target.value)} */
                  required
                />

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
