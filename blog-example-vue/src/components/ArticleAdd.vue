<template>
    <div>
        <h2>Add a Post</h2>
        <form @submit="addArticle">
            <label>Title
                <input v-model="title" type="text" />
                <span v-if="titleError" class="error">Please provide a title</span>
            </label>
            <label>Content
                <textarea v-model="content"></textarea>
                <span v-if="contentError" class="error">Please provide some content</span>
            </label>
            <div class="buttons">
                <button @click="cancelAdd">Don't Add</button>
                <button>Add</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { ComponentRoot } from '../base';
import { Article as ArticleInt } from '../backend';

@Options({
    emits: ['close'],
})
export default class ArticleAdd extends ComponentRoot {
    public title = '';
    public titleError = false;
    public content = '';
    public contentError = false;

    public addArticle(ev: Event) {
        ev.preventDefault();
        this.titleError = false;
        this.contentError = false;
        if (!this.title) {
            this.titleError = true;
        }
        if (!this.content) {
            this.contentError = true;
        }
        if (!this.titleError && !this.contentError) {
            this.$store.dispatch('createArticle', {
                'title': this.title,
                'content': this.content,
                'author': {'name': 'Mark'}});
            this.$emit('close');
        }
    }

    public cancelAdd(ev: Event) {
        ev.preventDefault();
        this.$emit('close');
    }
}
</script>

<style scoped>
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
