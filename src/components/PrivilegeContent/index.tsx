import React, { FC } from 'react'
import PrivContent from '../CheckerMaker/PrivContent'
import { IPrivilege } from 'src/contracts'

const PrivilegeContent: FC<{
  privileges: IPrivilege[]
  allowedPrivileges: number[]
  handleGroupChange: () => void
  handleChange: () => void
}> = ({
  privileges,
  allowedPrivileges,
  handleChange = () => '',
  handleGroupChange = () => '',
}) => {
  return (
    <PrivContent
      handChange={handleChange}
      handChildChange={handleGroupChange}
      data={privileges}
      allowedPrivileges={allowedPrivileges}
    />
  )
}

export default PrivilegeContent
