<template>
    <li>
        <h2>
            <button @click="toggleDetails">{{ article.title }}</button>
            <button @click="deleteArticle" class="right">
                <svg viewBox="0 0 24 24">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </button>
            <small>written by {{ article.author.name }}</small>
        </h2>
        <div v-if="details" v-html="article.content"></div>
    </li>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { ComponentRoot } from '../base';
import { Article as ArticleInt } from '../backend';

@Options({
    props: ['article']
})
export default class Article extends ComponentRoot {
    public article!: ArticleInt;
    public details = false;

    public toggleDetails() {
        this.details = !this.details;
        if (this.details) {
            this.$store.dispatch('fetchArticle', this.article.id);
        }
    }

    public deleteArticle() {
        this.$store.dispatch('deleteArticle', this.article.id);
    }
}
</script>

<style scoped>
li {
    list-style-type: none;
    padding: 0;
    margin: 0 0 2rem 0;
}

h2 {
    margin: 0;
}

h2 + div {
    margin-top: 0.5rem;
}

small {
    display: block;
    font-size: 60%;
    font-weight: normal;
}
</style>
