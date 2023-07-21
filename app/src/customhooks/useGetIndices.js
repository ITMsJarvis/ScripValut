import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetIndicesFailed,
  GetIndicesStart,
  GetIndicesSuccess,
} from "../redux/StockDetailsSlice";
import { publicRequest } from "../apiRequest";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const useGetIndices = () => {
  const [IndicesData, setIndicesData] = useState([]);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const signal = controller.signal;

    dispatch(GetIndicesStart());

    const getData = async () => {
      console.log(`${import.meta.env.VITE_STOCK_API}`);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_STOCK_API}/allindices`,
          { signal }
        );
        console.log(res.data);

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
