import { useEffect, useMemo, useState } from 'react'
import { RouteObject } from 'react-router-dom'
import { IUseCheckerMaker, RoutesWithPrivileges } from '../contracts'
import { filterRoutes, renderElementPrivilege } from '../utils'
import { usePrivileges } from '../context/Privilege.context'

type Type = (data: IUseCheckerMaker) => RouteObject[]

const useCheckerMaker: Type = ({
  routes: orgRoutes,
  userPrivileges: orgUserPrivileges,
  elementPrivileges,
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
  }, [pathname])

  useEffect(() => {
    setFRoutes(filterRoutes(orgRoutes, userPrivileges || ''))

    setStore({
      routes: orgRoutes,
      userPrivileges: userPrivileges,
      elementPrivileges,
    })
  }, [orgUserPrivileges])

  return routes
}

export default useCheckerMaker
