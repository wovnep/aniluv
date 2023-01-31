<script lang="ts">
    import { Player, Hls, DefaultUi, Captions } from "@vime/svelte";
    import { getInfo, getEpisode } from "../lib/gogo/gogo-client";
    import { link } from "svelte-spa-router";
    import { appWindow } from "@tauri-apps/api/window";
    import { createQuery } from "@tanstack/svelte-query";
    import TvIndexCard from "../components/suggestions/TvIndexCard.svelte";
    import OtherIndexCard from "../components/suggestions/OtherIndexCard.svelte";
    import AnilistUpdate from "../components/anilist/AnilistUpdate.svelte";
    import Loading from "../components/handling/Loading.svelte";
    import Error from "../components/handling/Error.svelte";
    interface Parameters {
        id: string;
        index: number;
    }
    export let params: Parameters;

    $: info = createQuery({
        queryKey: [params.id],
        queryFn: () => getInfo(params.id),
    });
    const setFullscreen = async (e: any) => {
        if (e.detail) {
            await appWindow.setFullscreen(true);
        } else {
            await appWindow.setFullscreen(false);
        }
    };
</script>

{#if $info.isLoading}
    <Loading index="2" />
{:else if $info.isError}
    <Error />
{:else if $info.isSuccess}
    <div>
        <a href="/" use:link>
            <div class="absolute right-6 top-3 rounded-full bg-menu p-2 hover:bg-darker">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="19" height="19" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"></path></svg>
            </div>
        </a>
        <div class="my-5 ml-5 flex">
            <div class="relative inline-block w-[75%] after:block after:pt-[56.25%] after:content-['']">
                <div class="absolute top-0 bottom-0 right-0 left-0">
                    <Player theme="dark" style="--vm-player-theme: #555555; --vm-player-bg: #000000;" on:vmFullscreenChange="{setFullscreen}">
                    {#await getEpisode($info.data.episodes[params.index].id, params.id, params.index)}
                        <div class="bg-black w-full pt-[56.25%]"></div>
                    {:then episodes}
                            <Hls>
                                <source data-src="{episodes.source.url}" type="application/x-mpegURL" />
                                {#if episodes.subtitles}
                                    {#each episodes.subtitles as subtitle}
                                        <track kind="subtitles" src="{subtitle.url}" srclang="" label="{subtitle.lang}" />
                                    {/each}
                                {/if}
                            </Hls>
                            <DefaultUi noSpinner noCaptions>
                                <Captions style="--vm-captions-z-index: 10;" />
                            </DefaultUi>
                            {/await}
                        </Player>
                    <div>
                        <div class="absolute right-0 flex items-center justify-between gap-2">
                            <AnilistUpdate anime="{$info.data}" id="{params.id}" />
                        </div>
                        <div class="mt-2 text-start text-2xl font-bold tracking-wide">
                            {#if $info.data.title.english}
                                {$info.data.title.english}
                            {:else}
                                {$info.data.title.romaji}
                            {/if}
                            {#if $info.data.episodes[params.index].title}
                                | {$info.data.episodes[params.index].title}
                            {/if}
                        </div>
                        <div class="mt-2 text-xs opacity-90">
                            Release date: {$info.data.releaseDate}
                        </div>
                        <div class="flex gap-2 py-2 text-xs font-semibold text-black">
                            <div class="tooltip rounded-md bg-red-400 px-2 py-1 capitalize">
                                {$info.data.subOrDub}
                            </div>
                            <div class="rounded-md bg-green-400 px-2 py-1">
                                {$info.data.status}
                            </div>
                            <div class="rounded-md bg-cyan-400 px-2 py-1 lowercase first-letter:uppercase">
                                {$info.data.type}
                            </div>
                            <div class="rounded-md bg-rose-400 px-2 py-1">
                                {$info.data.rating}%
                            </div>
                        </div>
                        <div class="mt-5 text-sm font-thin">
                            {@html $info.data.description}
                        </div>
                    </div>
                </div>
            </div>
            {#if $info.data.type == "TV"}
                <TvIndexCard anime="{$info.data}" params="{params}" />
            {:else}
                <OtherIndexCard anime="{$info.data}" />
            {/if}
        </div>
    </div>
{/if}
