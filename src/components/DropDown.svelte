<script lang="ts">
    import Login from "./Login.svelte";
    import About from "./About.svelte";
    import { open } from "@tauri-apps/api/shell";
    import { onMount } from "svelte";
    import { login } from "../lib/anilist-login";

    let state;
    onMount(async () => {
        const res = await login();
        if (res) {
            state = res.data.Viewer;
        }
    });
    const dropdown = () => {
        const div = document.getElementById("dropdown");
        if (div.style.display === "block" || div.style.display === " ") {
            div.style.display = "none";
        } else {
            div.style.display = "block";
        }
    };
</script>

<div class="absolute right-5">
    <div>
        <button on:click="{dropdown}" class="inline-flex w-full justify-center px-4 py-2 text-sm font-medium shadow-sm focus:outline-none" aria-expanded="true" aria-haspopup="true">
            {#if state}
                <img class="h-auto w-14" src="{state.avatar.medium}" alt="profile" />
            {:else}
                <svg class="h-auto w-10 rounded-full bg-darker p-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                    ><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            {/if}
        </button>
    </div>
    <div id="dropdown" class="fixed hidden divide-y divide-gray-100 rounded bg-white shadow dark:bg-menu">
        <ul class="py-1 text-sm" aria-labelledby="dropdownDefault">
            <li>
                <Login state="{state}" dropdown="{dropdown}" />
            </li>
            <li>
                <About />
            </li>
            <li>
                <button on:click="{() => open('https://discord.gg/6uvyxGnNnp')}" class="block w-full px-4 py-2 text-sm hover:bg-hover">Discord</button>
            </li>
        </ul>
    </div>
</div>
