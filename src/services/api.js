import axios from "axios";

export const fetchQuestions = () => {
  return axios.get("https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions");
};
