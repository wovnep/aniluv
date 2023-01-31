<script lang="ts">
    import { onMount } from "svelte";
    import { store } from "../../lib/anilist/anilist-login";
    export let isToggle = false;
    const changeHandler = (e: any) => {
        if (e.currentTarget.checked) {
            store.set("provider", "crunchyroll");
        } else {
            store.set("provider", "gogoanime");
        }
    };
    onMount(async () => {
        const provider = await store.get("provider");
        if(!provider) store.set("gogoanime")
        if (provider === "crunchyroll") {
            isToggle = true;
        } else {
            isToggle = false;
        }
    });
</script>

<div class="absolute left-10 flex h-full items-center text-center">
    <div class="mr-1 text-sm font-thin">GogoAnime</div>
    <label class="relative inline-block h-5 w-10 rounded-full">
        <input on:change="{changeHandler}" checked="{isToggle}" type="checkbox" class="peer h-0 w-0 opacity-0" />
        <span
            class="absolute top-0 left-0 right-0 bottom-0 cursor-pointer rounded-full bg-darker duration-300 
            before:absolute before:bottom-1 before:left-1 before:h-3 before:w-3 before:rounded-full before:bg-white
            before:duration-300 before:content-[''] peer-checked:before:translate-x-5">
        </span>
    </label>
    <div class="ml-1 text-sm font-thin">CrunchyRoll</div>
</div>
