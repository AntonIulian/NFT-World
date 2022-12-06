import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HotCollections = () => {

  const [loading, isLoading] = useState(true)
  const [nft, setNft] = useState([])
 async function fetchNft() {
 const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
 setNft(data)
isLoading(false)
  }
useEffect(() => {
  fetchNft()
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
        dots: true
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};



  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
{loading === false ?
<>
          <Slider {...settings}>
          { 
            nft.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={nft.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={nft.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{nft.title}</h4>
                  </Link>
                  <span>ERC-{nft.code}</span>
                </div>
              </div>
            </div> 
          ))}
          </Slider>
          </> 
          : 
          new Array(4).fill(0).map(element => (

          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
            <div className="nft_coll nft_skeleton">
              <div className="nft_wrap">
                <div className="nft__img--skeleton"></div>
              </div>
              <div className="nft_coll-pp">

              <div className="nft__pp--skeleton skeleton pp-coll">

              </div>
              <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
<div className="nft__title--skeleton skeleton"></div>
<div className="nft__code--skeleton skeleton"></div>
              </div>


              </div>
            </div>
          ))
                }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
