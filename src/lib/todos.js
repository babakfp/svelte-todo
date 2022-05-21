import { browser } from '$app/env'
import { writable } from 'svelte/store'

export const todos = writable(browser && JSON.parse(localStorage.getItem('todos')) || [
  {
    id: 1,
    content: 'Buy milk',
    isDone: true,
  },
  {
    id: 2,
    content: 'Code',
    isDone: false,
  },
  {
    id: 3,
    content: 'Die',
    isDone: false,
  },
])

todos.subscribe(value => {
  browser && localStorage.setItem('todos', JSON.stringify(value))
})
