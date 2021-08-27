<script>
  import { Container } from "sveltestrap";
	import "bootstrap/dist/css/bootstrap.min.css";

	import { SearchBar, Auth, WebPlayback, GlobalStyles, theme, toggleTheme } from "./components/index";
	import DarkModeIcon from "./components/DarkModeIcon.svelte";
	import LightModeIcon from "./components/LightModeIcon.svelte";

  const CLIENT_ID = "e3c52dc073bb460cbabfabfdf10c4463"; // Public
	let loginCounter = 0;
</script>

<Auth />
<GlobalStyles background={$theme.background} color={$theme.color}>
  <Container class="d-flex flex-column py-2" style="height: 100vh">
      <div class="d-flex">
        <h1>Bopify</h1>
        <button id="theme-toggler" on:click={() => toggleTheme($theme.name)}>
          {#if $theme.name === "light"}
            <DarkModeIcon />
          {:else}
            <LightModeIcon />
          {/if}
        </button>
      </div>
      <SearchBar {loginCounter} clientId={CLIENT_ID} />
      <div on:click={() => loginCounter += 1}>
        <WebPlayback client_id={CLIENT_ID} />
      </div>
    </Container>
</GlobalStyles>

<style>
	#theme-toggler {
		display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-left: auto;
    margin-bottom: 2rem;
    background: #b3b3b3;
	}
</style>
