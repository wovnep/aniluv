<script lang="ts">
    import { createQuery } from "@tanstack/svelte-query";
    import Search from "../components/Search.svelte";
    import Card from "../components/suggestions/Card.svelte";
    import DropDown from "../components/DropDown.svelte";
    import Loading from "../components/handling/Loading.svelte";
    import Error from "../components/handling/Error.svelte";
    // import ToggleLang from "../components/provider/ToggleProvider.svelte";
    import type { TrendingPopularResponse } from "../lib/gogo/gogo-types";
    import { invoke } from '@tauri-apps/api/tauri'
    const trending = createQuery<TrendingPopularResponse>({
        queryKey: ["trending"],
        queryFn: () => invoke("gogo_trending"),
    });
    const popular = createQuery<TrendingPopularResponse>({
        queryKey: ["popular"],
        queryFn: () => invoke("gogo_popular"),
    });

</script>

<div class="flex w-full items-center justify-center py-3">
    <!-- <div class="absolute top-10 left-10">
        <ToggleLang />
    </div> -->
    <div class="w-96 items-center">
        <Search />
    </div>
    <DropDown />
</div>
{#if $trending.isLoading}
    <Loading index="1" />
{:else if $trending.isError}
    <Error />
{:else if $trending.isSuccess}
    <div class="ml-8 text-2xl">Trending</div>
    <div class="mx-8 my-5 grid grid-flow-col grid-rows-1 gap-3 overflow-y-hidden overflow-x-scroll">
        {#each $trending.data.results as anime}
            <Card title="{anime.title.userPreferred}" image="{anime.image}" id="{anime.id}" />
        {/each}
    </div>
{/if}
{#if $popular.isSuccess}
    <div class="ml-8 text-2xl">Popular</div>
    <div class="mx-8 my-5 grid grid-flow-col grid-rows-1 gap-4 overflow-y-hidden overflow-x-scroll">
        {#each $popular.data.results as anime}
            <Card title="{anime.title.userPreferred}" image="{anime.image}" id="{anime.id}" />
        {/each}
    </div>
{/if}
