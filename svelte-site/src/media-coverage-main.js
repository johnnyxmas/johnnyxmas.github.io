import { mount } from 'svelte'
import './app.css'
import MediaCoverage from './MediaCoverage.svelte'

const app = mount(MediaCoverage, {
  target: document.getElementById('app'),
})

export default app
