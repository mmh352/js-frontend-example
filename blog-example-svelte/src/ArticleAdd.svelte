<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { articles } from './store';

const dispatch = createEventDispatcher();
let title = '';
let titleError = false;
let content = '';
let contentError = false;

function addArticle(ev: Event) {
    ev.preventDefault();
    titleError = false;
    contentError = false;
    if (!title) {
        titleError = true;
    }
    if (!content) {
        contentError = true;
    }
    if (!titleError && !contentError) {
        articles.createArticle({
            'title': title,
            'content': content,
            'author': {'name': 'Mark'}});
        dispatch('close');
    }
}

function dontAdd() {
    dispatch('close');
}
</script>

<div>
    <h2>Add a Post</h2>
    <form on:submit={addArticle}>
        <label>Title
            <input bind:value={title} type="text" />
            {#if titleError}
                <span class="error">Please provide a title</span>
            {/if}
        </label>
        <label>Content
            <textarea bind:value={content}></textarea>
            {#if contentError}
                <span class="error">Please provide some content</span>
            {/if}
        </label>
        <div class="buttons">
            <button on:click={dontAdd}>Don't Add</button>
            <button>Add</button>
        </div>
    </form>
</div>
<style>
h2 {
    padding: 0 1rem;
}

form {
    padding: 0 1rem;
}

label {
    display: block;
    margin-bottom: 1rem;
}

input, textarea {
    display: block;
    width: 100%;
    padding: 0.3rem 0.5rem;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #dddddd;
    background: #fafafa;
}

input:focus, textarea:focus {
    box-shadow: 0 0 0.3rem inset #dddddd;
    outline: none;
}

textarea {
    height: 10rem;
}

div.buttons {
    text-align: right;
}

button {
    padding: 0.3rem 0.5rem;
    background: #000066;
    color: #ffffff;
    margin-left: 0.5rem;
    border-radius: 3px;
    font-size: 80%;
}

.error {
    font-size: 80%;
    color: #aa0000;
}
</style>
