<script>
  import { Container } from "sveltestrap";
  import SpotifyWebApi from "spotify-web-api-node";
  
  import Auth from "./components/Auth.svelte";
  import { accessToken } from "./components/stores";
  import TrackSearchResults from "./components/TrackSearchResults.svelte";
  import SpotifyWebPlayback from "./components/SpotifyWebPlayback/SpotifyWebPlayback.svelte";

  export let code = "";

  const CLIENT_ID = "e3c52dc073bb460cbabfabfdf10c4463"; // Public
  const spotifyApi = new SpotifyWebApi({ clientId: CLIENT_ID });
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

<Auth {code}/>
<Container class="d-flex flex-column py-2" style="height: 100vh">
  <input 
    type="text"
    placeholder="Search Songs/Artists"
    bind:value={search}
  />
  <div class="flex-grow-1 my-2" style="overflowY: auto">
    {#each searchResults as track}
      <TrackSearchResults {track} {handleSelectedTrack} />
    {/each}
  </div>
  <div>
    <SpotifyWebPlayback
      artist={selectedTrack.artist}
      title={selectedTrack.title}
      uri={selectedTrack.uri}
      albumUrl={selectedTrack.albumUrl}
    />
  </div>
</Container>
