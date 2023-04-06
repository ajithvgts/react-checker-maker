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
  userPrivileges: UserPrivilegesType
  routes: RoutesWithPrivileges
  elementPrivileges?: ElementPrivilegeType
}
