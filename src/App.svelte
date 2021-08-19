<script>
	import Login from "./pages/Login/Login.svelte";
	import Dashboard from "./pages/Dashboard/Dashboard.svelte";
	import "bootstrap/dist/css/bootstrap.min.css";

	let code = new URLSearchParams(window.location.search).get('code');
</script>

<style>
</style>

{#if code}
	<Dashboard {code} />
{:else}
	<Login />
{/if}
