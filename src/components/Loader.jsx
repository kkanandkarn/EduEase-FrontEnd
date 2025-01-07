import { Loading } from "notiflix/build/notiflix-loading-aio";
export const showLoader = () => {
  Loading.standard();
};

export const hideLoader = () => {
  Loading.remove();
};

export const showLoaderMessage = (message) => {
  Loading.standard(message, {
    backgroundColor: "rgba(0,0,0,0.8)",
  });
};
