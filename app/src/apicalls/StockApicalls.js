import { publicRequest } from "../apiRequest";
import {
  GetFiftyTwoweekDataFailed,
  GetFiftyTwoweekDataStart,
  GetFiftyTwoweekDataSuccess,
} from "../redux/StockDetailsSlice";

export const FiftyWeekData = async (dispatch, type, signal) => {
  dispatch(GetFiftyTwoweekDataStart());

  try {
    if (type === "high") {
      const res = await publicRequest.get(
        `stocks/fifty-two-week?filter=52-week-high`,
        { signal }
      );

      dispatch(GetFiftyTwoweekDataSuccess({ type, data: res.data }));
    } else {
      const res = await publicRequest.get(
        `stocks/fifty-two-week?filter=52-week-low`,
        { signal }
      );

      dispatch(GetFiftyTwoweekDataSuccess({ type, data: res.data }));
    }
  } catch (e) {
    console.log(e);
    dispatch(GetFiftyTwoweekDataFailed());
  }
};
