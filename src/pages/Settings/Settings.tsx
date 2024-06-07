import React, { useState } from 'react'
import DarkModeSetting from './innerComponents/darkModeSetting'

const Settings = () => {
    const [flag, setFlag] = useState(false)
    const darkMode = localStorage.getItem('dark')
    const changeDarkmode = () => {
        if (!!darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('dark');
            console.log('WORKING2222');
            setFlag(!flag)
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('dark', 'true');
            console.log('WORKING33333');
            setFlag(!flag)
        }
    }
    return (
        <div>
            <DarkModeSetting label={!!darkMode ? 'Dark mode active' : 'Light mode Active'} checked={!!darkMode} onChange={changeDarkmode} />
        </div>
    )
}

export default Settings