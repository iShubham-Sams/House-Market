import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limil,
  startAfter,
  limit,
} from "firebase/firestore";
import Spinner from "../components/layout/Spinner";
import Listingitem from "../Listingitem";
import '../Style/offers.css'

const Offers = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing,setLastFetchListing]=useState(null)
  const params = useParams();

  // fetch listing

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // refrence
        const listingsRef = collection(db, "listings");
        // query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        // execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("unable to fetch data");
      }
    };
    // func call
    fetchListing();
  }, [params]);

  //loadmore pagination func
 const fetchLoadMoreListing = async () => {
  try {
    //refrence
    const listingsRef = collection(db, "listings");
    //query
    const q = query(
      listingsRef,
      where("offer", "==", true),
      orderBy("timestamp", "desc"),
      startAfter(lastFetchListing),
      limit(10)
    );
    //execute query
    const querySnap = await getDocs(q);
    const lastVisible = querySnap.docs[querySnap.docs.length - 1];
    setLastFetchListing(lastVisible);
    const listings = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setListing((prevState) => [...prevState, ...listings]);
    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("Unble to fetch data");
  }
};



  return (
    <Layout title="best offer on house">
    <div className="offers pt-3 container-fluid">
      <h1>
          {" "}
          <img
            src="/assets/offer.png"
            alt="offers"
            className="offer-img"
          />{" "}
        Best Offers</h1>
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <>
            <div>
                {listing.map((list)=>{
                    return <div key={list.id}>
                    <Listingitem listing={list.data} id={list.id} key={list.id}/>
                    </div>
                })}
            </div>
          </>
        ) : (
         <p>There Are No Current Offer</p>
        )}
<div className="d-flex align-item-center justify-content-center pb-4 mt-4">
        {lastFetchListing && (
      <button className="load-btn" onClick={fetchLoadMoreListing}>
      Load More
      </button>
    )}

</div>

    </div>
      </Layout>
  );
};

export default Offers