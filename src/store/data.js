const Papa = require("papaparse");

export default {
    namespaced: true,
    state: {
        header: [],
        data: [],
        colWidths: [],
    },
    mutations: {
        APPEND_DATA(state, payload) {
            if (state.header.length == 0) {
                state.header = payload.map(value => {
                    return {
                        value: value,
                        width: 100,
                    }
                });
            }
            else {
                state.data.push(payload);
            }
        },
    },
    actions: {
        load({commit}, params) {
            fetch("/api/data/" + params.id)
                .then(res => res.text())
                .then(csv => {
                    Papa.parse(csv, {
                        worker: true, step: function (data) {
                            commit("APPEND_DATA", data.data);
                        }
                    });
                })
        },
    },
    getters: {
        rows: state => {
            return state.data;
        },
        header: state => {
            return state.header;
        },
    }
}