<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { accessToken } from "./stores";
  
  export let code = "";

  let refreshToken = "";
  let expiresIn = "";

  onMount(async () => {
    try {
      const res = await axios.post("http://localhost:5001/login", {
        code,
      });
      accessToken.set(res.data.accessToken)
      refreshToken = res.data.refreshToken;
      expiresIn = res.data.expiresIn;

      window.history.pushState({}, null, "/");

    } catch(e) {
      console.error(e)
      window.location = "/";
    }
  })
</script>
