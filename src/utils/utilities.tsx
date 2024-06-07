const shorternText = (label) => {
    const labelArray = label.split(' ');
    if (labelArray?.length >= 2) {
        return `${labelArray[0]?.slice(0, 3)} ${labelArray[1]}`
    } else {
        return `${label?.slice(0,8)}${label?.length > 8 ? '...' : ''}`
    }
}

export {
    shorternText
}