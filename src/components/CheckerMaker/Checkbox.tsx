import React, { FC } from 'react'
import './style.scss'
import cn from 'classnames'

const Checkbox: FC<{
  type?: 'check' | 'box'
  checked: boolean
  handleChange?: (id: string | number, checked: boolean) => void
  id: string | number
}> = ({ type = 'check', checked, handleChange, id }) => {
  return (
    <div onClick={() => handleChange && handleChange(id, !checked)}>
      {type === 'check' && (
        <div className={cn('cb', { selected: checked })}>
          {checked && (
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ1IiBoZWlnaHQ9IjQwMiIgdmlld0JveD0iMCAwIDU0NSA0MDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00Mi4wNTQyIDIxNy4yOUwxODQuNTI3IDM1OS43NTdMNTAyLjYxNyA0MS42NjY3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgzLjMzMzMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
              alt="tick"
            />
          )}
        </div>
      )}
      {type === 'box' && (
        <div className={cn('cb', { ['selected']: checked })}>
          {!checked && <div className={'cb_i_box'}></div>}
          {checked && (
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ1IiBoZWlnaHQ9IjQwMiIgdmlld0JveD0iMCAwIDU0NSA0MDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00Mi4wNTQyIDIxNy4yOUwxODQuNTI3IDM1OS43NTdMNTAyLjYxNyA0MS42NjY3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgzLjMzMzMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
              alt="tick"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Checkbox
