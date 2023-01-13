<script lang="ts">
    import Router from "svelte-spa-router";
    import Home from "./routes/Home.svelte";
    import Player from "./routes/Player.svelte";
    import { QueryClientProvider, QueryClient } from "@tanstack/svelte-query";
    const routes = {
        "/": Home,
        "/watch/:id/:index": Player,
    };
    const queryClient = new QueryClient();
    document.addEventListener("contextmenu", (event) => event.preventDefault());
</script>

<QueryClientProvider client="{queryClient}">
    <Router routes="{routes}" />
</QueryClientProvider>
