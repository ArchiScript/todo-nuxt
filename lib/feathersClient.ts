import {feathers} from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import type { Todo,CreateTodo, PatchTodo } from '~/types/todo'
import type { ServiceMethods } from '~/types/feathersService'
import type {Service } from '@feathersjs/feathers'


const apiUrl = 'https://feathers-backend-59yw.onrender.com'

// Use REST transport
const restClient = rest(apiUrl)

export const api = feathers().configure(restClient.axios(axios))

export const todosService = api.service('todos') as ServiceMethods<Todo, CreateTodo, PatchTodo>