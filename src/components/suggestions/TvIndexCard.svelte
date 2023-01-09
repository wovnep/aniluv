<script lang="ts">
    import { link } from "svelte-spa-router";
    export let anime: any;
    export let params: any;
</script>

<div class="w-[25%] px-5">
    <div class="mb-5 ml-2 font-bold text-white">EPISODES</div>
    <div class="grid w-full grid-flow-row grid-cols-1 gap-5">
        {#each anime.episodes as episodes, i}
            <div class="h-40 rounded-2xl bg-cover" style="background-image: url('{episodes.image}')">
                {#if params.index && params.index == i}
                    <div class="h-full w-full rounded-2xl px-5 text-start text-white backdrop-blur-[1px] backdrop-brightness-[.1]">
                        <div class="title pt-5 font-extrabold">
                            [{episodes.number}] {episodes.title}
                        </div>
                        <div class="description mt-5 text-sm font-thin">
                            {episodes.description}
                        </div>
                    </div>
                {:else}
                    <a href="/watch/{anime.id}/{i}" use:link>
                        <div class="h-full w-full rounded-2xl px-5 text-start text-white backdrop-blur-[1px] backdrop-brightness-50 hover:backdrop-brightness-[.7]">
                            <div class="title pt-5 font-extrabold">
                                [{episodes.number}] {episodes.title}
                            </div>
                            <div class="description mt-5 text-sm font-thin">
                                {episodes.description}
                            </div>
                        </div>
                    </a>
                {/if}
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
    .description {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
</style>
