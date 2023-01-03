<script>
    import { open } from "@tauri-apps/api/shell";
    import { storeKey, logout } from "../lib/anilist-login";
    let user;
    let key;
    export let state;
    export let dropdown;

    const logoutHandler = () => {
        logout();
        setInterval(() => {
            window.location.reload();
        }, 500);
    };
    const loginByKey = async () => {
        const res = await storeKey(key);
        if (res.data) {
            user = `Logged in as ${res.data.Viewer.name}`;
            setInterval(() => {
                window.location.reload();
            }, 1000);
        } else {
            user = res;
        }
    };
    const loginModal = () => {
        const div = document.getElementById("modal");
        if (div.style.display === "block" || div.style.display === " ") {
            div.style.display = "none";
            dropdown();
        } else {
            div.style.display = "block";
            open("https://anilist.co/api/v2/oauth/authorize?client_id=10615&response_type=token");
        }
    };
</script>

{#if state}
    <button on:click="{logoutHandler}" class="block w-full px-4 py-2 text-sm hover:bg-hover">Logout</button>
{:else}
    <button on:click="{loginModal}" class="block w-full px-4 py-2 text-sm hover:bg-hover">Login</button>
{/if}

<div id="modal" class="fixed inset-0 hidden backdrop-brightness-[.2]">
    <div class="flex h-[100vh] items-center justify-center overflow-y-auto ">
        <div class="pointer-events-none relative w-96 items-center">
            <div class="pointer-events-auto relative flex w-full flex-col rounded-md bg-background bg-clip-padding shadow-lg outline-none">
                <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b  p-4">
                    <h5 class="text-xl font-medium leading-normal">Anilist login</h5>
                </div>
                <div class="mx-4 mt-3 text-sm font-thin">
                    Aniluv currently can't handdle redirection. So please consider using this
                    <div class="mt-1 select-text bg-menu p-1">https://anilist.co/api/v2/oauth/authorize?client_id=10615&response_type=token</div>
                </div>
                <div class="my-5 flex justify-center">
                    <input bind:value="{key}" class="mx-4 w-full items-center justify-center rounded-sm bg-darker p-3 text-sm font-normal focus:outline-none" placeholder="Paste code here..." />
                </div>
                {#if user}
                    <div class="mb-1 text-center">
                        {user}
                    </div>
                {/if}
                <div class="flex flex-shrink-0 flex-wrap items-center justify-end gap-4 rounded-b-md border-t p-4">
                    <button on:click="{loginByKey}" type="button" class="rounded bg-accent px-6 py-2.5 text-xs font-medium uppercase hover:bg-accent_hover">Submit</button>
                    <button on:click="{loginModal}" type="button" class="rounded bg-menu px-6 py-2.5 text-xs font-medium uppercase hover:bg-hover">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
