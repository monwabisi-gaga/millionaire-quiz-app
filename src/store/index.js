import { createStore } from "vuex";
import quiz from "./modules/quiz";

export default createStore({
  modules: {
    quiz,
  },
});
