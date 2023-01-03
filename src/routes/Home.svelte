<script lang="ts">
    import { getPopular, getTrending } from "../lib/http-client";
    import Search from "../components/Search.svelte";
    import Card from "../components/Card.svelte";
    import DropDown from "../components/DropDown.svelte";
    import Loading from "../components/anime/Loading.svelte";
    import Error from "../components/anime/Error.svelte";
</script>

<div class="flex w-full items-center justify-center py-3">
    <div class="w-96 items-center">
        <Search />
    </div>
    <DropDown />
</div>
{#await getTrending()}
    <Loading index="1" />
{:then data}
    <div class="ml-8 text-2xl">Trending</div>
    <div class="grid grid-rows-1 grid-flow-col mx-8 gap-3 my-5 overflow-x-scroll overflow-y-hidden">
        {#each data.results as anime}
            <Card title="{anime.title.userPreferred}" image="{anime.image}" id="{anime.id}" />
        {/each}
    </div>
{:catch}
    <Error />
{/await}
{#await getPopular()}
    <div></div>
{:then data}
    <div class="ml-8 text-2xl">Popular</div>
    <div class="grid grid-rows-1 grid-flow-col mx-8 gap-4 my-5 overflow-x-scroll overflow-y-hidden">
        {#each data.results as anime}
            <Card title="{anime.title.userPreferred}" image="{anime.image}" id="{anime.id}" />
        {/each}
    </div>
{:catch}
    <div></div>
{/await}
