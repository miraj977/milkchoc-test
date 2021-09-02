import React from 'react'
import Head from 'next/head'

const Seo = ( { title, description, children } ) =>
{
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            {children}
        </>
    )
}

export default Seo
