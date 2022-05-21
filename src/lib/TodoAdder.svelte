<script>
  import { todos } from '$lib/todos.js'
  
  export let value = ''
  export let errorText = ''

  const onValueChange =_=> {
    if (value.length >= 3) {
      errorText = ''
    }
  }

  const addNewTodo =_=> {
    if (value.length < 3) {
      errorText = 'At least 3 letters are required!'
      return
    } else {
      errorText = ''
    }

    $todos = [
      {
        id: $todos.length + 1,
        content: value,
        isDone: false,
      },
      ...$todos,
    ]

    value = ''
  }
</script>

<form on:submit|preventDefault={addNewTodo}>

  <div class="flex gap-4">
    <input class="field" type="text" placeholder="Todo content..." bind:value={value} on:input={onValueChange}>
    <button class="btn btn-accent">Submit</button>
  </div>

  {#if errorText}
    <p class="mt-1 text-xs text-red-400">{errorText}</p>
  {/if}

</form>
