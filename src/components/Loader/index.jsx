import { Loading } from "notiflix/build/notiflix-loading-aio";
export const showLoader = () => {
  Loading.standard();
};

export const hideLoader = () => {
  Loading.remove();
};
