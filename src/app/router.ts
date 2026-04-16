import { renderLoginPage } from '../pages/login/loginPage'
import { renderNotFoundPage } from '../pages/not-found/notFoundPage'
import { ROUTES } from './routes'

export function renderRoute(app: HTMLDivElement, pathname: string): void {
  if (pathname === ROUTES.LOGIN) {
    app.innerHTML = renderLoginPage()
    return
  }

  app.innerHTML = renderNotFoundPage()
}
