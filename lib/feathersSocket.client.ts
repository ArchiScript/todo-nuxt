
import { feathers } from '@feathersjs/feathers'
import { io } from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
import type { Todo, CreateTodo, PatchTodo } from '~/types/todo'
import type { ServiceMethods } from '~/types/feathersService'

const apiUrl = 'https://feathers-backend-59yw.onrender.com'

const socket = io(apiUrl, {
  transports: ['websocket'],
  autoConnect: true
})

export const api = feathers().configure(socketio(socket))

export const todosSocketService = api.service('todos') as ServiceMethods<Todo, CreateTodo, PatchTodo>
