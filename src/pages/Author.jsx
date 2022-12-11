import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Author = () => {
  const {id} = useParams()
const [element, setElement] = useState([])
const [collection, setCollection] = useState([])
const [followed, setFollowed] = useState(false)
const [loading, setLoading] = useState(true)
 async function fetchAuthor() {
const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
const {nftCollection} = data
setElement(data)
setCollection(nftCollection)
setLoading(false)

  }
  useEffect(() => {
    fetchAuthor()
  }, [])
  function follow() {
setFollowed(true)
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">




  

    <div className="col-md-12">
                <div className="d_profile de-flex">

                  {loading === false ?
                    <>

                    <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={element.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {element.authorName}
                          <span className="profile_username">@{element.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {element.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                    </> :
                    <>
                    <div className="profile_avatar">
                      <div className="author__pp--skeleton"></div>
                      <div className="profile__name">
                        <div className="profile__name--skeleton skeleton"></div>
                        <div className="profile__username--skeleton skeleton"></div>
                        <div className="profile__wallet--skeleton skeleton"></div>
                      </div>
                    </div>
                    </>
                  }

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">


                      
                      {followed === false ?

                        <>

                        <div className="profile_follower">{element.followers} followers</div>

                      <Link to="#" onClick={follow} className="btn-main">
                        Follow
                      </Link>
                        </> : 
                        <>
                         <div className="profile_follower">{element.followers + 1} followers</div>

                         <Link to="#" onClick={follow} className="btn-main">
                           Unfollow
                         </Link>
                        </>
}
  
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 author__skeleton--wrap">
                {loading === false ?
                  <>

                  <div className="de_tab tab_simple">
                  <AuthorItems element={element} collection={collection} />
                </div>
                  </> : 
                  
                  new Array(8).fill(0).map((element) => (

                  
                                    <div className="de_tab tab_simple ">
                                    <div className="nft__item explore__skeleton--wrap ">

<div className="nft__item_wrap nft__item--skeleton">
  <div className="nft__item_preview nft__img--skeleton">

  </div>
</div>
<div className="nft__item_info explore--skeleton">
<div className="author__name--skeleton skeleton"></div>
                <div className="author__price--skeleton skeleton"></div>
</div>

</div>
                                    </div>
                  ))

                  
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
