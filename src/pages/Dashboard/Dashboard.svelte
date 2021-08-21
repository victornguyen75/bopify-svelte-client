<script>
  import { Container } from "sveltestrap";
  import SpotifyWebApi from "spotify-web-api-node";

  import Auth from "./components/Auth.svelte";
  import { accessToken } from "./components/stores";

  export let code = "";

  let search = "";
  let searchResults = [];
  const CLIENT_ID = "e3c52dc073bb460cbabfabfdf10c4463"; // Public
  const spotifyApi = new SpotifyWebApi({ clientId: CLIENT_ID });

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


</script>

<Auth {code}/>
<Container 
  class="d-flex flex-column py-2"
  style="height: 100vh"  
>
  <input 
    type="text"
    placeholder="Search Songs/Artists"
    bind:value={search}
  />
  <div class="flex-grow-1 my-2" style="overflowY: auto"></div>
</Container>
