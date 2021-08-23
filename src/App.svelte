<script>
  import { Container } from "sveltestrap";
  import { WebPlayback } from 'svelte-spotify-web-playback';
	import "bootstrap/dist/css/bootstrap.min.css";

	import { SearchBar, Auth } from "./components/index";

  const CLIENT_ID = "e3c52dc073bb460cbabfabfdf10c4463"; // Public
	let counter = 0;

</script>

<style>
	:global(button) {
    width: 100%;
		padding: .5rem 1rem;
    font-size: 1.25rem !important;
    border-radius: .3rem !important;
		color: #fff;
    background-color: #198754;
    border-color: #198754;
		display: inline-block;
    font-weight: 400;
    line-height: 1.5 !important;
		text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer !important;
		user-select: none;
		border: 1px solid transparent;	
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	}

	:global(div.basic-player) {
		display: flex !important;
	}
	:global(div.right-slot) {
		width: 100% !important;
	}
	:global(div.track-info) {
		grid-template-rows: 20px 40px 30px !important;
	}
</style>

<Auth />
<Container class="d-flex flex-column py-2" style="height: 100vh">
	<SearchBar {counter} clientId={CLIENT_ID} />
  <div on:click={() => counter += 1}>
    <WebPlayback client_id={CLIENT_ID} />
  </div>
</Container>
