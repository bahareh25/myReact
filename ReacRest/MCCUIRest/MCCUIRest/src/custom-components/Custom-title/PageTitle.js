import React from 'react'
import { Helmet } from 'react-helmet'
export const PageTitle = ({title, Description}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name ="description" content={Description}/></Helmet>
    </div>
  )
}
