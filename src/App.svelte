<script lang="ts">
    import Router from "svelte-spa-router";
    import Home from "./routes/Home.svelte";
    import Player from "./routes/Player.svelte";
    const routes = {
        "/": Home,
        "/watch/:id/:index": Player,
    };
    document.addEventListener("contextmenu", (event) => event.preventDefault());
</script>

<body>
    <Router routes="{routes}" />
</body>
