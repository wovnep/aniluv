<script lang="ts">
    import { query } from "../lib/gogo/gogo-client";
    import { link } from "svelte-spa-router";
    import DotLoading from "./handling/DotLoading.svelte";
    let queryInput: string;
    let showResults: boolean = false;
    document.addEventListener(
        "keydown",
        (e) => {
            const key = e.key;
            if (key == "/") {
                document.getElementById("search").focus();
            }
        },
        false
    );
    const queryHandler = (e: any) => {
        if (!e.target.value) {
            showResults = false;
        }
    };
    const submitHandler = () => {
        if (queryInput) {
            showResults = true;
        } else {
            showResults = false;
        }
    };
</script>

<div>
    <div>
        <form on:submit|preventDefault="{submitHandler}" class="relative flex items-center">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg aria-hidden="true" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input
                autocomplete="off"
                spellcheck="false"
                on:input|preventDefault="{queryHandler}"
                bind:value="{queryInput}"
                type="search"
                id="search"
                class="block w-full rounded-lg border border-accent bg-darker p-4 pl-10 text-sm focus:outline-none"
                placeholder="Anime Movies, Tv series..." />
            <button type="submit" class="absolute right-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium hover:bg-accent_hover focus:outline-none">Search</button>
        </form>
    </div>
    {#if showResults}
        {#await query(queryInput)}
            <DotLoading />
        {:then data}
            <div class="overflow-y-scroll absolute h-56 justify-center flex-row overflow-x-hidden w-96 bg-darker rounded-md py-2">
                {#each data.results as anime}
                    <div>
                        <a href="{`/watch/${anime.id}/0`}" use:link>
                            <h1 class="bg-menu p-3 my-1 mx-2 rounded-md shadow-lg font-semibold hover:bg-hover border border-menu">
                                {#if anime.title.english}{anime.title.english}{:else}{anime.title.userPreferred}{/if}
                            </h1>
                        </a>
                    </div>
                {/each}
            </div>
        {/await}
    {/if}
</div>
