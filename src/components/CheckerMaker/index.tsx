import React, { FC, useEffect, useState } from 'react'
import './style.scss'
import cn from 'classnames'
import PrivContent from './PrivContent'
import { IData } from '../../contracts'
import { ICheckerMaker } from '../../contracts'

const CheckerMaker: FC<ICheckerMaker> = ({
  handleUpdate,
  data = { privileges: [], roles: [] },
  handleCreate,
}) => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [rolesPriv, setRolesPriv] = useState<IData | null>(null)

  useEffect(() => {
    setRolesPriv(data)
    setSelectedRole(data?.roles[0]?.id)
  }, [data])

  return (
    <div className={'cm'}>
      <div className={'cm_head'}>
        <h2>Privilege Settings</h2>
        {!!handleCreate && (
          <button onClick={handleCreate} className={'btn cm_create_btn'}>
            Create Roles
          </button>
        )}
      </div>
      <div className={'cm_content'}>
        <div className={'cm_tab'}>
          {rolesPriv?.roles?.map((el) => (
            <div
              key={el.id}
              onClick={() => setSelectedRole(el.id)}
              className={cn('cm_tab_item', {
                ['selected']: el.id === selectedRole,
              })}
            >
              <span>{el.name}</span>
            </div>
          ))}
        </div>
        <PrivContent
          roleId={selectedRole}
          allowedPrivileges={
            rolesPriv?.roles?.find((f) => f.id === selectedRole)
              ?.allowed_privileges || []
          }
          setRolesPriv={setRolesPriv}
          data={rolesPriv?.privileges}
          roles={rolesPriv?.roles}
        />
        <div className={'cm_content_action'}>
          <button
            onClick={() =>
              handleUpdate(
                selectedRole,
                rolesPriv?.roles?.find((f) => f.id === selectedRole)
                  ?.allowed_privileges
              )
            }
            className={'btn'}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckerMaker
