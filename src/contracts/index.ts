import { CSSProperties } from 'react'
import { RouteObject } from 'react-router-dom'

export type KeyType = string | number | Array<string | number>

export interface ElementPrivilegeObject {
  key: KeyType
  removeEL?: boolean
  css?: CSSProperties
  elementProps?: Record<any, any>
}

export type ElementPrivilegeType = Record<
  PrivIdType,
  ElementPrivilegeObject | KeyType
>

export type RoutesWithPrivilegesObject = RouteObject & { privileges?: KeyType }

export type RoutesWithPrivileges = Array<RoutesWithPrivilegesObject>

export type UserPrivilegesType = Array<number | string>

export type PrivIdType = `#${string}`

export interface IUseCheckerMaker {
  userPrivileges: KeyType
  routes: RoutesWithPrivileges
  elementPrivileges?: ElementPrivilegeType
  dependencies?: []
}

export interface IPrivilege {
  id: number
  name: string
  code: number
  description: string
  permissions: {
    id: number
    name: string
    code: number
    description: string
  }[]
}

export interface IRoles {
  id: number
  name: string
  code: number
  description: string
  allowed_privileges: Array<number>
}

export interface IData {
  privileges: Array<IPrivilege> | undefined
  roles: Array<IRoles>
}

export interface ICheckerMaker {
  data: IData
  handleUpdate: (
    role: number | null,
    allowed_privileges: number[] | undefined
  ) => void
  handleCreate?: () => void
}
