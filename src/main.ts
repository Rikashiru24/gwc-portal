import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import { renderRoute } from './app/router'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

renderRoute(app, window.location.pathname)
