<script lang="ts">
    import { link } from "svelte-spa-router";
    export let anime: any;
</script>

<div class="w-[25%] px-5">
    <div class="mb-2 ml-2 font-bold text-white">RECOMMENDATIONS</div>
    <div class="grid w-full grid-flow-row grid-cols-1 gap-5">
        {#each anime.recommendations as recommend_anime}
            <div class="h-40 rounded-2xl bg-cover" style="background-image: url('{recommend_anime.cover}')">
                <a href="/watch/{recommend_anime.id}/0" use:link>
                    <div class="h-full w-full rounded-2xl px-5 text-start text-white backdrop-blur-[1px] backdrop-brightness-50 hover:backdrop-brightness-75">
                        <div class="title pt-5 font-extrabold">
                            {#if recommend_anime.title.english}{recommend_anime.title.english}{:else}{recommend_anime.title.romaji}{/if}
                        </div>
                        <div class="flex gap-4 py-2 text-sm font-semibold text-black">
                            <div class="rounded-2xl bg-green-400 px-2 py-1">
                                {recommend_anime.status}
                            </div>
                            <div class="rounded-2xl bg-cyan-400 px-2 py-1">
                                {recommend_anime.type}
                            </div>
                            <div class="rounded-2xl bg-red-400 px-2 py-1">
                                {recommend_anime.rating}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .title {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>
