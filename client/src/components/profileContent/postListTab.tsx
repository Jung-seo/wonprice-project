import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import axios from "axios";
import { getAuthToken } from "../../util/auth";

interface products {
  productId: number;
  title: string;
  createAt: string;
  img: string;
}

interface Review {
  postMemberId: number;
  targetMemberId: number;
  content: string;
  score: number;
  createdAt: string;
  img: string;
}

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  .postlistMenuContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .postlistTabMenu {
      width: calc(100% / 3);
      border: 1px solid ${COLOR.gray_300};
      border-radius: 6px 6px 0 0;
      padding: 0.5rem 0.75rem;
      font-size: ${FONT_SIZE.font_16};
      &:hover {
        background-color: ${COLOR.primary};
      }
      &.select {
        font-weight: bold;
        background-color: ${COLOR.secondary};
      }
    }
  }
  .tabContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .postContainer {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      gap: 0.5rem;
      border-bottom: 1px solid ${COLOR.border};
    }
    .infoContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.5rem 0;
      font-size: ${FONT_SIZE.font_16};
      color: ${COLOR.mediumText};
      .postTitle {
        font-weight: bold;
        font-size: ${FONT_SIZE.font_20};
        color: ${COLOR.darkText};
      }
      .productName {
        font-weight: bold;
        color: ${COLOR.darkText};
      }
      .authorContainer {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        .author {
          font-weight: bold;
          color: ${COLOR.darkText};
        }
      }
    }
  }
`;

const PostListTab = (): JSX.Element => {
  const tabmenu = [
    { value: "cell", text: "판매글 목록" },
    { value: "leaveReview", text: "작성한 거래 후기" },
    { value: "getReview", text: "받은 거래 후기" },
  ];
  const [cellPost, setCellPost] = useState<products[]>([]);
  const [leaveReview, setLeaveReview] = useState<Review[]>([]);
  const [recievedReview, setRecievedReview] = useState<Review[]>([]);
  const [menu, setMenu] = useState("cell");
  const accessToken = getAuthToken();
  const Id = localStorage.getItem("Id");
  // 추후 Id는 주소에 있는 id로 가져오게 변경해야함
  const getPostlist = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/members/${Id}/products`, {
        headers: {
          Authorization: accessToken,
        },
      });
      setCellPost(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error);
        }
      }
    }
  };
  const getLeaveReview = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/members/${Id}/reviews/post`, {
        headers: {
          Authorization: accessToken,
        },
      });
      setLeaveReview(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          console.log(error);
        }
      }
    }
  };
  const getRecievedReview = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/members/${Id}/reviews`, {
        headers: {
          Authorization: accessToken,
        },
      });
      setRecievedReview(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    getPostlist();
    getLeaveReview();
    getRecievedReview();
  }, []);
  return (
    <PostListContainer>
      <ul className="postlistMenuContainer">
        {tabmenu.map((el) => (
          <li
            key={el.value}
            className={menu === el.value ? "select postlistTabMenu" : "postlistTabMenu"}
            onClick={() => setMenu(el.value)}
          >
            {el.text}
          </li>
        ))}
      </ul>
      <div className="tabContent">
        {menu === "cell" &&
          cellPost.map((el) => (
            <div className="postContainer" key={el.productId}>
              <img src={el.img}></img>
              <div className="infoContainer">
                <div className="postTitle">{el.title}</div>
                <div className="createdAt">{el.createAt}</div>
              </div>
            </div>
          ))}
        {menu === "leaveReview" &&
          leaveReview.map((el, idx) => (
            <div key={idx} className="postContainer">
              <img src={el.img}></img>
              <div className="infoContainer">
                <div className="postTitle">글제목</div>
                <div className="productName">제품이름</div>
                <div className="authorContainer">
                  <span className="author">{`작성자 id ${el.postMemberId}`}</span>
                  <span className="createdAt">{el.createdAt}</span>
                </div>
                <p className="postContent">{el.content}</p>
              </div>
            </div>
          ))}
        {menu === "getReview" &&
          recievedReview.map((el, idx) => (
            <div key={idx} className="postContainer">
              <img src={el.img}></img>
              <div className="infoContainer">
                <div className="postTitle">글제목</div>
                <div className="productName">제품이름</div>
                <div className="authorContainer">
                  <span className="author">{`작성자 id${el.postMemberId}`}</span>
                  <span className="createdAt">{el.createdAt}</span>
                </div>
                <p className="postContent">{el.content}</p>
              </div>
            </div>
          ))}
      </div>
    </PostListContainer>
  );
};

export default PostListTab;
