import Main from '@/presentation/components/allies/Main'
import LayoutAllies from '@/presentation/components/core/LayoutAllies'
import React from 'react'

function index() {
  return (
    <LayoutAllies activeLink="platform" title='Alquila en nuestras sucursales médicas'>
        <Main/>
    </LayoutAllies>
  )
}

export default index