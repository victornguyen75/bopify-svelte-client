<script>
  import { playerState } from "./stores";
  
  const getPlayerState = ({ detail }) => {
    playerState.set(detail.state)
  }

  document.addEventListener("login-success", getPlayerState);
</script>
