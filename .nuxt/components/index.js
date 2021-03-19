export { default as BottomMenu } from '../../components/BottomMenu.vue'
export { default as Header } from '../../components/Header.vue'
export { default as ContentsFormNewContent } from '../../components/contents/contentsFormNewContent.vue'
export { default as RoomEditForm } from '../../components/rooms/RoomEditForm.vue'
export { default as RoomsCard } from '../../components/rooms/RoomsCard.vue'
export { default as RoomsDetailForm } from '../../components/rooms/RoomsDetailForm.vue'
export { default as RoomsFormDeadlineDate } from '../../components/rooms/RoomsFormDeadlineDate.vue'
export { default as RoomsFormDeadlineTime } from '../../components/rooms/RoomsFormDeadlineTime.vue'
export { default as RoomsFormTitle } from '../../components/rooms/RoomsFormTitle.vue'
export { default as UserFormEmail } from '../../components/user/userFormEmail.vue'
export { default as UserFormPassword } from '../../components/user/userFormPassword.vue'
export { default as UsersCard } from '../../components/users/UsersCard.vue'

export const LazyBottomMenu = import('../../components/BottomMenu.vue' /* webpackChunkName: "components/BottomMenu" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/Header" */).then(c => c.default || c)
export const LazyContentsFormNewContent = import('../../components/contents/contentsFormNewContent.vue' /* webpackChunkName: "components/contents/contentsFormNewContent" */).then(c => c.default || c)
export const LazyRoomEditForm = import('../../components/rooms/RoomEditForm.vue' /* webpackChunkName: "components/rooms/RoomEditForm" */).then(c => c.default || c)
export const LazyRoomsCard = import('../../components/rooms/RoomsCard.vue' /* webpackChunkName: "components/rooms/RoomsCard" */).then(c => c.default || c)
export const LazyRoomsDetailForm = import('../../components/rooms/RoomsDetailForm.vue' /* webpackChunkName: "components/rooms/RoomsDetailForm" */).then(c => c.default || c)
export const LazyRoomsFormDeadlineDate = import('../../components/rooms/RoomsFormDeadlineDate.vue' /* webpackChunkName: "components/rooms/RoomsFormDeadlineDate" */).then(c => c.default || c)
export const LazyRoomsFormDeadlineTime = import('../../components/rooms/RoomsFormDeadlineTime.vue' /* webpackChunkName: "components/rooms/RoomsFormDeadlineTime" */).then(c => c.default || c)
export const LazyRoomsFormTitle = import('../../components/rooms/RoomsFormTitle.vue' /* webpackChunkName: "components/rooms/RoomsFormTitle" */).then(c => c.default || c)
export const LazyUserFormEmail = import('../../components/user/userFormEmail.vue' /* webpackChunkName: "components/user/userFormEmail" */).then(c => c.default || c)
export const LazyUserFormPassword = import('../../components/user/userFormPassword.vue' /* webpackChunkName: "components/user/userFormPassword" */).then(c => c.default || c)
export const LazyUsersCard = import('../../components/users/UsersCard.vue' /* webpackChunkName: "components/users/UsersCard" */).then(c => c.default || c)
