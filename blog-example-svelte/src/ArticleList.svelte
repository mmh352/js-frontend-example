<script lang="ts">
import Article from './Article.svelte';
import { articles } from './store';
</script>

<ul>
    {#each $articles as article}
        <Article article={article}/>
    {/each}
</ul>

<style>
ul {
    margin: 0;
    padding: 0 1rem;
}
</style>
