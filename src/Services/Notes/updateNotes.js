import axios from "axios";
import { BASE_URL } from "../../constants";

export function updateNotes(noteId, data) {
  return axios
    .put(`${BASE_URL}/api/v1/notes/${noteId}`, data, {
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
