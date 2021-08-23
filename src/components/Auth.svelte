<script>
  import { accessToken } from "./stores";
  
  const getTokensV2 = ({ detail }) => {
    accessToken.set(detail.token)
  }

  document.addEventListener("login-success", getTokensV2);
</script>
