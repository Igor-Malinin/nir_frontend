import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  methods: {
    ...mapMutations({
      setServiceChosen: "createMis/setServiceChosen"
    }),
  },
  computed: {
  ...mapState({
      services: state => state.createMis.services,
      ifActions: state => state.createMis.ifActions,
      ifFilters: state => state.createMis.ifFilters
    }),
  ...mapGetters({
      getServices: "createMis/getServices",
      getChosenServices: "createMis/getChosenServices",
      getAuthorizedServices: "createMis/getAuthorizedServices",
      getIfActions: "createMis/getIfActions",
      getThenActions: "createMis/getThenActions",
      getIfFilters: "createMis/getIfFilters",
      getThenFilters: "createMis/getThenFilters",
      getLoggedIn: "loggedInMod/getLoggedIn",
    })
  }
}