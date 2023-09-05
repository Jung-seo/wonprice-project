import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as EmptyImage } from "../../assets/images/empty.svg";
import Loading from "../../components/common/Loading";
import { COLOR } from "../../contstants/color";
import { API_PATHS } from "../../contstants/path";
import useSSE from "../../hooks/useSSE";
import ErrorIndication from "../../pages/ErrorIndication";
import Button from "../common/Button";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";

export type ProductData = {
  auction: boolean;
  productId: number;
  memberId: number;
  title: string;
  description: string;
  currentAuctionPrice?: number;
  immediatelyBuyPrice: number;
  productStatus: string;
  views: number;
  action: boolean;
  createAt: string;
  modifiedAt?: string;
  deletedAt?: string;
  closedAt?: string;
};

const StyledList = styled.section`
  padding: 40px 0 4rem;

  .list_top {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li {
      width: calc(25% - 0.75rem);
      border: 1px solid ${COLOR.border};
      border-radius: 6px;
      overflow: hidden;
    }
  }

  .empty_message {
    margin: 1rem 0 0;
  }
`;

const List = (): JSX.Element => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery<ProductData[]>("productData", async () => {
    const response = await axios.get(API_PATHS.products(""), {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response.data;
  });
  const queryClient = useQueryClient();

  //Server-Sent-Event 적용
  useSSE<ProductData>({
    url: "/subscribe/products/1",
    callback: (newData) => {
      queryClient.setQueryData("productData", newData);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error as Error) {
    return <ErrorIndication error={error} />;
  }

  return (
    <>
      <StyledList>
        <div className="list_top">
          <h1>페이지 제목</h1>
          <div className="list_top_right">
            <SearchBar></SearchBar>
            <Button
              onClick={() => {
                navigate("/create-post");
              }}
              $design="black"
              type="button"
              text="상품 등록하기"
            ></Button>
          </div>
        </div>

        <ul className="list">
          {data ? (
            <>
              {data.map((el) => {
                return <ListItem key={el.productId} data={el} />;
              })}
            </>
          ) : (
            <>
              <EmptyImage />
              <p className="empty_message">목록이 없습니다.</p>
            </>
          )}
        </ul>
      </StyledList>
    </>
  );
};
export default List;