<script>
  import Auth from "./components/Auth.svelte";
  import { accessToken } from "./stores";

  export let code = "";
</script>

<Auth {code}/>
<p>{$accessToken}</p>
<p>{code}</p>
