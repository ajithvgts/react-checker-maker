import React, { FC } from 'react'
import './style.scss'
import Checkbox from './Checkbox'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { IPrivilege, IData, IRoles } from '../../contracts'

const PrivContent: FC<{
  data: Array<IPrivilege> | undefined
  allowedPrivileges: number[]
  setRolesPriv?: React.Dispatch<React.SetStateAction<IData | null>>
  roleId?: number | null
  roles?: IRoles[] | undefined
  handChildChange?: (id: number, checked: boolean) => void
  handChange?: (id: number, checked: boolean, child: number[]) => void
}> = ({
  data,
  allowedPrivileges,
  setRolesPriv,
  roleId,
  roles,
  handChildChange,
  handChange,
}) => {
  //

  const handleChange = (
    id: number | string,
    checked: boolean,
    childIdList: number[]
  ) => {
    const updatedRole = [...(roles || [])]
    const curRole = roles?.findIndex((f) => f.id === roleId)

    if (curRole !== undefined && curRole !== -1) {
      if (!checked) {
        updatedRole[curRole].allowed_privileges = allowedPrivileges?.filter(
          (ff) => !childIdList.includes(ff)
        )
      } else {
        updatedRole[curRole].allowed_privileges = [
          ...allowedPrivileges,
          ...childIdList,
        ]
      }
    }

    setRolesPriv && setRolesPriv({ privileges: data, roles: updatedRole })
  }

  const handleChildChange = (id: number | string, checked: boolean) => {
    const updatedRole = [...(roles || [])]
    const curRole = roles?.findIndex((f) => f.id === roleId)

    if (curRole !== undefined && curRole !== -1) {
      if (!checked) {
        updatedRole[curRole].allowed_privileges = allowedPrivileges?.filter(
          (ff) => ff !== id
        )
      } else {
        updatedRole[curRole].allowed_privileges = [
          ...allowedPrivileges,
          Number(id),
        ]
      }
    }

    setRolesPriv && setRolesPriv({ privileges: data, roles: updatedRole })
  }

  const permissionIdList: Record<number, number[]> | undefined = data?.reduce(
    (acc, val) => {
      return { ...acc, [val.id]: val.permissions.map((el) => el.id) }
    },
    {}
  )

  return (
    <>
      <div className={'cm_tab_content'}>
        {data?.map((el) => (
          <div key={el.id} className={'cm_tc_item'}>
            <div className={'cm_tc_item_h'}>
              <Checkbox
                handleChange={(id, checked) => {
                  handChange
                    ? handChange(
                        Number(id),
                        checked,
                        el.permissions.map((elll) => elll.id)
                      )
                    : handleChange(
                        id,
                        checked,
                        el.permissions.map((elll) => elll.id)
                      )
                }}
                id={el.id}
                type="box"
                checked={
                  !!permissionIdList?.[el.id]?.every((e) =>
                    allowedPrivileges?.includes(e)
                  )
                }
              />
              <div>
                <h3>{el.name}</h3>
                {!!el.description && <span>{el.description}</span>}
              </div>
            </div>
            <hr />
            {el.permissions.map((ell) => (
              <div key={ell.id} className={'cm_tc_item_c'}>
                <Checkbox
                  handleChange={(id, checked) => {
                    handChildChange
                      ? handChildChange(Number(id), checked)
                      : handleChildChange(id, checked)
                  }}
                  id={ell.id}
                  type="check"
                  checked={allowedPrivileges?.includes(ell.id)}
                />
                <span>
                  {ell.name}
                  {!!ell.description && (
                    <img
                      data-tooltip-id="tooltip"
                      data-tooltip-content={ell.description}
                      style={{ marginLeft: '4px' }}
                      width={12}
                      height={12}
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAyIiBoZWlnaHQ9IjcwMSIgdmlld0JveD0iMCAwIDcwMiA3MDEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zNTEgMEM0NDMuODMyIDAgNTMyLjg2MyAzNi44Nzc1IDU5OC41MDUgMTAyLjUyQzY2NC4xNDcgMTY4LjE2MiA3MDEuMDI1IDI1Ny4xOTMgNzAxLjAyNSAzNTAuMDI1QzcwMS4wMjUgNDQyLjg1NyA2NjQuMTQ3IDUzMS44ODggNTk4LjUwNSA1OTcuNTNDNTMyLjg2MyA2NjMuMTczIDQ0My44MzIgNzAwLjA1IDM1MSA3MDAuMDVDMjU4LjE2OCA3MDAuMDUgMTY5LjEzNyA2NjMuMTczIDEwMy40OTUgNTk3LjUzQzM3Ljg1MjUgNTMxLjg4OCAwLjk3NDk3NiA0NDIuODU3IDAuOTc0OTc2IDM1MC4wMjVDMC45NzQ5NzYgMjU3LjE5MyAzNy44NTI1IDE2OC4xNjIgMTAzLjQ5NSAxMDIuNTJDMTY5LjEzNyAzNi44Nzc1IDI1OC4xNjggMCAzNTEgMFpNNDAzLjUgMjE0LjlDNDI5LjUgMjE0LjkgNDUwLjYgMTk2Ljg1IDQ1MC42IDE3MC4xQzQ1MC42IDE0My4zNSA0MjkuNDUgMTI1LjMgNDAzLjUgMTI1LjNDMzc3LjUgMTI1LjMgMzU2LjUgMTQzLjM1IDM1Ni41IDE3MC4xQzM1Ni41IDE5Ni44NSAzNzcuNSAyMTQuOSA0MDMuNSAyMTQuOVpNNDEyLjY1IDQ5Ni4yNUM0MTIuNjUgNDkwLjkgNDE0LjUgNDc3IDQxMy40NSA0NjkuMUwzNzIuMzUgNTE2LjRDMzYzLjg1IDUyNS4zNSAzNTMuMiA1MzEuNTUgMzQ4LjIgNTI5LjlDMzQ1LjkzMiA1MjkuMDY1IDM0NC4wMzYgNTI3LjQ0OCAzNDIuODUzIDUyNS4zNEMzNDEuNjcxIDUyMy4yMzIgMzQxLjI4IDUyMC43NzEgMzQxLjc1IDUxOC40TDQxMC4yNSAzMDJDNDE1Ljg1IDI3NC41NSA0MDAuNDUgMjQ5LjUgMzY3LjggMjQ2LjNDMzMzLjM1IDI0Ni4zIDI4Mi42NSAyODEuMjUgMjUxLjggMzI1LjZDMjUxLjggMzMwLjkgMjUwLjggMzQ0LjEgMjUxLjg1IDM1MkwyOTIuOSAzMDQuNjVDMzAxLjQgMjk1LjggMzExLjMgMjg5LjU1IDMxNi4zIDI5MS4yNUMzMTguNzYzIDI5Mi4xMzQgMzIwLjc4MiAyOTMuOTQ5IDMyMS45MjIgMjk2LjMwNUMzMjMuMDYzIDI5OC42NiAzMjMuMjM0IDMwMS4zNjkgMzIyLjQgMzAzLjg1TDI1NC41IDUxOS4yQzI0Ni42NSA1NDQuNCAyNjEuNSA1NjkuMSAyOTcuNSA1NzQuN0MzNTAuNSA1NzQuNyAzODEuOCA1NDAuNiA0MTIuNyA0OTYuMjVINDEyLjY1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg=="
                      alt="info"
                    />
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Tooltip id="tooltip" />
    </>
  )
}

export default PrivContent
