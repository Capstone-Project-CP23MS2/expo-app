import { createStore } from 'zustand-x'

const loginEmailUser = createStore('loginEmailUser')({
  email: '',
})

export default loginEmailUser
