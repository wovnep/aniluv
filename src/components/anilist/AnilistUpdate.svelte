<script lang="ts">
    import { onMount } from "svelte";
    import moment from "moment";
    import { getMediaList, updateMediaList } from "../../lib/anilist/anilist-client";
    import { login } from "../../lib/anilist/anilist-login";
    import type { InfoResponse } from "../../lib/gogo/gogo-types";

    export let id: string;
    export let anime: InfoResponse;
    let user: any;
    let data = {
        status: "CURRENT",
        title: anime.title.english,
        banner: anime.image,
        cover: anime.cover,
        score: 0,
        episodes: anime.totalEpisodes,
        progress: 0,
        startedAt: null,
        completedAt: null,
        repeat: 0,
        notes: "",
    };
    let updateMessage: string;

    onMount(async () => {
        const res = await login();
        if (res) {
            user = res.data.Viewer;
            const medialist = await getMediaList(id);
            if (medialist.MediaList) {
                let main = medialist.MediaList;
                data.status = main.status;
                data.score = main.score;
                data.episodes = main.media.episodes;
                data.progress = main.progress;
                data.startedAt = !main.startedAt.year
                    ? null
                    : moment()
                          .year(main.startedAt.year)
                          .month(main.startedAt.month - 1)
                          .date(main.startedAt.day)
                          .format("YYYY-MM-DD");
                data.completedAt = !main.completedAt.year
                    ? null
                    : moment()
                          .year(main.completedAt.year)
                          .month(main.completedAt.month - 1)
                          .date(main.completedAt.day)
                          .format("YYYY-MM-DD");
                data.repeat = main.repeat;
                data.notes = main.notes ? main.notes : "";
            }
        }
    });

    const modaltoggle = () => {
        updateMessage = undefined;
        document.getElementById("modal").classList.toggle("hidden");
    };
    const submit = async () => {
        const response = await updateMediaList(data, id);
        if (response.data) {
            updateMessage = "Anilist updated!";
        } else {
            updateMessage = "Error has occurred!";
        }
        setTimeout(() => {
            updateMessage = undefined;
        }, 1500);
    };
</script>

{#if user}
    <div class="mt-1">
        <button on:click="{modaltoggle}" class="rounded-md bg-cyan-500 py-2 px-3 text-sm"> UPDATE LIST </button>
    </div>
{:else}
    <div></div>
{/if}
<div id="modal" class="fixed top-0 left-0 z-50 hidden w-full overflow-y-auto">
    <div class="min-height-100vh flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0">
            <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
        <div class="align-center inline-block transform overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle" role="dialog" aria-modal="true">
            <div class="bg-black">
                <img class="h-auto w-full opacity-60" src="{data.cover}" alt="cover" />
            </div>
            <div class="flex">
                <img src="{data.banner}" class="absolute top-6 left-5 w-20 rounded-sm" alt="anime-img" />
                <div class="absolute left-28 top-16 font-bold">
                    {data.title}
                </div>
            </div>
            <div class="mx-6 mt-14 grid grid-flow-row grid-cols-3 gap-x-10 gap-y-3">
                <div class="flex flex-col">
                    <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Status</div>
                    <select class="bg-darker p-2 focus:outline-none" bind:value="{data.status}">
                        <option value="CURRENT">Watching</option>
                        <option value="PLANNING">Plan to watch</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="REPEATING">Rewaching</option>
                        <option value="PAUSED">Paused</option>
                        <option value="DROPPED">Dropped</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Score</div>
                    <input class="bg-darker p-2 focus:outline-none" type="number" max="10" bind:value="{data.score}" />
                </div>
                <div class="flex flex-col">
                    <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Episode Progress</div>
                    <input class="bg-darker p-2 focus:outline-none" type="number" max="{data.episodes}" bind:value="{data.progress}" />
                </div>
                <div class="flex flex-col">
                    <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Start Date</div>
                    <input class="bg-darker p-2 focus:outline-none" type="date" title="start" bind:value="{data.startedAt}" />
                </div>
                <div class="flex flex-col">
                    <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Finish Date</div>
                    <input class="bg-darker p-2 focus:outline-none" type="date" title="end" bind:value="{data.completedAt}" />
                </div>
                <div class="flex flex-col">
                    <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Total Rewatches</div>
                    <input class="bg-darker p-2 focus:outline-none" type="number" max="12" bind:value="{data.repeat}" />
                </div>
            </div>
            <div class="my-5 mx-6 flex flex-col">
                <div class="mx-1 mb-1 text-sm font-thin text-gray-300">Note</div>
                <input bind:value="{data.notes}" class="w-full bg-darker p-2 focus:outline-none" type="text" />
            </div>
            {#if updateMessage}
                <div class="absolute bottom-20 flex w-full justify-center">
                    <div class="rounded-md bg-accent_hover bg-opacity-75 py-5 px-10 text-center text-base">
                        {updateMessage}
                    </div>
                </div>
            {/if}
            <div class="px-4 py-3 text-right">
                <button type="button" on:click="{modaltoggle}" class="mr-2 rounded bg-menu py-2 px-4 text-white hover:bg-hover"><i class="fas fa-times"></i> Cancel</button>
                <button type="button" on:click="{submit}" class="mr-2 rounded bg-accent py-2 px-4 text-white hover:bg-accent_hover"><i class="fas fa-plus"></i> Save</button>
            </div>
        </div>
    </div>
</div>
