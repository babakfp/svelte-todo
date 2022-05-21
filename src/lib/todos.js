import { browser } from '$app/env'
import { writable } from 'svelte/store'

export const todos = writable(browser && JSON.parse(localStorage.getItem('todos')) || [
  {
    id: 1,
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit sequi animi.',
    isDone: false,
  },
  {
    id: 2,
    content: 'Lorem ipsum dolor sit sequi animi.',
    isDone: false,
  },
  {
    id: 3,
    content: 'Lorem, ipsum dolor amet consectetur adipisicing elit.',
    isDone: true,
  },
])

todos.subscribe(value => {
  browser && localStorage.setItem('todos', JSON.stringify(value))
})
