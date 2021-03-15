export interface NestedStorage {
    [x: string]: null | string | number | boolean | NestedStorage | NestedStorage[] | string[];
}

function storeValue(storage: Storage, path: string, value: null | string | number | boolean | NestedStorage | NestedStorage[] | string[]): void {
    let obj = {} as NestedStorage;
    const data = storage.getItem('blogex:storage');
    if (data) {
        obj = JSON.parse(data);
    }
    const pathElements = path.split('.');
    let current = obj;
    for (let idx = 0; idx < pathElements.length; idx++) {
        const element = pathElements[idx];
        if (idx === pathElements.length - 1) {
            current[element] = value;
        } else {
            if (!current[element]) {
                current[element] = {};
            }
            current = current[element] as NestedStorage;
        }
    }
    storage.setItem('blogex:storage', JSON.stringify(obj));
}

function loadValue(storage: Storage, path: string, defaultValue: null | string | number | boolean | NestedStorage | NestedStorage[] | string[]): null | string | number | boolean | NestedStorage | NestedStorage[] | string[] {
    const data = storage.getItem('blogex:storage');
    if (data) {
        const obj = JSON.parse(data) as NestedStorage;
        const pathElements = path.split('.');
        let current = obj;
        for (let idx = 0; idx < pathElements.length; idx++) {
            const element = pathElements[idx];
            if (idx === pathElements.length - 1) {
                if (current[element] !== undefined) {
                    return current[element];
                } else {
                    return defaultValue;
                }
            } else {
                if (current[element]) {
                    current = current[element] as NestedStorage;
                } else {
                    return defaultValue;
                }
            }
        }
    }
    return defaultValue;
}

function deleteValue(storage: Storage, path: string): void {
    let obj = {} as NestedStorage;
    const data = storage.getItem('blogex:storage');
    if (data) {
        obj = JSON.parse(data);
    }
    const pathElements = path.split('.');
    let current = obj;
    for (let idx = 0; idx < pathElements.length; idx++) {
        const element = pathElements[idx];
        if (idx === pathElements.length - 1) {
            delete current[element];
        } else {
            if (!current[element]) {
                break;
            }
            current = current[element] as NestedStorage;
        }
    }
    storage.setItem('blogex:storage', JSON.stringify(obj));
}

export function sessionStoreValue(path: string, value: null | string | number | boolean | NestedStorage | NestedStorage[] | string[]): void {
    storeValue(sessionStorage, path, value);
}

export function sessionLoadValue(path: string, defaultValue: null | string | number | boolean | NestedStorage | NestedStorage[] | string[]): null | string | number | boolean | NestedStorage | NestedStorage[] | string[] {
    return loadValue(sessionStorage, path, defaultValue);
}

export function sessionDeleteValue(path: string): void {
    return deleteValue(sessionStorage, path);
}

export function localStoreValue(path: string, value: null | string | number | boolean | NestedStorage | NestedStorage[] | string[]): void {
    storeValue(localStorage, path, value);
}

export function localLoadValue(path: string, defaultValue: null | string | number | boolean | NestedStorage | NestedStorage[] | string[]): null | string | number | boolean | NestedStorage | NestedStorage[] | string[] {
    return loadValue(localStorage, path, defaultValue);
}

export function localDeleteValue(path: string): void {
    return deleteValue(localStorage, path);
}

export interface Article {
    id: string;
    title: string;
    author: ArticleAuthor;
    content?: string;
}

export interface ArticleAuthor {
    name: string;
}

function createBaseData(): Article[] {
    const articles = [
        {'id': '2', 'title': 'Trying it out', 'author': {'name': 'Mark'}, 'content': 'A second post just to make sure that this works as well.'},
        {'id': '1', 'title': 'First Post!', 'author': {'name': 'Mark'}, 'content': 'This is a first post to test the system.'},
    ];
    sessionStoreValue('articles', articles);
    return articles;
}

export function fetchAll(): Article[] {
    let articles = sessionLoadValue('articles', null) as unknown as Article[];
    if (articles === null) {
        articles = createBaseData();
    }
    return articles.map((article) => {
        return {
            'id': article.id,
            'title': article.title,
            'author': article.author
        };
    });
}

export function fetchSingle(id: string): Article | null {
    const articles = sessionLoadValue('articles', null) as unknown as Article[];
    if (articles !== null) {
        for(let idx = 0; idx < articles.length; idx++) {
            if (articles[idx].id === id) {
                return articles[idx];
            }
        }
    }
    return null;
}

export function createSingle(article: Article): Article {
    let articles = sessionLoadValue('articles', null) as unknown as Article[];
    if (articles === null) {
        articles = []
    }
    const articleIds = articles.map((article) => {
        return article.id;
    });
    let newId = 1;
    while (articleIds.indexOf(newId.toString()) >= 0) {
        newId++;
    }
    article = { ...article, 'id': newId.toString()};
    articles.splice(0, 0, article);
    sessionStoreValue('articles', articles as unknown as NestedStorage[]);
    return article;
}

export function deleteSingle(id: string) {
    const articles = sessionLoadValue('articles', null) as unknown as Article[];
    if (articles !== null) {
        sessionStoreValue('articles', articles.filter((article) => {
            return article.id !== id;
        }) as unknown as NestedStorage[]);
    }
}
