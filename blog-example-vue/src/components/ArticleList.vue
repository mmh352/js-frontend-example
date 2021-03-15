<template>
    <ul>
        <Article v-for="article in articles" :key="article.id" :article="article"></Article>
    </ul>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { ComponentRoot } from '../base';
import Article from './Article.vue';

@Options({
    components: { Article },
})
export default class ArticleList extends ComponentRoot {
    get articles() {
        return this.$store.state.articleIds.map((id: string) => {
            return this.$store.state.articles[id];
        });
    }
}
</script>

<style scoped>
ul {
    margin: 0;
    padding: 0 1rem;
}
</style>
