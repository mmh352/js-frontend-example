<script lang="ts">
import ArticleList from './ArticleList.svelte';
import ArticleAdd from './ArticleAdd.svelte';

let adding = false;

function addArticle() {
	adding = !adding;
}
</script>

<div id="svelte-js-blog">
    <h1>My Blog
        <button on:click={addArticle} class="right">
            <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
        </button>
    </h1>
	{#if adding}
		<ArticleAdd on:close={addArticle}/>
	{:else}
		<ArticleList/>
	{/if}
</div>

<style>
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
