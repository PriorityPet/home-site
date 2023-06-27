import Layout from '@/presentation/components/core/Layout'
import Main from '@/presentation/components/account/Orders/Main'
import React from 'react'
import AccountLayout from '@/presentation/components/account/AccountLayout'

function Index() {
  return (
    <Layout title='Mis ordenes'>
      <AccountLayout title='Mis reservaciones' description='Todas las transacciones y compras que tengas en Prosit'>
        <Main/>
      </AccountLayout>
    </Layout>
  )
}

export default Index