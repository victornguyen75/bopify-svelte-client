<script>
  import { onMount } from "svelte";

  import DarkModeIcon from "./DarkModeIcon.svelte";
  import LightModeIcon from "./LightModeIcon.svelte";
  import { theme, toggleTheme } from "./ThemeProvider";
  
  const toggleButtonColor = () => {
    const toggler = document.getElementById("theme-toggler");
    if (toggler) {
      toggler.style.setProperty('--btnBackground', $theme.btnBackground);
    }
  }

  onMount(toggleButtonColor);
  $: toggleButtonColor($theme.btnBackground);
</script>

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


<style>
	#theme-toggler {
    --btnBackground: "";
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
    background: var(--btnBackground);
	}
</style>
