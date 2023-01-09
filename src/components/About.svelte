<script lang="ts">
    import { open } from "@tauri-apps/api/shell";
    let discordURL: string = "https://discord.gg/6uvyxGnNnp";
    const modaltoggle = () => {
        document.getElementById("about").classList.toggle("hidden");
    };
</script>

<button on:click="{modaltoggle}" class="block w-full px-4 py-2 text-sm hover:bg-hover">About</button>
<div id="about" class="fixed inset-0 hidden">
    <div class="flex h-[100vh] items-center justify-center backdrop-brightness-[.2]">
        <div class="h-auto w-96 rounded-md bg-background">
            <div class="my-4 flex w-full flex-col items-center justify-center text-center">
                <button on:click="{modaltoggle}" class="relative w-full">
                    <svg class="absolute top-0 right-4 w-5" fill="white" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z">
                        </path>
                    </svg>
                </button>
                <img class="h-auto w-28" src="/app.png" alt="icon" />
                <div class="my-4 text-xl font-bold">Aniluv</div>
                <div class="text-sm font-thin">
                    <div>An open-source project made for weebs : 3</div>
                    <div>I hope to maintain this project as long as I can.</div>
                    <div class="mt-5 text-base font-normal">Happen to find any bugs? Create a GitHub issue <button class="text-accent underline" on:click="{() => open('https://github.com/wovnep/aniluv/issues')}">here.</button></div>
                    <div class="mt-3 font-thin">Join discord for updates.</div>
                    <div class="mt-2 flex justify-center">
                        <button on:click="{() => open(discordURL)}">
                            <img class="w-40" src="/discord.svg" alt="Discord" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
