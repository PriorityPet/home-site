import Main from "@/presentation/components/services/Main";
import Layout from "@/presentation/components/core/Layout";
import ServicesProvider from "@/presentation/components/services/context/ServicesContext";

function Index() {
  return (
    <Layout title="Servicios">
      <ServicesProvider>
        <Main/>
      </ServicesProvider>
    </Layout>
  )
}

export default Index