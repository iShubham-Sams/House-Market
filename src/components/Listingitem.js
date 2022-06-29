import React from "react";
import { Link } from "react-router-dom";
import { MdBedroomChild } from "react-icons/md";
import {GiBathtub} from 'react-icons/gi'

const Listingitem = ({ listing, id }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="card catagory-link " style={{ width: "800px" }}>
          <Link to={`/category/${listing.type}/${id}`}>
            <div className="row container p-2">
              <div className="col-md-5">
                <img
                  src={listing.imgUrls[0]}
                  className="img-thumbnail"
                  alt={listing.name}
                  height="200px"
                />
              </div>
              <div className="col-md-5">
                <p>{listing.location}</p>
                <h2>{listing.name}</h2>
                <p>
                  Rs :{" "}
                  {listing.offer
                    ? listing.discountedPrice
                    : listing.regularPrice}
                  {listing.type === "rent" && " /  Month"}
                </p>
                <p><MdBedroomChild/> &nbsp;
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Beadrooms`
                    : "1 Beadroom"}
                </p>
                <p><GiBathtub/> &nbsp;
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : "1 Bathroom"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Listingitem;
