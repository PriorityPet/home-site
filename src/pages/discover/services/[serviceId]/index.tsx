import Layout from "@/presentation/components/core/Layout"
import ServicesProvider from "@/presentation/components/services/context/ServicesContext"
import Main from "@/presentation/components/services/service/Main"

function Index() {
    return (
        <Layout title="Servicio">
            <ServicesProvider>
                <Main/>
            </ServicesProvider>
        </Layout>
    )
}

export default Index