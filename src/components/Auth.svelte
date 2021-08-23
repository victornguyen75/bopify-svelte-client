<script>
  import { accessToken } from "./stores";
  
  const getTokensV2 = ({ detail }) => {
    accessToken.set(detail.token)
  }

  document.addEventListener("token", getTokensV2);
</script>
