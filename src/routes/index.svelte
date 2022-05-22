<script>
  import { browser } from '$app/env'
  import { todos } from '$lib/todos.js'
  import TodoAdder from '$lib/TodoAdder.svelte'
  import TodoItem from '$lib/TodoItem.svelte'

  // Something temporary for the localStorage content shift.
  let isLoadingUxDelay = false
  setTimeout(_=> isLoadingUxDelay = true, 200)
</script>

<div class="container py-12">

  <TodoAdder/>

  {#if browser && !!localStorage?.todos && isLoadingUxDelay}
    {#if $todos.length > 0}
      <ul class="mt-12">
        {#each $todos as todo (todo.id) }
          <TodoItem {...todo}/>
        {/each}
      </ul>
    {:else}
      <p class="mt-8">No todo found!</p>
    {/if}
  {:else}
    <p class="mt-12">Loading...</p>
    <ul class="mt-4 pointer-events-none">
      {#each [...Array(3).keys()] as _}
        <li class="grid gap-2 mb-4 pb-4 border-b border-gray-800 last:mb-0 last:pb-0 last:border-0">
          <div class="h-6 bg-gray-800 rounded animate-pulse"></div>
          <div class="flex gap-2">
            <button class="btn btn-gray text-xs h-8 w-16 animate-pulse"></button>
            <button class="btn btn-gray text-xs h-8 w-16 animate-pulse"></button>
            <button class="btn btn-gray text-xs h-8 w-16 animate-pulse"></button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  
</div>
