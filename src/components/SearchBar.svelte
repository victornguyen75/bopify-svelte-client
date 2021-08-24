<script>
  import { Container } from "sveltestrap";
  import SpotifyWebApi from "spotify-web-api-node";
  import axios from "axios";

  import { playerState } from "./stores";
  import TrackSearchResults from "./TrackSearchResults.svelte";

  export let loginCounter = 0;
  export let clientId;

  const spotifyApi = new SpotifyWebApi({ clientId });
  let search = "";
  let searchResults = [];
  let selectedTrack = {};
  let lyrics = localStorage.getItem("lyrics") || "";

  $: disabled = loginCounter < 2;
  $: if ($playerState.accessToken) {
      spotifyApi.setAccessToken($playerState.accessToken);
    }
  $: if (!$playerState.accessToken || !search) {
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
  $: if (selectedTrack.title) { 
    axios.get("http://localhost:5001/lyrics", {
      params: {
        track: selectedTrack.title,
        artist: selectedTrack.artist,
      },
    }).then((res) => {
      lyrics = res.data.lyrics;
      localStorage.setItem("lyrics", lyrics);
    }).catch((e) => {
      console.error(e);
    });
  }
  
  const handleSelectedTrack = (track) => {
    const uris = [track.uri];
    selectedTrack = track;
    searchResults = [];
    lyrics = "";

    let context_uri, offset = 0;
    let body;

    if (context_uri) {
      const isArtist = context_uri.indexOf('artist') >= 0;
      let position;

      /* istanbul ignore else */
      if (!isArtist) {
        position = { position: offset };
      }

      body = JSON.stringify({ context_uri, offset: position });
    } else if (Array.isArray(uris) && uris.length) {
      body = JSON.stringify({ uris, offset: { position: offset } });
    }

    return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${$playerState.deviceId}`, {
      body,
      headers: {
        Authorization: `Bearer ${$playerState.accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
  }
</script>

<Container class="d-flex flex-column py-2" style={searchResults.length === 0 && lyrics.length === 0 ? "height: 100vh" : ""}>
  <input 
    type="text"
    placeholder={disabled ? "Login First" : "Search Songs/Artists"}
    bind:value={search}
    {disabled}
  />
  <div class="flex-grow-1 my-2">
    {#each searchResults as track}
      <TrackSearchResults {track} {handleSelectedTrack} />
    {/each}
    {#if searchResults.length === 0 && $playerState.status === "READY"}
      <div class="text-center lyrics">
        {lyrics}
      </div>
    {/if}
  </div>
</Container>

<style>
  .lyrics {
    white-space: pre;
  }
</style>