import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";

const NewItems = () => {
  const navigate = useNavigate()
const [items, setItems] = useState([])
const [loading, isLoading] = useState(true)

async function fetchItems() {
 const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
 setItems(data)
 isLoading(false)
}
function redirect(event) {
  navigate(`/author/${event}`)
}
function reroute(search) {
  navigate(`/item-details/${search}`)
}

useEffect(() => {
  fetchItems()
}, [])


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading === false ?

            <>
          <Slider {...settings}>

          {items.map((items) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
              <div data-aos="zoom-in"
    data-aos-offset="200"
    data-aos-delay="200" className="nft__item">
                <div className="author_list_pp">
                  <a
                    to="/author"
                    className="cursor"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                    onClick={(e) => redirect(items.authorId)}
                    >
                    <img className="lazy" src={items.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </a>
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

                  <a className="cursor" onClick={(e) => reroute(items.nftId)} to="/item-details">
                    <img
                      src={items.nftImage}
                      className="lazy nft__item_preview nft2"
                      alt=""
                      />
                  </a>
                </div>
                <div className="nft__item_info">
                  <a className="cursor" onClick={(e) => reroute(items.nftId)} to="/item-details">
                    <h4>{items.title}</h4>
                  </a>
                  <div className="nft__item_price">{items.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </div>
                </div>
              </div>
            </div> 
          ))}
          </Slider>
          </> : 
            new Array(4).fill(0).map((element) => (
              <>

                      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
                        <div className="nft__item nft_skeleton">

                          <div className="nft__item_wrap nft_skeleton">
                          <div className="nft__img--skeleton"></div>

                            <div className="nft__item_info">
                            <div className="nft__title--skeleton skeleton"></div>
                    <div className="nft__code--skeleton skeleton"></div>
                            </div>

                          </div>
                        </div>


                      </div>
          </>
            ))
        }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
