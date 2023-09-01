import styled from "styled-components";
import { ReactComponent as AddButton } from "../../assets/images/Add.svg";
import myImage from "../../assets/images/Img1.png";
import { Link } from "react-router-dom";

const ItemContainer = styled.div`
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  /* background: gold; */
  max-width: 22rem;
  width: 100%;
  display: flex;
  justify-content: center;

  .ItemImg {
    border-radius: 10px;
    width: 100%;
    size: fit;
  }

  /* background-color: red; */
`;

const Title = styled.div`
  display: flex;
  padding: 0px 189px 6px 0px;
  align-items: center;
  align-self: stretch;

  color: var(--text-color, #252b42);
  font-family: Pretendard Variable;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem; /* 133.333% */
  letter-spacing: 0.2px;
`;

const ItemBox = styled.div`
  max-width: 20.3125rem;
  height: 1.625rem;
  align-self: stretch;
  width: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: aqua; */

  .Box {
    /* background-color: #b118df; */
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: end;
  }

  .category {
    justify-content: start;
    width: 90%;
    padding-left: 0.9375rem;
    /* background-color: #237979; */

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.2px;
  }
  .count {
    /* background-color: #b0ee35; */
    width: 10%;
    text-align: end;

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.2px;
  }
`;
const ListBox = styled.div`
  gap: 1.25rem;
  display: flex;
  flex-direction: column;
  .ItemList {
    padding-bottom: 1rem;
    /* background: gold; */
  }
`;

const CountBox = styled.div`
  height: 1.625rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  color: var(--text-color, #252b42);
  font-family: Pretendard Variable;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.2px;

  .count {
    /* background-color: #b0ee35; */
    width: 10%;
    text-align: end;

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.2px;
  }
`;
interface ItemProps {
  categories?: string;
  count?: string;
  allCount?: string;
}

const Item: React.FunctionComponent<ItemProps> = (props) => {
  return (
    <>
      <ItemBox>
        <AddButton />
        <div className="Box">
          <div className="category">{props.categories}</div>
          <div className="count">{props.count}</div>
        </div>
      </ItemBox>
    </>
  );
};

const MenuItem: React.FunctionComponent<ItemProps> = (props) => {
  return (
    <>
      <ItemContainer>
        <img className="ItemImg" src={myImage} />
        <ListBox>
          <Title>Accessories</Title>
          <ul>
            <li className="ItemList">
              <Link to="/product/{categories}">
                <Item categories="Books" count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/{categories}">
                <Item categories="Electronics " count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/{categories}">
                <Item categories="Clothes" count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/{categories}">
                <Item categories="Food" count="1" />
              </Link>
            </li>
          </ul>
          <div className="ViewAll">
            <CountBox>
              <div>View all</div>
              <div className="count">{props.allCount}0</div>
            </CountBox>
          </div>
        </ListBox>
      </ItemContainer>
    </>
  );
};

export default MenuItem;
