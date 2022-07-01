import React from "react";
import { Link } from "react-router-dom";
import { MdBedroomChild } from "react-icons/md";
import {GiBathtub} from 'react-icons/gi'

const Listingitem = ({ listing, id,onDelete,onEdit }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="card catagory-link mb-2 " style={{ width: "800px" }}>
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
            {onDelete && (<button className="btn btn-danger" onClick={()=>onDelete(listing.id)}>
                    Delete item
                    </button>) }

                    {onEdit && (<button className="btn btn-info mt-4" onClick={()=>onEdit(listing.id)}>
                    Edit item
                    </button>) }
        </div>
      </div>
    </>
  );
};

export default Listingitem;
