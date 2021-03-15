import { createStore } from 'vuex'

import { fetchAll, fetchSingle, createSingle, deleteSingle, Article } from '../backend';

export default createStore({
    state: {
        articles: {} as {[x: string]: any},
        articleIds: [] as string[],
    },
    mutations: {
        addArticle(state, payload: Article) {
            if (state.articles[payload.id]) {
                state.articles[payload.id] = { ...state.articles[payload.id], ...payload };
            } else {
                state.articles[payload.id] = payload;
            }
            if (state.articleIds.indexOf(payload.id) < 0) {
                state.articleIds.push(payload.id);
            }
        },

        newArticle(state, payload: Article) {
            state.articleIds.splice(0, 0, payload.id);
            state.articles[payload.id] = payload;
        },

        removeArticle(state, payload: string) {
            if (state.articles[payload]) {
                delete state.articles[payload];
            }
            if (state.articleIds.indexOf(payload) >= 0) {
                state.articleIds.splice(state.articleIds.indexOf(payload), 1);
            }
        },
    },
    actions: {
        init({ commit }) {
            fetchAll().forEach((article) => {
                commit('addArticle', article);
            });
        },

        fetchArticle({ commit }, id: string) {
            const article = fetchSingle(id);
            if (article) {
                commit('addArticle', article);
            }
        },

        createArticle({ commit }, payload: Article) {
            const article = createSingle(payload);
            commit('newArticle', article);
        },

        deleteArticle({ commit }, id: string) {
            commit('removeArticle', id);
            deleteSingle(id);
        },
    },
    modules: {
    }
})
