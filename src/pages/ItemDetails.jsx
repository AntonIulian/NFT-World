import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemDetails = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [itemDetails, setItemDetails] = useState([])
  const {id} = useParams()
async function fetchItem() {
const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
setItemDetails(data)
setLoading(false)
}

function redirect(search) {
  navigate(`/author/${search}`)
}

useEffect(() => {
  fetchItem()
}, [])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
{loading === false ?


              <>
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                  />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetails.title} #{itemDetails.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>
                   {itemDetails.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <a className="cursor" onClick={(e) => redirect(itemDetails.ownerId)} to="/author">
                            <img className="lazy" src={itemDetails.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </a>
                        </div>
                        <div className="author_list_info">
                          <a className="cursor" onClick={(e) => redirect(itemDetails.ownerId)} to="/author">{itemDetails.ownerName}</a>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <a className="cursor" onClick={(e) => redirect(itemDetails.creatorId)} to="/author">
                            <img className="lazy" src={itemDetails.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </a>
                        </div>
                        <div className="author_list_info">
                          <a className="cursor" onClick={(e) => redirect(itemDetails.creatorId)} to="/author">{itemDetails.creatorName}</a>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
                  </> :
                  <div className="itemDetails__skeleton--wrapper">
                    <div className="itemDetails__img--wrapper">

                    <div className="itemDetails__skeleton--img"></div>
                    </div>
                    <div className="itemDetails__skeleton--info">
<div className="itemDetails__skeleton--title skeleton"></div>
<div className="itemDetails__skeleton--likes skeleton"></div>
<div className="itemDetails__skeleton--para skeleton"></div>

                    </div>
                  </div>

                }



            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
