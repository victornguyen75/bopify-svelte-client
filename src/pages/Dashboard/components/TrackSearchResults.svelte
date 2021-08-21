<script>
  export let track = {};
  export let chosenTrack = () => console.log(track);
</script>

<div 
  class="d-flex m-2 align-items-center" 
  style="cursor: pointer"
  on:click={() => chosenTrack(track)}
  >
  <img alt={`${track.title} album image`} src={track.albumUrl} style="height: 64px; width: 64px;" />
  <div style="margin-left: 1rem">
    <div>{track.title}</div>
    <div class="text-muted">{track.artist}</div>
  </div>
</div>