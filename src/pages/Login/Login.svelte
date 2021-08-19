<script>
  import { Container } from "sveltestrap";

  const REDIRECT = "http://localhost:5000";
  const CLIENT_ID = "e3c52dc073bb460cbabfabfdf10c4463"; // Public
  const AUTH_URL = encodeURI(
  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT}&scope=streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state`
);
</script>

<Container 
  class="d-flex justify-content-center align-items-center" 
  style="min-height: 100vh"
>
  <a class="btn btn-success btn-lg" href={AUTH_URL}>Login With Spotify</a>
</Container>