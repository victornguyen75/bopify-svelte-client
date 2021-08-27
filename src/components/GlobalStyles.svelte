<script>
  export let background = "";
  export let color = "";

  $: {
    const div = document.querySelector("div");
    if (div) {
      div.style.setProperty('--background', background);
      div.style.setProperty('--color', color);
    }
  }
</script>

<div>
  <slot />
</div>

<style>
  :root {
    --background: "";
    --color: "";
  }

  div {
    overflow: auto;
  }

  :global(div) {
    background-color: var(--background);
    color: var(--color);
  }
</style>