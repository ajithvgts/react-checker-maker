import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { IUseCheckerMaker, RoutesWithPrivileges } from '../contracts'
import { filterRoutes, renderElementPrivilege } from '../utils'

const initialValue = {
  pathname: '',
  store: {},
  setStore: () => '',
  reRenderELPrivilege: () => '',
  fRoutes: [],
  setFRoutes: () => '',
  reFilterRoutes: () => '',
}

type PrivilegeContextType = {
  pathname: string
  store: Partial<IUseCheckerMaker>
  setStore: Dispatch<SetStateAction<Record<any, any>>>
  reRenderELPrivilege: () => void
  fRoutes: RoutesWithPrivileges
  setFRoutes: React.Dispatch<React.SetStateAction<RoutesWithPrivileges>>
  reFilterRoutes: () => void
}

const PrivilegeContext = createContext<PrivilegeContextType>(initialValue)

export const usePrivileges = () =>
  useContext<PrivilegeContextType>(PrivilegeContext)

const PrivilegeProvider: FC<PropsWithChildren & { pathname: string }> = ({
  children,
  pathname,
}) => {
  const [store, setStore] = useState<Partial<IUseCheckerMaker>>({})
  const [fRoutes, setFRoutes] = useState<RoutesWithPrivileges>([])

  const reRenderELPrivilege = () => {
    renderElementPrivilege(
      store.elementPrivileges || {},
      store.userPrivileges || ''
    )
  }

  const reFilterRoutes = () => {
    setFRoutes(filterRoutes(store.routes || [], store.userPrivileges || ''))
  }

  return (
    <PrivilegeContext.Provider
      value={{
        pathname,
        store,
        setStore,
        reRenderELPrivilege,
        fRoutes,
        setFRoutes,
        reFilterRoutes,
      }}
    >
      {children}
    </PrivilegeContext.Provider>
  )
}

export default PrivilegeProvider
