import {
  ElementPrivilegeType,
  KeyType,
  RoutesWithPrivileges,
} from '../contracts'

const checkArrayPrivilege = (
  key: Array<string | number>,
  userPrivileges: KeyType
): boolean => {
  if (
    typeof userPrivileges === 'number' ||
    typeof userPrivileges === 'string'
  ) {
    return String(userPrivileges) === String(key)
  }

  if (Array.isArray(userPrivileges)) {
    return key.some((s) => userPrivileges.includes(String(s)))
  }

  return true
}

const checkStringPrivilege = (
  key: string | number,
  userPrivileges: KeyType
): boolean => {
  if (
    typeof userPrivileges === 'number' ||
    typeof userPrivileges === 'string'
  ) {
    return String(userPrivileges) === String(key)
  }

  if (Array.isArray(userPrivileges)) {
    return userPrivileges.includes(String(key))
  }

  return true
}

const hasPrivilege = (key: KeyType, userPrivileges: KeyType): boolean => {
  if (typeof key === 'number' || typeof key === 'string') {
    return checkStringPrivilege(key, userPrivileges)
  }

  if (Array.isArray(key)) {
    return checkArrayPrivilege(key, userPrivileges)
  }

  return true
}

const removeEL = (el: HTMLElement) => {
  el.remove()
}

export function filterRoutes(
  routes: RoutesWithPrivileges,
  userPrivileges: KeyType
) {
  return routes.filter((f) => {
    const privileges = [f?.privileges || ''].flat()
    if (
      !f.privileges ||
      !privileges.length ||
      checkArrayPrivilege(privileges, userPrivileges)
    ) {
      if (f.children) {
        f.children = filterRoutes(f.children, userPrivileges)
      }
      return true
    }

    return false
  })
}

export const renderElementPrivilege = (
  elementPrivileges: ElementPrivilegeType,
  userPrivileges: KeyType
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
