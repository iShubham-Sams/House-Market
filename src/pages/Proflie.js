import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { doc,setDoc,serverTimestamp, updateDoc } from "firebase/firestore";

const Proflie = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();
    toast.success("successfully Logout");
    navigate("/");
  };

  //   submit handler
  const onSubmit = async() => {
    try {
        if(auth.currentUser.displayName !== name){
            await updateProfile(auth.currentUser,{
                displayName:name
            })
            const userRef =doc(db,'users',auth.currentUser.uid)
            await updateDoc(userRef,{name})
            toast.success("user Updated")
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error)
    }
  };


const onChange=(e)=>{
    setFormData(privestate=>({
        ...privestate,
        [e.target.id]:e.target.value
    }))
}

  return (
    <Layout>
      <div className="container mt-4 w-50 d-flex justify-content-between">
        <h4>Profile Details</h4>
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div
        className="card container mt-4"
        style={{ width: "18rem" }}
      >
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <p>User Personal Details</p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? (
                <MdDoneAll cloro="green" />
              ) : (
                <FaEdit color="red" />
              )}
            </span>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                value={name}
                onChange={onChange}
                id="name"
                disabled={!changeDetails}
              />

            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={onChange}
                className="form-control"
                id="email"
                disabled={!changeDetails}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Proflie;
