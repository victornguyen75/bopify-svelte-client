<script>
  import { Container } from "sveltestrap";
  import SpotifyWebApi from "spotify-web-api-node";
  
  import { accessToken } from "./stores";
  import TrackSearchResults from "./TrackSearchResults.svelte";

  export let counter = 0;
  export let clientId;

  const spotifyApi = new SpotifyWebApi({ clientId });
  let search = "";
  let searchResults = [];
  let selectedTrack = {};

  $: {
    if ($accessToken) {
      spotifyApi.setAccessToken($accessToken);
    }
  }

  $: {
    if (!accessToken || !search) {
      searchResults = [];
    } else {
      spotifyApi.searchTracks(search).then((res) => {
        searchResults = res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        });
      })
    }
  }

  const handleSelectedTrack = (track) => {
    selectedTrack = track;
    searchResults = [];
  }
</script>

<Container class="d-flex flex-column py-2" style={searchResults.length === 0 ? "height: 100vh" : ""}>
  <input 
    type="text"
    placeholder={counter < 2 ? "Login First" : "Search Songs/Artists"}
    bind:value={search}
    disabled={counter < 2}
  />
  <div class="flex-grow-1 my-2" style="overflowY: auto">
    {#each searchResults as track}
      <TrackSearchResults {track} {handleSelectedTrack} />
    {/each}
  </div>
</Container>
