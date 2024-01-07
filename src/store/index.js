import { createStore } from 'vuex'
import {LoggedInModule} from "@/store/LoggedInModule";
import {CreateMisModule} from "@/store/CreateMisModule";
import {SessionsModule} from "@/store/SessionsModule"

export default createStore({
  modules: {
    loggedInMod: LoggedInModule,
    createMis: CreateMisModule,
    sessions: SessionsModule
  }
})
