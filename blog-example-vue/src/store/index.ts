import { createStore } from 'vuex'

import { fetchAll, fetchSingle, createSingle, deleteSingle, Article } from '../backend';

export default createStore({
    state: {
        articles: [] as Article[],
    },
    mutations: {
        setArticles(state, payload: Article[]) {
            state.articles = payload;
        },

        addArticle(state, payload: Article) {
            let found = false;
            for (let idx = 0; idx < state.articles.length; idx++) {
                if (state.articles[idx].id === payload.id) {
                    state.articles[idx] = { ...state.articles[idx], ...payload };
                    found = true;
                }
            }
            if (!found) {
                state.articles.push(payload);
            }
        },

        newArticle(state, payload: Article) {
            state.articles.splice(0, 0, payload);
        },

        removeArticle(state, payload: string) {
            let foundIdx = -1;
            for (let idx = 0; idx < state.articles.length; idx++) {
                if (state.articles[idx].id === payload) {
                    foundIdx = idx;
                    break;
                }
            }
            if (foundIdx >= 0) {
                state.articles.splice(foundIdx, 1);
            }
        },
    },
    actions: {
        init({ commit, dispatch }) {
            commit('setArticles', fetchAll());
            setInterval(() => {
                commit('setArticles', fetchAll());
            }, 500);
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
