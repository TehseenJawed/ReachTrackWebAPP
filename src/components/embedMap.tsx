import React from 'react'

interface EmbedMapProps {
    longitude: string,
    latitude: string
}
const EmbedMap = (props: EmbedMapProps) => {
    const { longitude, latitude } = props
    return (
        <div className='embed-container'>
            <div dangerouslySetInnerHTML={{ __html: `<iframe src=${"https://maps.google.com/maps?q="+latitude+","+longitude+"&hl=es&z=14&amp;output=embed"} width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>` }} />
        </div>
    )
}

export default EmbedMap