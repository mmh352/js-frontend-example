import { writable } from 'svelte/store';
import { fetchAll, fetchSingle, createSingle, deleteSingle } from './backend';
import type { Article } from './backend';

function createArticlesStore() {
    const { subscribe, update } = writable([] as Article[], (set) => {
        const interval = setInterval(() => {
            set(fetchAll());
        }, 100);
        return () => {
            clearInterval(interval);
        };
    });

    return {
        subscribe,
        fetchArticles() {
            const articles = fetchAll();
            update((oldState) => {
                const newState = [];
                articles.forEach((article) => {
                    let existIdx = -1;
                    for (let idx = 0; idx < oldState.length; idx++) {
                        if (oldState[idx].id == article.id) {
                            existIdx = idx;
                            break;
                        }
                    }
                    if (existIdx >= 0) {
                        newState.push({ ...oldState[existIdx], ...article});
                    } else {
                        newState.push(article);
                    }
                });
                return newState;
            });
        },
        fetchArticle(id: string) {
            const article = fetchSingle(id);
            if (article) {
                update((oldState) => {
                    const newState = [];
                    let existing = false;
                    for (let idx = 0; idx < oldState.length; idx++) {
                        if (oldState[idx].id == article.id) {
                            newState.push({ ...oldState[idx], ...article });
                            existing = true;
                        } else {
                            newState.push(oldState[idx]);
                        }
                    }
                    if (!existing) {
                        newState.push(article);
                    }
                    return newState;
                });
            }
        },
        createArticle(article: Article) {
            article = createSingle(article);
            update((oldState) => {
                const newState = [ ...oldState ];
                newState.splice(0, 0, article);
                return newState;
            });
        },
        deleteArticle(id: string) {
            update((oldState) => {
                return oldState.filter((article) => {
                    return article.id !== id;
                });
            });
            deleteSingle(id);
        }
    }
}

export const articles = createArticlesStore();
articles.fetchArticles();
