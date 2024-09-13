import axios from "axios";
import { BASE_URL } from "../../constants";

export async function deleteNotes(NoteId) {
  return axios
    .delete(`${BASE_URL}/api/v1/notes/${NoteId}`, {
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
