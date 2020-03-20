import Products from '../components/Products'
import Register from '../components/Register'
import Login from '../components/Login'

const routes = [
  { path: '/', component: Products },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

export default routes