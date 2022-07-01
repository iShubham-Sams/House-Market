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
import Listingitem from "../components/Listingitem";

const Category = () => {
  const [listing, setListing] = useState(null);
  const [lastFetchListing,setLastFetchListing]=useState(null)
  const [loading, setLoading] = useState(true);
  const params = useParams();

  // fetch listing
 useEffect(() => {
    const fetchListing = async () => {
      try {
        //refrence
        const listingsRef = collection(db, "listings");
        //query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(1)
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
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Unble to fetch data");
      }
    };
    //func call
    fetchListing();
  }, [params.categoryName]);

 //loadmore pagination func
 const fetchLoadMoreListing = async () => {
  try {
    //refrence
    const listingsRef = collection(db, "listings");
    //query
    const q = query(
      listingsRef,
      where("type", "==", params.categoryName),
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
      <Layout>
    <div className="mt-3 display-fluid">
        {params.categoryName === "rent" ? "Places For Rent" : "Places For Sale"}
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
          <p>no data {params.categoryName}</p>
        )}
    </div>
    {lastFetchListing && (
      <button className="btn btn-primaty" onClick={fetchLoadMoreListing}>
      Load More
      </button>
    )}
      </Layout>
  );
};

export default Category;
