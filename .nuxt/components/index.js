import { wrapFunctional } from './utils'

export { default as BottomMenu } from '../../components/BottomMenu.vue'
export { default as Mindmap } from '../../components/Mindmap.vue'
export { default as Calendars } from '../../components/calendars/Calendars.vue'
export { default as ContentsFormNewContent } from '../../components/contents/contentsFormNewContent.vue'
export { default as MessagesForm } from '../../components/messages/MessagesForm.vue'
export { default as Notifications } from '../../components/notifications/Notifications.vue'
export { default as PostsEdit } from '../../components/posts/PostsEdit.vue'
export { default as PostsFormSelect } from '../../components/posts/PostsFormSelect.vue'
export { default as PostsFormTagList } from '../../components/posts/PostsFormTagList.vue'
export { default as PostsFormTitle } from '../../components/posts/PostsFormTitle.vue'
export { default as PostsModal } from '../../components/posts/PostsModal.vue'
export { default as RoomsRoomEditForm } from '../../components/rooms/RoomEditForm.vue'
export { default as RoomsCard } from '../../components/rooms/RoomsCard.vue'
export { default as RoomsDetailForm } from '../../components/rooms/RoomsDetailForm.vue'
export { default as RoomsFormDeadlineDate } from '../../components/rooms/RoomsFormDeadlineDate.vue'
export { default as RoomsFormDeadlineTime } from '../../components/rooms/RoomsFormDeadlineTime.vue'
export { default as RoomsFormTitle } from '../../components/rooms/RoomsFormTitle.vue'
export { default as UserFormEmail } from '../../components/user/userFormEmail.vue'
export { default as UserFormPassword } from '../../components/user/userFormPassword.vue'
export { default as UsersCard } from '../../components/users/UsersCard.vue'

export const LazyBottomMenu = import('../../components/BottomMenu.vue' /* webpackChunkName: "components/bottom-menu" */).then(c => wrapFunctional(c.default || c))
export const LazyMindmap = import('../../components/Mindmap.vue' /* webpackChunkName: "components/mindmap" */).then(c => wrapFunctional(c.default || c))
export const LazyCalendars = import('../../components/calendars/Calendars.vue' /* webpackChunkName: "components/calendars" */).then(c => wrapFunctional(c.default || c))
export const LazyContentsFormNewContent = import('../../components/contents/contentsFormNewContent.vue' /* webpackChunkName: "components/contents-form-new-content" */).then(c => wrapFunctional(c.default || c))
export const LazyMessagesForm = import('../../components/messages/MessagesForm.vue' /* webpackChunkName: "components/messages-form" */).then(c => wrapFunctional(c.default || c))
export const LazyNotifications = import('../../components/notifications/Notifications.vue' /* webpackChunkName: "components/notifications" */).then(c => wrapFunctional(c.default || c))
export const LazyPostsEdit = import('../../components/posts/PostsEdit.vue' /* webpackChunkName: "components/posts-edit" */).then(c => wrapFunctional(c.default || c))
export const LazyPostsFormSelect = import('../../components/posts/PostsFormSelect.vue' /* webpackChunkName: "components/posts-form-select" */).then(c => wrapFunctional(c.default || c))
export const LazyPostsFormTagList = import('../../components/posts/PostsFormTagList.vue' /* webpackChunkName: "components/posts-form-tag-list" */).then(c => wrapFunctional(c.default || c))
export const LazyPostsFormTitle = import('../../components/posts/PostsFormTitle.vue' /* webpackChunkName: "components/posts-form-title" */).then(c => wrapFunctional(c.default || c))
export const LazyPostsModal = import('../../components/posts/PostsModal.vue' /* webpackChunkName: "components/posts-modal" */).then(c => wrapFunctional(c.default || c))
export const LazyRoomsRoomEditForm = import('../../components/rooms/RoomEditForm.vue' /* webpackChunkName: "components/rooms-room-edit-form" */).then(c => wrapFunctional(c.default || c))
export const LazyRoomsCard = import('../../components/rooms/RoomsCard.vue' /* webpackChunkName: "components/rooms-card" */).then(c => wrapFunctional(c.default || c))
export const LazyRoomsDetailForm = import('../../components/rooms/RoomsDetailForm.vue' /* webpackChunkName: "components/rooms-detail-form" */).then(c => wrapFunctional(c.default || c))
export const LazyRoomsFormDeadlineDate = import('../../components/rooms/RoomsFormDeadlineDate.vue' /* webpackChunkName: "components/rooms-form-deadline-date" */).then(c => wrapFunctional(c.default || c))
export const LazyRoomsFormDeadlineTime = import('../../components/rooms/RoomsFormDeadlineTime.vue' /* webpackChunkName: "components/rooms-form-deadline-time" */).then(c => wrapFunctional(c.default || c))
export const LazyRoomsFormTitle = import('../../components/rooms/RoomsFormTitle.vue' /* webpackChunkName: "components/rooms-form-title" */).then(c => wrapFunctional(c.default || c))
export const LazyUserFormEmail = import('../../components/user/userFormEmail.vue' /* webpackChunkName: "components/user-form-email" */).then(c => wrapFunctional(c.default || c))
export const LazyUserFormPassword = import('../../components/user/userFormPassword.vue' /* webpackChunkName: "components/user-form-password" */).then(c => wrapFunctional(c.default || c))
export const LazyUsersCard = import('../../components/users/UsersCard.vue' /* webpackChunkName: "components/users-card" */).then(c => wrapFunctional(c.default || c))
