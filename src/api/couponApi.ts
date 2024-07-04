import axios from "axios";

export const checkCoupon = async (coupon: string) => {
  const checkCouponUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/coupon/check/${coupon}`;

  const options = {
    method: "GET",
    url: checkCouponUrl,
  };
  const getCheckCouponResponse = await axios.request(options);

  return getCheckCouponResponse;
};
