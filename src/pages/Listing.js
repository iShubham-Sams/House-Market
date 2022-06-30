import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import {getDoc,doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { useNavigate,Link,useParams } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'


const Listing = () => {
  const [listings,setListing]=useState(null)
  const [loading,setLoading]=useState(true)
  const navigate =useNavigate()
  const params=useParams()
  const auth=getAuth()


useEffect(()=>{
  const fetchListing = async ()=>{
   const docRef =doc(db,'listings',params.listingId)
   const docSnap = await getDoc(docRef)
   if(docSnap.exists){
    console.log(docSnap.data())
    setListing(docSnap.data())
    setLoading(false)

  }
}
  fetchListing()
},[params.listingId])

if(loading){
  return <Spinner/>
}

  return (
   <div className="container d-flex align-item-center justify-content-center mt-4">
    <div className="card ml-4" style={{width: "600px"}} >
    <h1 className='text-center'>
    Listing Page
    </h1>
    <h3>
      {listings.name}
    </h3>
    <h6>
      Price : {listings.offer ? listings.discountedPrice :listings.regularPrice} /Rs
    </h6>
    <p>
     Property For : {listings.type === "rent" ?"Rent" :"Sale"}
    </p>
    <p>
      {listings.offer && (
        <span>{listings.regularPrice -listings.discountedPrice} Discount</span>
      )}
    </p>
    <p>
      {listings.bedrooms >1 ?` ${listings.bedrooms} Bedrooms ` :"1 Bedroom"} 
    </p>
  <div className="card-body">
    
  </div>
</div>
   </div>
  )
}

export default Listing