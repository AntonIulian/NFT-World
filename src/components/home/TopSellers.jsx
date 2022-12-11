import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopSellers = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
const [sellers, setSellers] = useState([])
async function fetchSellers() {
  const {data} = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers')
setSellers(data)
setLoading(false)
}
useEffect(() => {
  fetchSellers()
},[])
function redirect(event) {
  navigate(`/author/${event}`)
}
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading === false ?

                <>
              {sellers.map((sellers) => (
                <li data-aos="fade-left"
                data-aos-offset="200"
                data-aos-delay="200">
                  <div data-aos="zoom-out"
    data-aos-offset="200"
    data-aos-delay="500"className="author_list_pp">
                    <a className="cursor" onClick={(e) => redirect(sellers.authorId)} to="/author">
                      <img
                        className="lazy pp-author"
                        src={sellers.authorImage}
                        alt=""
                        />
                      <i className="fa fa-check"></i>
                    </a>
                  </div>
                  <div className="author_list_info">
                    <a className="cursor" onClick={(e) => redirect(sellers.authorId)} to="/author">{sellers.authorName}</a>
                    <span>{sellers.price} ETH</span>
                  </div>
                </li>
              ))}
              </>  :
              new Array(12).fill(0).map((element) => (
                <>
                <div className="col-md-12">
<ol className="author__list--skeleton">

                <li className="skeleton__list">
                <div className="author_list_pp author--skeleton">
                <div className="author__img--skeleton">
               
                </div>
                </div>
                <div className="author_list_info author__info--skeleton">
                <div className="author__name--skeleton skeleton"></div>
                <div className="author__price--skeleton skeleton"></div>
                </div>
                </li>
</ol>
                          </div>
                </>
              ))
              
                
            }
            </ol>
            </div>
            </div>
      </div>
    </section>
  );
};

export default TopSellers;
