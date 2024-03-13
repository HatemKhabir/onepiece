<script>
  import { onMount } from "svelte";

  let characters = [];
  let count = 10;
  onMount(async () => {
    characters = await fetch("/api/characters")
      .then((res) => res.json())
      .then((res) => (characters = res));
    console.log(characters);
  });

  async function click() {
	let response = await fetch("/api/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(characters),
  });
	console.log(characters)
    if (response.ok) console.log("characters saved");
    else console.log("you are shit mate", response.statusText);
  }
  async function clickFetch() {
    let response = await fetch(
      `https://narutodb.xyz/api/character?page=1&limit=${count}`
    ).then((res) => res.json());
    console.log(response.characters);
    characters = [...characters, ...response.characters];
    count += 10;
  }
</script>

<main>
  <button on:click={() => clickFetch()}>Fetch More!</button>
  {#if characters.length > 0}
    {#each characters as character}
      <h2>{character.name}</h2>
      <img alt="naruto" src={character.images[0]} />
    {/each}
  {:else}
    <p>No characters available.</p>
  {/if}
  <button on:click={() => click()}>Save</button>
</main>

<style lang="scss">
</style>
