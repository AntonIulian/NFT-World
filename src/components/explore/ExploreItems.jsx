import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ExploreItems = () => {
  const navigate = useNavigate()
const [items, setItems] = useState([])
const [number, setNumber] = useState(8)
const [loading, setLoading] = useState(true)
async function fetchItems() {
  const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
setItems(data)
setLoading(false)
}
async function filterItems(value) {
  setLoading(true)
  const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
  setItems(data)
  setLoading(false)
}
useEffect(() => {
  filterItems()
},[])
useEffect(() => {
  fetchItems()
}, [])
function loadMore(e) {
  e.preventDefault()
  setNumber(value => (value+ 4))
}
function redirect(search) {
navigate(`/author/${search}`)
}
function reroute(search) {
  navigate(`/item-details/${search}`)
}

console.log(number);
  return (
    <>
      <div>
        <select id="filter-items" onChange={(e) => filterItems(e.target.value)} defaultValue="">
          <option value="" >Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
{loading === false ?

        <>
      {items.map((items) => (
        <div
        
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
        >
          <div  data-aos="fade-in"
    data-aos-offset="200"
    data-aos-delay="50" className="nft__item">
            <div className="author_list_pp">
            
             
                <img data-bs-toggle="tooltip"
                    data-bs-placement="top" className="lazy profilepic" onClick={(e) => redirect(items.authorId)} src={items.authorImage} alt="" />
              
                <i className="fa fa-check"></i>
            </div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a onClick={(e) => reroute(items.nftId)} href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a onClick={(e) => reroute(items.nftId)} href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <a onClick={(e) => reroute(items.nftId)} to="/item-details">
                <img src={items.nftImage} className="lazy nft__item_preview" alt="" />
              </a>
            </div>
            <div className="nft__item_info">
              <a onClick={(e) => reroute(items.nftId)} to="/item-details">
                <h4 className="explore__title">{items.title}</h4>
              </a>
              <div className="nft__item_price">{items.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{items.likes}</span>
              </div>
            </div>
          </div>
        </div>
      )).slice(0,`${number}`)}
      </>  : 
      new Array(8).fill(0).map((element) => (
        <>
        
        <div className="nft__item explore__skeleton--wrap">

          <div className="nft__item_wrap nft__item--skeleton">
            <div className="nft__item_preview nft__img--skeleton">

            </div>
          </div>
          <div className="nft__item_info explore--skeleton">
          <div className="author__name--skeleton skeleton"></div>
                <div className="author__price--skeleton skeleton"></div>
          </div>
          
          </div>
        </>
      
      ))
    }
      
    
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" onClick={loadMore} className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
