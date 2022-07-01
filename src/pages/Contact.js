import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Unable to Ftech Data");
      }
    };
    getLandlord();
  }, [params.landlordId]);
  return (
    <Layout>
      <div className=" container  mt-4">
        <h3>Contact Details</h3>
        <div>
          {landlord !== " " && (
            <main>
              <h3>{landlord?.name}</h3>
              <form >
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="message"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  style={{height: "100px"}}
                ></textarea>
                <label htmlFor="floatingTextarea2"> Your message</label>
              </div>
              <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                <button className="btn btn-primary m-2">
                    Send Message
                </button>
              </a>
              </form>
            </main>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
