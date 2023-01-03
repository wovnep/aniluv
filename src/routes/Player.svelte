<script lang="ts">
    import { Player, Hls, DefaultUi } from "@vime/svelte";
    import { getInfo, getEpisode } from "../lib/http-client";
    import { link } from "svelte-spa-router";
    import { appWindow } from "@tauri-apps/api/window";
    import TvIndexCard from "../components/player/TvIndexCard.svelte";
    import OtherIndexCard from "../components/player/OtherIndexCard.svelte";
    import AnilistUpdate from "../components/AnilistUpdate.svelte";
    import Loading from "../components/anime/Loading.svelte";
    export let params;
    const getUrl = (sources) => {
        const source = sources.filter((source) => source.quality == "default");
        if (source != 0) {
            return source[0].url;
        } else {
            const backup = sources.filter((source) => source.quality == "backup");
            return backup[0].url;
        }
    };
    const setFullscreen = async (e) => {
        if (e.detail) {
            await appWindow.setFullscreen(true);
        } else {
            await appWindow.setFullscreen(false);
        }
    };
</script>

{#await getInfo(params.id)}
    <Loading index="2" />
{:then anime}
    <div>
        <a href="/" use:link>
            <div class="absolute right-6 bg-menu hover:bg-darker top-2 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="19" height="19" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"></path></svg>
            </div>
        </a>
        <div class="flex my-5 ml-5">
            <div class="w-[75%] inline-block relative after:pt-[56.25%] after:block after:content-['']">
                <div class="absolute top-0 bottom-0 right-0 left-0">
                    {#await getEpisode(anime.episodes[params.index].id)}
                        <div class="bg-black w-full pt-[56.25%]"></div>
                    {:then episodes}
                        <Player theme="dark" style="--vm-player-theme: #121212;" on:vmFullscreenChange="{setFullscreen}">
                            <Hls poster="{anime.cover}">
                                <source data-src="{getUrl(episodes.sources)}" type="application/x-mpegURL" />
                            </Hls>
                            <DefaultUi noSpinner noCaptions />
                        </Player>
                    {/await}
                    <div>
                        <AnilistUpdate anime="{anime}" id="{params.id}" />
                        <div class="mt-2 font-bold text-start text-2xl tracking-wide">
                            {#if anime.title.english}{anime.title.english}{:else}{anime.title.romaji}{/if}{#if anime.episodes[params.index].title}
                                | {anime.episodes[params.index].title}{/if}
                        </div>
                        <div class="text-xs opacity-90 mt-1">
                            Release date: {anime.releaseDate}
                        </div>
                        <div class="font-semibold text-xs flex gap-2 text-black py-2">
                            <div class="bg-red-400 px-2 py-1 rounded-md capitalize">
                                {anime.subOrDub}
                            </div>
                            <div class="bg-green-400 px-2 py-1 rounded-md">
                                {anime.status}
                            </div>
                            <div class="bg-cyan-400 px-2 py-1 rounded-md first-letter:uppercase lowercase">
                                {anime.type}
                            </div>
                            <div class="bg-red-400 px-2 py-1 rounded-md">
                                {anime.rating}
                            </div>
                        </div>
                        <div class="mt-5 text-sm font-thin">
                            {@html anime.description}
                        </div>
                    </div>
                </div>
            </div>
            {#if anime.type == "TV"}
                <TvIndexCard anime="{anime}" params="{params}" />
            {:else}
                <OtherIndexCard anime="{anime}" />
            {/if}
        </div>
    </div>
{:catch message}
    <div class="absolute right-0 left-0 top-0 bottom-0 ">
        {message}
    </div>
{/await}
