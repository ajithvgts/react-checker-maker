import { useEffect, useMemo } from 'react'
import { RouteObject } from 'react-router-dom'
import { IUseCheckerMaker } from '../contracts'
import { filterRoutes, renderElementPrivilege } from '../utils'
import { usePrivileges } from '../context/Privilege.context'

type Type = (data: IUseCheckerMaker) => RouteObject[]

const useCheckerMaker: Type = ({
  routes: orgRoutes,
  userPrivileges: orgUserPrivileges,
  elementPrivileges,
  dependencies = [],
}) => {
  const { setStore, pathname, fRoutes, setFRoutes } = usePrivileges()

  const routes = useMemo(
    () => (fRoutes.length ? fRoutes : orgRoutes),
    [orgRoutes, fRoutes]
  )

  const userPrivileges = useMemo(() => {
    if (
      typeof orgUserPrivileges === 'number' ||
      typeof orgUserPrivileges === 'string'
    ) {
      return String(orgUserPrivileges)
    }

    if (Array.isArray(orgUserPrivileges)) {
      return orgUserPrivileges.map((s) => String(s))
    }
  }, [orgUserPrivileges])

  useEffect(() => {
    if (elementPrivileges) {
      renderElementPrivilege(elementPrivileges, userPrivileges || '')
    }
  }, [pathname, ...dependencies])

  useEffect(() => {
    setFRoutes(filterRoutes(orgRoutes, userPrivileges || ''))

    setStore({
      routes: orgRoutes,
      userPrivileges: userPrivileges,
      elementPrivileges,
    })
  }, [orgUserPrivileges, ...dependencies])

  return routes
}

export default useCheckerMaker
