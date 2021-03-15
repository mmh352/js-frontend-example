<script lang="ts">
export let article;

import { articles } from './store';

let details = false;

function toggleDetails() {
    details = !details;
    if (details) {
        articles.fetchArticle(article.id);
    }
}

function deleteArticle() {
    articles.deleteArticle(article.id);
}
</script>

<li>
    <h2>
        <button on:click={toggleDetails}>{article.title}</button>
        <button on:click={deleteArticle} class="right">
            <svg viewBox="0 0 24 24">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
        </button>
        <small>written by {article.author.name}</small>
    </h2>
    {#if details}
        <div>{article.content}</div>
    {/if}
</li>

<style>
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
