import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

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
  return (
    <Layout>
      <div className="d-flex align-item-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4">
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
          <div>
            <h6>Login with Google</h6>
            <span>Already User</span>
            <Link to="/signin">Login </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
