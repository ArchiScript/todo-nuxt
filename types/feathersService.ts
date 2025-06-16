import type { Id, NullableId, Paginated, Params } from '@feathersjs/feathers'

export interface ServiceMethods<T, D = Partial<T>, P = Partial<T>> {
  find(params?: Params): Promise<Paginated<T>>
  get(id: Id, params?: Params): Promise<T>
  create(data: D, params?: Params): Promise<T>
  update(id: NullableId, data: T, params?: Params): Promise<T>
  patch(id: NullableId, data: P, params?: Params): Promise<T>
  remove(id: NullableId, params?: Params): Promise<T>
}