const cookieparser = process.server ? require("cookieparser") : undefined

const fakeData = {
  users: [
    {
      id: 1,
      username: "Username",
      email: "test@example.com",
      password: "qwerty",
      avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    },
  ],
}

export const state = () => {
  return {
    auth: null,
  }
}

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
}

export const actions = {
  auth(_, { email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(fakeData.users.find(u => u.email === email && u.password === password)), 1000)
    })
  },
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {}
    }
    commit("setAuth", auth)
  },
}
