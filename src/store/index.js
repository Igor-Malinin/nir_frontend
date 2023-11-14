import { createStore } from 'vuex'
import {LoggedInModule} from "@/store/LoggedInModule";

export default createStore({
  modules: {
    loggedInMod: LoggedInModule
  }
})
