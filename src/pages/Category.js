import React,{useEffect, useState}from 'react'
import Layout from '../components/layout/Layout'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { collection,getDocs,query,where,orderBy,limil,startAfter, limit } from 'firebase/firestore'


const Category = () => {
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
    const params =useParams()

// fetch listing

    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                // refrence
                const listingsRef=collection(db,'listings')
                // query
                const q =query(listingsRef,
                    where('type','==',params.categoryName),
                    orderBy('timestamp','desc'),
                    limit(10)
                )
                // execute query
                const querySnap =await getDocs(q)
                const listings =[]
                querySnap.forEach(doc=>{
                    console.log(doc.data());
                })
            } catch (error) {
                console.log(error);
                toast.error('unable to fetch data')
            }
        } ;
        // func call
        fetchListing();
    },[])

  return (
    <Layout>

    <div>Category</div>
    </Layout>
  )
}

export default Category