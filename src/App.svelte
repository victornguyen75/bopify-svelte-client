<script>
  import { Container } from "sveltestrap";
	import "bootstrap/dist/css/bootstrap.min.css";

	import {
    Auth,
    Header,
    SearchBar,
    WebPlayback,
    GlobalStyles,
    theme,
    darkThemePlayer,
    lightThemePlayer,
  } from "./components/index";

  const CLIENT_ID = "e3c52dc073bb460cbabfabfdf10c4463"; // Public
	let loginCounter = 0;
</script>

<Auth />
<GlobalStyles background={$theme.background} color={$theme.color}>
  <Container class="d-flex flex-column py-2" style="height: 100vh">
      <Header />
      <SearchBar {loginCounter} clientId={CLIENT_ID} />
      <div on:click={() => loginCounter += 1}>
        <WebPlayback
          client_id={CLIENT_ID}
          theme={$theme.name === "light" ? lightThemePlayer : darkThemePlayer}
        />
      </div>
    </Container>
</GlobalStyles>
