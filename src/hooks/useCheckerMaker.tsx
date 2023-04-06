import { useEffect, useMemo, useState } from 'react'
import { RouteObject } from 'react-router-dom'
import { IUseCheckerMaker, RoutesWithPrivileges } from '../contracts'
import { useLocation } from 'react-router-dom'
import { filterRoutes, renderElementPrivilege } from '../utils'

type Type = (data: IUseCheckerMaker) => RouteObject[]

const useCheckerMaker: Type = ({
  routes: orgRoutes,
  userPrivileges: orgUserPrivileges,
  elementPrivileges,
}) => {
  const [fRoutes, setFRoutes] = useState<RoutesWithPrivileges>([])
  const { pathname } = useLocation()

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
  }, [])

  return routes
}

export default useCheckerMaker
