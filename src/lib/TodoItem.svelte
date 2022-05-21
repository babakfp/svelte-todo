<script>
  import { todos } from '$lib/todos.js'
  import OutClick from 'svelte-outclick'

  export let id
  export let content
  export let isDone
  
  let isInEditState = false
  let isInRemoveState = false
  let errorText = ''
  let bindedContent = content

  const onFieldValueChange =_=> {
    if (content.length >= 3) {
      errorText = ''
    }
  }

  const markTodoAsDone =_=> {
    $todos = $todos.map(todo => {
      if (todo.id === id) {
        todo.isDone = true
      }
      return todo
    })
  }

  const undoTodo =_=> {
    $todos = $todos.map(todo => {
      if (todo.id === id) {
        todo.isDone = false
      }
      return todo
    })
  }

  const tryEditTodo =_=> {
    isInEditState = true
  }

  const DiscardTodoContentchanges =_=> {
    isInEditState = false
    bindedContent = content
  }

  const confirmTodoEdit =_=> {
    if (content.length < 3) {
      errorText = 'At least 3 letters are required!'
      return
    } else {
      errorText = ''
    }
    
    $todos = $todos.map(todo => {
      if (todo.id === id) {
        todo.content = bindedContent
      }
      return todo
    })

    isInEditState = false
  }

  const tryRemoveTodo =_=> {
    isInRemoveState = true
  }

  const confirmTodoRemoval =_=> {
    $todos = $todos.filter(todo => todo.id !== id)
  }

  const cancelTodoRemoval =_=> {
    isInRemoveState = false
  }
</script>

<li class="grid gap-2 mb-4 pb-4 border-b border-gray-800 last:mb-0 last:pb-0 last:border-0">
  
  {#if !isInEditState}
    <p class="{isDone ? 'line-through' : ''}">{content}</p>
  {:else}
    <form on:submit|preventDefault={confirmTodoEdit}>
      <input class="field" type="text" placeholder="Todo content..." bind:value={bindedContent} on:input={onFieldValueChange}>
      {#if errorText}
        <p class="mt-1 text-xs text-red-400">{errorText}</p>
      {/if}
    </form>
  {/if}
  
  <div class="flex gap-2">
    {#if !isDone && !isInEditState}
      <button class="btn btn-gray text-xs h-8 px-3" on:click={markTodoAsDone}>Done</button>
    {:else if !isInEditState}
      <button class="btn btn-gray text-xs h-8 px-3" on:click={undoTodo}>Undo</button>
    {/if}

    {#if !isInEditState && !isDone}
      <button class="btn btn-gray text-xs h-8 px-3" on:click={tryEditTodo}>Edit</button>
    {:else if !isDone}
      {#if content !== bindedContent}
        <button class="btn btn-gray text-xs h-8 px-3" on:click={confirmTodoEdit}>Save</button>
      {/if}
      <button class="btn btn-gray text-xs h-8 px-3" on:click={DiscardTodoContentchanges}>
        {#if content === bindedContent}
          Cansel
        {:else}
          Discard changes
        {/if}
      </button>
    {/if}

    {#if !isInRemoveState && !isInEditState}
      <button class="btn btn-gray text-xs h-8 px-3" on:click={tryRemoveTodo}>Remove</button>
    {:else if !isInEditState}
      <OutClick on:outclick={cancelTodoRemoval}>
        <button class="btn btn-gray text-xs h-8 px-3" on:click={confirmTodoRemoval}>Confirm removal</button>
      </OutClick>
    {/if}
  </div>
</li>
