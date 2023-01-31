<script>
    import { onMount } from 'svelte'
  
    let posts = []
  
    onMount(() => {
      fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(result => posts = result)
    })
  </script>
  
  {#each posts as post (post.id)}
    <h2>({post.id}) {post.userName}</h2>
    <p>{post.email}</p>
    <hr>
  {:else}
    <h2>Loading...</h2>
  {/each}