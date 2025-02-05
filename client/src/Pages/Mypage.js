import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Nav from "../Component/Nav";
import Profile from "../Component/Profile";
import CatFilter from "../Component/CatFilter/CatFilter";
import Wordsgrid from "../Component/Wordsgrid";
import { useSelector } from "react-redux";
import "./Mypage.css";
import Locationmap from "../Component/Locationmap";
import Calendarcomponent from "../Component/Calendar";

function Mypage() {
  const userInfo = useSelector((state) => state.userInfo);
  const users_id = userInfo.id;
  const groupFilter = useSelector((state) => state.groupfilter);

  const [searchWord, setSearchWord] = useState("");
  const handleInputValue = (key) => (e) => {
    setSearchWord({ ...searchWord, [key]: e.target.value });
  };

  const [allWorddata, setAllworddata] = useState([]);
  const [worddata, setWorddata] = useState([]);
  const [type, setType] = useState("All");

  const filterHandler = (type) => {
    type === "All" ? setWorddata(allWorddata) : setWorddata(allWorddata.filter((el) => el.type === type));
  };

  async function fetchData() {
    if (groupFilter === 0) {
      //그룹이없는 경우
      axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`).then((res) => {
        setAllworddata(res.data);
      });
    } else {
      axios.get(`${process.env.REACT_APP_URL}/words/group/${groupFilter}`).then((res) => {
        setAllworddata(res.data.groupWords);
      });
    }
  }
  const deleteWord = (id) => {
    setAllworddata(allWorddata.filter((el) => el.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, [users_id, groupFilter]);

  useEffect(() => {
    filterHandler(type);
  }, [allWorddata, type]);

  return (
    <div id="MyPage">
      <div className="My_Nav">
        <Nav />
      </div>
      <div className="Mypage_width">
        <div className="My_Profile">
          <Profile />
        </div>
        <div className="My_Filter">
          <CatFilter setType={setType} />
        </div>
        <div className="My_search_createword">
          <div className="home_searchbar">
            <input className="searchbar" type="text" placeholder="단어를 입력해주세요" onChange={handleInputValue("searchWord")} />
            <button type="submit" className="searchbutton">
              <img className="searchicon" src="https://cdn-icons-png.flaticon.com/512/149/149852.png" />
            </button>
          </div>
          <div className="My_createword">
            <Link to="/CreateWord">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="createword_kor">단어등록</span>
            </Link>
          </div>
        </div>
        <div className="My_WordGrid">
          {type === "place" ? <Locationmap worddata={worddata} /> : <></>}
          {type === "date" ? <Calendarcomponent worddata={worddata} /> : <></>}
          <Wordsgrid searchWord={searchWord} worddata={worddata} deleteWord={deleteWord} />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
