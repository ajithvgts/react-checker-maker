import {
  ElementPrivilegeType,
  KeyType,
  RoutesWithPrivileges,
  UserPrivilegesType,
} from '../contracts'

const checkArrayPrivilege = (
  key: Array<string | number>,
  userPrivileges: UserPrivilegesType
): boolean => key.some((s) => userPrivileges.includes(String(s)))

const hasPrivilege = (
  key: KeyType,
  userPrivileges: UserPrivilegesType
): boolean => {
  if (typeof key === 'number' || typeof key === 'string') {
    return userPrivileges.includes(String(key))
  }

  if (Array.isArray(key)) {
    return checkArrayPrivilege(key, userPrivileges)
  }

  return true
}

const removeEL = (el: HTMLElement) => {
  el.remove()
}

export const filterRoutes = (
  routes: RoutesWithPrivileges,
  userPrivileges: UserPrivilegesType
): RoutesWithPrivileges =>
  routes.filter((f) => {
    if (!f.privileges) {
      return true
    }

    const privileges = [f.privileges].flat()
    if (!privileges.length) {
      return true
    }

    if (checkArrayPrivilege(privileges, userPrivileges)) {
      return true
    }

    return false
  })

export const renderElementPrivilege = (
  elementPrivileges: ElementPrivilegeType,
  userPrivileges: UserPrivilegesType
) => {
  document
    .querySelectorAll<HTMLElement>('[data-priv-id]')
    .forEach((el: any) => {
      const privId: any = el.getAttribute('data-priv-id')
      const privilege: any = elementPrivileges?.[privId]

      if (typeof privilege === 'string' || typeof privilege === 'number') {
        if (!hasPrivilege(privilege, userPrivileges)) {
          removeEL(el)
        }
      }

      if (typeof privilege === 'object') {
        if (!hasPrivilege(privilege.key, userPrivileges)) {
          if (privilege.removeEL !== false) {
            removeEL(el)
          }

          if (privilege.css) {
            for (const css in privilege.css) {
              el.style[css] = privilege.css[css]
            }
          }

          if (privilege.elementProps) {
            for (const prop in privilege.elementProps) {
              el[prop] = privilege.elementProps[prop]
            }
          }
        }
      }
    })
}
