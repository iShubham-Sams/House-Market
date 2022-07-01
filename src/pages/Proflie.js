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
import Listingitem from "../components/Listingitem";

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
          <form onSubmit={(e)=>e.preventDefault}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
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
      <div className="container mt-4 w-50 d-flex justify-content-between">
          <Link to='/create-listing'>
          <BsArrowRightSquareFill color="primery"/> Sell or Rent Your Home
          </Link>
          </div>
          <div className="container">
            {listings && listings?.length>0 &&(
              <>
                <h6>
                  Your Listings
                </h6>
                {listings.map(listing=>(
                  <Listingitem key={listing.id} listing={listing.data} id={listing.id}
                  onDelete={()=>onDelete(listing.id)} />
                ))}
              </>
            )}
          </div>
    </Layout>
  );
};

export default Proflie;
