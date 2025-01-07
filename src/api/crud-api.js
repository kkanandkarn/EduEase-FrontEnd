const filterObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      // Remove null, undefined, or empty strings after trimming
      return (
        value !== null &&
        value !== undefined &&
        value !== "null" &&
        (typeof value !== "string" || value.trim() !== "")
      );
    })
  );
};

export const CRUDAPI = async (
  endpoint,
  method = "GET",
  data,
  navigate,
  requestType = "json"
) => {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_API_VERSION;
  const url = `${BACKEND_URL}${endpoint}`;
  const token = localStorage.getItem("Authorization");

  let payload = data;

  if (data && requestType === "json") {
    payload = filterObject(data);
  }

  const requestOptions = {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (payload) {
    if (requestType === "json") {
      requestOptions.body = JSON.stringify(payload);
      requestOptions.headers["Content-Type"] = "application/json";
    } else {
      requestOptions.body = payload;
    }
  }

  const response = await fetch(url, requestOptions);

  const errorStatus = [401, 423];

  if (errorStatus.includes(response.statusCode)) {
    localStorage.clear();
    navigate("/");
    return;
  }

  return response.json();
};
