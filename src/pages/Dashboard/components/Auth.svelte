<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { accessToken } from "./stores";
  
  export let code = "";

  let refreshToken = "";
  let expiresIn = "";

  $: code, onMount(getTokens);
  $: refreshToken, expiresIn, handleRefresh;

  const getTokens = async () => {
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
  };

  const handleRefresh = () => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.post("http://localhost:5001/refresh", {
        refreshToken,
      });
      accessToken.set(res.data.accessToken)
      expiresIn = res.data.expiresIn;

      window.history.pushState({}, null, "/");

    } catch(e) {
      console.error(e)
      window.location = "/";
    }}, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  };
</script>
