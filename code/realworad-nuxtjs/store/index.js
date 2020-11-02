const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    // 当前登录用户得用户信息
    user: null,
  }
}
const getters = {};
export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
}
export const actions = {
  // 初始化容器以及需要传递到客户端得数据
  // 这个特殊得action 只会在服务端渲染期间运行
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (err) {
        // No valid cookie found
      }
    }
    console.log('user',user)
    commit("setUser", user)
  }
}
