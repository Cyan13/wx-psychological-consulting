import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    consultantID: '',
    helperID: '',
    customerTrueName: '',
    consultantTrueName: '',
    helperTrueName: '',
    date: '',
    startTime: '',
    endTime: '',
    historyURL: 'url',

    helperUserName:'',
    helpVisible: true
}

const getters = {
    // getUserName(state) {
    //     return state.username
    // }
}

const mutations = {
    setStartTime(state, value) {
        state.startTime=value
    },
    setEndTime(state, value) {
        state.endTime=value
    },
    setDate(state, value) {
        state.date=value
    },
    setHelperUserName(state, value) {
        state.helperUserName=value
    },
    setConsultantTrueName(state, value) {
        state.consultantTrueName=value
    },
    setHelperTrueName(state, value) {
        state.helperTrueName=value
    },
    setHelperID(state, value) {
        state.helperID=value
    },
    setHelpVisible(state, value) {
        state.helpVisible=value
    }
}
const actions = {
    // getRole({ commit, state }) {
    //   return new Promise(resolve => {
    //     if (state.role.length) {
    //       resolve(state.role);
    //     } else {
    //       getRole().then(res => {
    //         const role = res.data.map(item => {
    //           return { value: item.p_code, label: item.category };
    //         });
    //         commit('setRole', role);
    //         resolve(role);
    //       });
    //     }
    //   });
    // }
}

//vuex实例输出
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
