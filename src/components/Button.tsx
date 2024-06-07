import React from 'react'
import { Button as MUIButton} from '@mui/material'

const Button = ({ onClick, style, btnClassName, txtClassName }) => {
    return (
        <MUIButton onClick={onClick} style={style} size="large" className={`${btnClassName}`}>
            <span className={`${txtClassName}`}>Download</span>
        </MUIButton>
    )
}

export default Button
