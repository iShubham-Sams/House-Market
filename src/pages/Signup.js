import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { async } from "@firebase/util";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, name, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((privstate)=>({
      ...privstate,
      [e.target.id]:e.target.value
    }))
  };

  const onSubmitHndler=async(e)=>{
    e.preventDefault()
    try {
      const auth= getAuth();
      const userCredential= await createUserWithEmailAndPassword(auth,email,password)
      const user= userCredential.user
      updateProfile(auth.currentUser,{displayName:name})
      navigate('/')
      alert('signup success')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="d-flex align-item-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onSubmitHndler}>
          <h4 className="bg-dark p-2 mt-2 text-light text-center">Sign Up</h4>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Name
            </label>
            <input
              type="text"
              value={name}
              onChange={onChange}
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={onChange}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPassword?"text":"password"}
              value={password}
              onChange={onChange}
              className="form-control"
              id="password"
            />
            <span onClick={() => setShowPassword(!showPassword)} style={{cursor:'pointer'}} >
              {showPassword ? <BsFillEyeSlashFill /> :  <BsFillEyeFill />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
          <div className="mt-2">
            <h6>Login with Google</h6>
            <span>Already User</span>
            <Link to="/signin" className='m-4'>Login </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
