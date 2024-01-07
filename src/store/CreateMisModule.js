export const CreateMisModule = {
  state: () => ({
    services: [
      {id: "0", title: "vk", name: "ВКонтакте", image: `vk-icon.png`, chosen: true, auth: false},
      {id: "1", title: "gmail", name: "Gmail", image: 'gmail-icon.png', chosen: true, auth: false},
      {id: "2", title: "gdocs", name: "Google документы", image: 'google-docs-icon.png', chosen: false, auth: false},
      {id: "3", title: "gsheets", name: "Google таблицы", image: 'google-sheets-icon.svg', chosen: false, auth: false},
      {id: "4", title: "gcalendar", name: "Google календарь", image: 'google-calendar-icon.png', chosen: false, auth: false},
      {id: "5", title: "telegram", name: "Телеграм", image: 'tg-icon.svg', chosen: false, auth: false},
      {id: "6", title: "mailru", name: "Mail.ru", image: 'mailru-icon.png', chosen: false, auth: false},
      {id: "7", title: "youtube", name: "YouTube", image: 'youtube-icon.png', chosen: false, auth: false},
    ],
    ifActions: {
      vk: [
        {id: "0", title: "ifActionPost", name: "был выставлен пост"},
        {id: "1", title: "ifActionPhoto", name: "была добавлена фотография"},
        {id: "2", title: "ifActionVideo", name: "было добавлено видео"},
      ],
      gmail: [
        {id: "0", title: "ifActionMessage", name: "пришло сообщение на почту"},
      ]
    },
    ifFilters: {
      vk: [
        {id: "0", title: "ifFilterText", name: "в тексте поста присутствует", value: ""},
      ],
      gmail: [
        {id: "0", title: "ifFilterMessageFrom", name: "сообщение от", value: ""},
      ]
    },
    thenActions: {
      vk: [
        {id: "0", title: "thenActionWallPost", name: "Выставить текст и/или изображение на стене"},
      ],
      gmail: [
        {id: "0", title: "thenActionPostMessage", name: "Отправит сообщение пользователю"},
        {id: "1", title: "thenActionWordText", name: "Вставить текст в Word"},
        {id: "2", title: "thenActionExcelText", name: "Вставить текст в Excel"},
      ]
    },
    thenFilters: {
      vk: [
        {id: "0", title: "thenFilter", name: "фильтр"},
      ],
      gmail: [
        {id: "0", title: "thenFilter", name: "фильтр"},
      ]
    },
    intervalId: null,
    vkWallPost: {
      userId: "",
      message: "",
      photoPath: "",
      photoName: ""
    },
    lastMessageId: "",
    messageFrom: "",
  }),
  getters: {
    getServices(state) {
      return state.services
    },
    getChosenServices(state) {
      return state.services.filter(service => service.chosen === true)
    },
    getAuthorizedServices(state) {
      return state.services.filter(service => service.auth === true)
    },
    getIfActions(state) {
      return state.ifActions
    },
    getThenActions(state) {
      return state.thenActions
    },
    getIfFilters(state) {
      return state.ifFilters
    },
    getThenFilters(state) {
      return state.thenFilters
    },
    getIntervalId(state) {
      return state.intervalId
    },
    getVkWallPost(state) {
      return state.vkWallPost
    },
    getLastMessageId(state) {
      return state.lastMessageId
    },
    getMessageFrom(state) {
      return state.messageFrom
    }
  },
  mutations: {
    setServiceChosen(state, social) {
      state.services.filter(title => title.title === social)[0].chosen = !state.services.filter(title => title.title === social)[0].chosen
    },
    setServiceAuth(state, social) {
      state.services.filter(title => title.title === social)[0].auth = !state.services.filter(title => title.title === social)[0].auth
    },
    setIntervalId(state, id) {
      state.intervalId = id
    },
    setVkWallPost(state, post) {
      state.vkWallPost = post
    },
    setLastMessageId(state, id) {
      state.lastMessageId = id
    },
    setMessageFrom(state, message) {
      state.messageFrom = message
    }
  },
  namespaced: true
}