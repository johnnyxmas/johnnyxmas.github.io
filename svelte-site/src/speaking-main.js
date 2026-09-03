import { mount } from 'svelte'
import './app.css'
import Speaking from './Speaking.svelte'

const app = mount(Speaking, {
  target: document.getElementById('app'),
})

export default app
