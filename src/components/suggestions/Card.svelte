<script lang="ts">
    import { link } from "svelte-spa-router";
    export let image: string;
    export let title: string;
    export let id: string;
</script>

<div class="border-sm mb-3 h-auto w-48 overflow-hidden rounded-2xl bg-menu hover:bg-hover">
    <a href="{`/watch/${id}/0`}" use:link>
        <img class="h-[268px] w-full" src="{image}" alt="{title}" />
        <div class="p-1 text-center">
            <div class="text-over font-medium">{title}</div>
        </div>
    </a>
</div>

<style>
    .text-over {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>
