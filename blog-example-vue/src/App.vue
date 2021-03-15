<template>
    <div id="vue-js-blog">
        <h1>My Blog
            <button @click="addArticle" class="right">
                <svg viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
            </button>
        </h1>
        <article-add v-if="adding" @close="addArticle" />
        <article-list v-else />
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { ComponentRoot } from './base';
import ArticleList from './components/ArticleList.vue';
import ArticleAdd from './components/ArticleAdd.vue';

@Options({
    components: {
        ArticleList,
        ArticleAdd,
    },
})
export default class App extends ComponentRoot {
    public adding = false;

    public created() {
        this.$store.dispatch('init');
    }

    public addArticle() {
        this.adding = !this.adding;
    }
}
</script>

<style scoped>
div {
    max-width: 25rem;
}

h1 {
    background: #000066;
    color: #ffffff;
    margin: 0 0 1rem 0;
    padding: 0.5rem 1rem;
}

h1 button svg {
    fill: #ffffff;
}
</style>

<style>
button {
    font-size: inherit;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    font-weight: inherit;
    font-style: inherit;
    cursor: pointer;
    color: #000000;
}

button svg {
    width: 24px;
    height: 24px;
}

button.right {
    float: right;
}
</style>
