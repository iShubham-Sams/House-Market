import React, { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import {BsArrowRightSquareFill} from 'react-icons/bs'
import { doc,updateDoc,collection,getDoc,query,where,orderBy,deleteDoc, getDocs } from "firebase/firestore";
import Listingitem from "../Listingitem";
import '../Style/profile.css'

const Proflie = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true)
  const [listings,setListings]=useState(null)


  // useEffect for geting data
  useEffect(()=>{
    const fetchUserListings= async ()=>{
      const listingRef = collection(db,'listings')
      const q =query(listingRef,where('useRef','==',auth.currentUser.uid),orderBy('timestamp','desc'))
      const querySnap =await getDocs(q)
      let listings =[]
      querySnap.forEach(doc=>{
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
      console.log(listings);
    }
    fetchUserListings()
  },[auth.currentUser.uid])
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

// delete handler
const onDelete = async (listingid)=>{
  if (window.confirm('Are You Sure To Delete This Post')){
    await deleteDoc(doc(db,'listings',listingid))
    const updatedListings =listings.filter(listing=>listing.id!==listingid)
    setListings(updatedListings)
    toast.success("Listing delete Success Fully")
  }
}

// eddit handler
const onEdit=(listingId)=>{
  navigate(`/editlisting/${listingId}`)
}
  return (
    <Layout>
    <div className="row profile-container">
      <div className="col-md-6 profile-container-col1">
        <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouQb7JrSnb8YkhVfMd97Jn-0RyI_yy5RtuwjRlLNjZEbOJ03UpU0PktjUfuVapwwbwJ8&usqp=CAU`} alt="profile" />
      </div>
      <div className="col-md-6 profile-container-col2">
        <div className="container mt-4  d-flex justify-content-between">
          <h2>Profile Details</h2>
          <button className="btn btn-danger" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div className="   mt-4 card">
          <div className="card-header">
            <div className="d-flex justify-content-between ">
              <p>Your Personal Details </p>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? (
                  <MdDoneAll color="green" />
                ) : (
                  <FaEdit color="red" />
                )}
              </span>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={onChange}
                  disabled={!changeDetails}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  disabled={!changeDetails}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-3 create-listing">
          <Link to="/create-listing">
            <BsArrowRightSquareFill color="primary" /> &nbsp; Sell or Rent Your
            Home
          </Link>
        </div>
      </div>
    </div>

    <div className="container-fluid mt-4 your-listings">
      {listings && listings?.length > 0 && (
        <>
          <h3 className="mt-4">Your Listings</h3>
          <div>
            {listings.map((listing) => (
              <Listingitem
                className="profile-listing"
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </Layout>
);
};

export default Proflie;
