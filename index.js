import { renderComments } from './render.js'
import { initEventListeners } from './handlers.js'

const initApp = () => {
    renderComments()
    initEventListeners()
}

initApp()
