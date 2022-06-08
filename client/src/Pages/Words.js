import React, { useState } from "react";
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router";

import Nav from "../Component/Nav"
import Searchbar from "../Component/Searchbar";
import "./Words.css"

function Words ({ searchHandler }) {
  const location = useLocation()
  const [clicked, setClicked] = useState(location.state.data)

  console.log(clicked)

  const [searchWord, setSearchWord] = useState({
      searchword: ""
  })

  return (
    <div>
      <Nav />
      <div>
        <div>
        <Searchbar searchHandler={searchHandler} />
        </div>
        <div className="words_information">
          <div className="words_clickedwords">
            {clicked.words}
            <div> 김준환님의 단어</div>
          </div>
          <div className="words_clickedtitle">
            <div>요약:</div>
            {clicked.summary}
          </div>
          <div className="words_clickedcontent">
            <div>내용:</div>
            {clicked.content}
            </div>
        </div>
          <img className="words_clickedimage" style={{ width: "300px", height: "300px" }} src="https://t1.daumcdn.net/cfile/tistory/251A563C5854122C07" />
      </div>
    </div>
  )
}

export default Words;

// const navigate = useNavigate()
// const wordClickHandler0 = () => {
//   searchHandler(searchWord);
//   navigate('/Search')
// }

// const handleInputValue = (key) => (e) => {
//   setSearchWord({ ...searchWord, [key]: e.target.value });
// };

// const onKeyPress = (e) => {
//   if (e.key === "Enter") {
//     wordClickHandler0(searchWord)
//     navigate("/Search");
//   }
// };

// <div className="words_searchbar">
//           <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchword")} onKeyPress={onKeyPress} />
//           <Link to="/Search" state={{data: searchWord}}>
//           <button type="submit" className="searchbutton" >
//             <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
//           </button>
//           </Link>
//         </div>