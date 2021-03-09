export { default as BottomMenu } from '../../components/BottomMenu.vue'
export { default as UserFormEmail } from '../../components/user/userFormEmail.vue'
export { default as UserFormName } from '../../components/user/userFormName.vue'
export { default as UserFormPassword } from '../../components/user/userFormPassword.vue'

export const LazyBottomMenu = import('../../components/BottomMenu.vue' /* webpackChunkName: "components/BottomMenu" */).then(c => c.default || c)
export const LazyUserFormEmail = import('../../components/user/userFormEmail.vue' /* webpackChunkName: "components/user/userFormEmail" */).then(c => c.default || c)
export const LazyUserFormName = import('../../components/user/userFormName.vue' /* webpackChunkName: "components/user/userFormName" */).then(c => c.default || c)
export const LazyUserFormPassword = import('../../components/user/userFormPassword.vue' /* webpackChunkName: "components/user/userFormPassword" */).then(c => c.default || c)
