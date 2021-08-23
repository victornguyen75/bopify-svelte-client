<script>
  export let track = {};
  export let handleSelectedTrack = () => console.log(track);
</script>

<div 
  class="d-flex m-2 align-items-center pointer"
  on:click={() => handleSelectedTrack(track)}
  >
  <img alt={`${track.title} album image`} src={track.albumUrl} class="album" />
  <div class="ml">
    <div>{track.title}</div>
    <div class="text-muted">{track.artist}</div>
  </div>
</div>

<style>
  .album {
    height: 64px;
    width: 64px;
  }
  .ml {
    margin-left: 1rem;
  }
  .pointer {
    cursor: pointer;
  }
</style>