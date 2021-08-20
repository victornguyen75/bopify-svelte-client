<script>
  import Auth from "./components/Auth.svelte";
  import { accessToken } from "./components/stores";

  export let code = "";
</script>

<Auth {code}/>
<p>{$accessToken}</p>
<p>{code}</p>
