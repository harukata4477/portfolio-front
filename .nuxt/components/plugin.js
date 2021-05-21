import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  BottomMenu: () => import('../../components/BottomMenu.vue' /* webpackChunkName: "components/bottom-menu" */).then(c => wrapFunctional(c.default || c)),
  Mindmap: () => import('../../components/Mindmap.vue' /* webpackChunkName: "components/mindmap" */).then(c => wrapFunctional(c.default || c)),
  Calendars: () => import('../../components/calendars/Calendars.vue' /* webpackChunkName: "components/calendars" */).then(c => wrapFunctional(c.default || c)),
  ContentsFormNewContent: () => import('../../components/contents/contentsFormNewContent.vue' /* webpackChunkName: "components/contents-form-new-content" */).then(c => wrapFunctional(c.default || c)),
  MessagesForm: () => import('../../components/messages/MessagesForm.vue' /* webpackChunkName: "components/messages-form" */).then(c => wrapFunctional(c.default || c)),
  Notifications: () => import('../../components/notifications/Notifications.vue' /* webpackChunkName: "components/notifications" */).then(c => wrapFunctional(c.default || c)),
  PostsEdit: () => import('../../components/posts/PostsEdit.vue' /* webpackChunkName: "components/posts-edit" */).then(c => wrapFunctional(c.default || c)),
  PostsFormSelect: () => import('../../components/posts/PostsFormSelect.vue' /* webpackChunkName: "components/posts-form-select" */).then(c => wrapFunctional(c.default || c)),
  PostsFormTagList: () => import('../../components/posts/PostsFormTagList.vue' /* webpackChunkName: "components/posts-form-tag-list" */).then(c => wrapFunctional(c.default || c)),
  PostsFormTitle: () => import('../../components/posts/PostsFormTitle.vue' /* webpackChunkName: "components/posts-form-title" */).then(c => wrapFunctional(c.default || c)),
  PostsModal: () => import('../../components/posts/PostsModal.vue' /* webpackChunkName: "components/posts-modal" */).then(c => wrapFunctional(c.default || c)),
  RoomsRoomEditForm: () => import('../../components/rooms/RoomEditForm.vue' /* webpackChunkName: "components/rooms-room-edit-form" */).then(c => wrapFunctional(c.default || c)),
  RoomsCard: () => import('../../components/rooms/RoomsCard.vue' /* webpackChunkName: "components/rooms-card" */).then(c => wrapFunctional(c.default || c)),
  RoomsDetailForm: () => import('../../components/rooms/RoomsDetailForm.vue' /* webpackChunkName: "components/rooms-detail-form" */).then(c => wrapFunctional(c.default || c)),
  RoomsFormDeadlineDate: () => import('../../components/rooms/RoomsFormDeadlineDate.vue' /* webpackChunkName: "components/rooms-form-deadline-date" */).then(c => wrapFunctional(c.default || c)),
  RoomsFormDeadlineTime: () => import('../../components/rooms/RoomsFormDeadlineTime.vue' /* webpackChunkName: "components/rooms-form-deadline-time" */).then(c => wrapFunctional(c.default || c)),
  RoomsFormTitle: () => import('../../components/rooms/RoomsFormTitle.vue' /* webpackChunkName: "components/rooms-form-title" */).then(c => wrapFunctional(c.default || c)),
  UserFormEmail: () => import('../../components/user/userFormEmail.vue' /* webpackChunkName: "components/user-form-email" */).then(c => wrapFunctional(c.default || c)),
  UserFormPassword: () => import('../../components/user/userFormPassword.vue' /* webpackChunkName: "components/user-form-password" */).then(c => wrapFunctional(c.default || c)),
  UsersCard: () => import('../../components/users/UsersCard.vue' /* webpackChunkName: "components/users-card" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
