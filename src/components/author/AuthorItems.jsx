import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useNavigate } from "react-router-dom";

const AuthorItems = ({collection, element}) => {
  console.log(collection);
const navigate = useNavigate()
  function redirect(search) {
    navigate(`/item-details/${search}`)
  }
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
{collection.map((item) => (

  
  
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={element.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <a className="cursor" onClick={(e) => redirect(item.nftId)} to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                      />
                  </a>
                </div>
                <div className="nft__item_info">
                  <a className="cursor" onClick={(e) => redirect(item.nftId)} to="/item-details">
                    <h4>{item.title}</h4>
                  </a>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
))
}

        </div>
        </div>
        </div>
  );
};

export default AuthorItems;
