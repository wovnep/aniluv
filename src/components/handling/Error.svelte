<div class="absolute inset-0 flex flex-col items-center justify-center gap-4">
    <img class="h-auto w-72" src="./error.gif" alt="Error" />
    <div class="text-center text-xl font-thin">Check your internet connection. If doesn't work wait couple minutes and try again.</div>
    <button on:click="{() => window.location.reload()}" class="rounded-lg bg-accent py-2 px-3 text-sm">RELOAD</button>
</div>
