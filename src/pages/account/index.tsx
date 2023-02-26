import Layout from '@/presentation/components/core/Layout'
import Main from '@/presentation/components/account/Main'
import React from 'react'
import AccountLayout from '@/presentation/components/account/AccountLayout'

function Index() {
  return (
    <Layout title='Mi cuenta'>
      <AccountLayout title='Mi cuenta' description='Actualiza los datos de tu cuenta si lo crees necesario'>
        <Main/>
      </AccountLayout>
    </Layout>
  )
}

export default Index