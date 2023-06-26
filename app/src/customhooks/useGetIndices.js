import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetIndicesFailed,
  GetIndicesStart,
  GetIndicesSuccess,
} from "../redux/StockDetailsSlice";
import { publicRequest } from "../apiRequest";
import { useLocation } from "react-router-dom";

export const useGetIndices = () => {
  const [IndicesData, setIndicesData] = useState([]);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const signal = controller.signal;

    dispatch(GetIndicesStart());

    const getData = async () => {
      try {
        const res = await publicRequest.get("/stocks/allindices", { signal });

        setIndicesData(res.data);

        dispatch(GetIndicesSuccess(res.data));
      } catch (e) {
        console.log(e);
        dispatch(GetIndicesFailed());
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, [pathname]);

  return [IndicesData];
};
