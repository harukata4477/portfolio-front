export { default as BottomMenu } from '../../components/BottomMenu.vue'
export { default as UserFormEmail } from '../../components/user/userFormEmail.vue'
export { default as UserFormPassword } from '../../components/user/userFormPassword.vue'
export { default as UsersCard } from '../../components/users/UsersCard.vue'

export const LazyBottomMenu = import('../../components/BottomMenu.vue' /* webpackChunkName: "components/BottomMenu" */).then(c => c.default || c)
export const LazyUserFormEmail = import('../../components/user/userFormEmail.vue' /* webpackChunkName: "components/user/userFormEmail" */).then(c => c.default || c)
export const LazyUserFormPassword = import('../../components/user/userFormPassword.vue' /* webpackChunkName: "components/user/userFormPassword" */).then(c => c.default || c)
export const LazyUsersCard = import('../../components/users/UsersCard.vue' /* webpackChunkName: "components/users/UsersCard" */).then(c => c.default || c)
