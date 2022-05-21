<script>
  // import { onMount } from 'svelte'
  // import { browser } from '$app/env'
  import { todos } from '$lib/todos.js'
  import TodoAdder from '$lib/TodoAdder.svelte'
  import TodoItem from '$lib/TodoItem.svelte'

  // // onMount(_=> {
  // if (browser) {
  //   console.log('Order 1')
  //   if (!!localStorage?.todos) {
  //     $todos = JSON.parse(localStorage.getItem('todos'))
  //   } else {
  //     localStorage.setItem('todos', JSON.stringify($todos))
  //   }
  // }
  // // })

  // $: {
  //   if (browser) {
  //     console.log('Order 2')
  //     localStorage.setItem('todos', JSON.stringify($todos))
  //     console.log(localStorage.getItem('todos'))
  //   }
  // }
</script>

<div class="container py-12">

  <TodoAdder/>

  {#if $todos.length > 0}
    <ul class="mt-12">
      {#each $todos as todo (todo.id) }
        <TodoItem {...todo}/>
      {/each}
    </ul>
  {:else}
    <p class="mt-8">No todo found!</p>
  {/if}
  
</div>
