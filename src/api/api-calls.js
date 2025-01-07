import { CRUDAPI } from "./crud-api";
import { DROPDOWN, DROPDOWN_METHOD } from "./endpoints";

export const getStates = async (navigate) => {
  const payload = {
    dropdownCode: "STATE_LIST",
    replacements: [],
  };
  const response = await CRUDAPI(DROPDOWN, DROPDOWN_METHOD, payload, navigate);
  const districts = response.map((res) => ({
    value: res.id,
    label: res.district,
  }));
  return districts;
};
export const getDistricts = async (navigate, stateId) => {
  const payload = {
    dropdownCode: "DISTRICT_LIST",
    replacements: [stateId],
  };
  const response = await CRUDAPI(DROPDOWN, DROPDOWN_METHOD, payload, navigate);
  const districts = response.map((res) => ({
    value: res.id,
    label: res.state,
  }));
  return districts;
};
