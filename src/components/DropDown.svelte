<script lang="ts">
    import Login from "./Login.svelte";
    import About from "./About.svelte";
    import { onMount } from "svelte";
    import { login } from "../lib/anilist/anilist-login";

    let user: any;

    onMount(async () => {
        const res = await login();
        if (res) {
            user = res.data.Viewer;
        }
    });
    const dropdown = () => {
        const dropdown = document.getElementById("dropdown");
        if (dropdown.style.display === "block" || dropdown.style.display === " ") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    };
</script>

<div class="absolute right-5">
    <div>
        <button on:click="{dropdown}" class="inline-flex w-full justify-center px-4 py-2 text-sm font-medium shadow-sm focus:outline-none" aria-expanded="true" aria-haspopup="true">
            {#if user}
                <img class="h-auto w-14" src="{user.avatar.medium}" alt="profile" />
            {:else}
                <svg class="h-auto w-10 rounded-full bg-darker p-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"> </path>
                </svg>
            {/if}
        </button>
    </div>
    <div id="dropdown" class="fixed hidden divide-y divide-gray-100 rounded bg-white shadow dark:bg-menu">
        <ul class="py-1 text-sm" aria-labelledby="dropdownDefault">
            <li>
                <Login state="{user}" dropdown="{dropdown}" />
            </li>
            <li>
                <About />
            </li>
        </ul>
    </div>
</div>
