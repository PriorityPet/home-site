import Layout from '@/presentation/components/core/Layout'
import Main from '@/presentation/components/home/Main'
import HomeProvider from '@/presentation/components/home/context/HomeContext'
import React from 'react'

function Index() {
  return (
    <Layout title='Encuentra tu especialista ideal'>
      <HomeProvider>
        <Main/>
      </HomeProvider>
    </Layout>
  )
}

export default Index