import Products from '../components/Products'
import Register from '../components/Register'
import Login from '../components/Login'

const routes = [
  { path: '/',         name: 'products', component: Products },
  { path: '/register', name: 'register', component: Register },
  { path: '/login',    name: 'login', component: Login },
]

export default routes