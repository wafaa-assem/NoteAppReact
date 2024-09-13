import axios from "axios";
import { BASE_URL } from "./../../constants";

export async function getUserNotes() {
  return axios
    .get(`${BASE_URL}/api/v1/notes`, {
      headers: {
        token: `3b8ny__${localStorage.getItem("tkn")}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
}
