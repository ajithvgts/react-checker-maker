import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { IUseCheckerMaker } from '../contracts'
import { renderElementPrivilege } from '../utils'

const initialValue = {
  pathname: '',
  store: {},
  setStore: () => '',
  reRenderELPrivilege: () => '',
}

type PrivilegeContextType = {
  pathname: string
  store: Partial<IUseCheckerMaker>
  setStore: Dispatch<SetStateAction<Record<any, any>>>
  reRenderELPrivilege: () => void
}

const PrivilegeContext = createContext<PrivilegeContextType>(initialValue)

export const usePrivileges = () =>
  useContext<PrivilegeContextType>(PrivilegeContext)

const PrivilegeProvider: FC<PropsWithChildren & { pathname: string }> = ({
  children,
  pathname,
}) => {
  const [store, setStore] = useState<Partial<IUseCheckerMaker>>({})

  const reRenderELPrivilege = () => {
    renderElementPrivilege(
      store.elementPrivileges || {},
      store.userPrivileges || ''
    )
  }

  return (
    <PrivilegeContext.Provider
      value={{ pathname, store, setStore, reRenderELPrivilege }}
    >
      {children}
    </PrivilegeContext.Provider>
  )
}

export default PrivilegeProvider
