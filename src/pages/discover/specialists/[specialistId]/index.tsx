import Layout from "@/presentation/components/core/Layout"
import SpecialistsProvider from "@/presentation/components/specialists/context/SpecialistsContext"
import Main from "@/presentation/components/specialists/specialist/Main"

function Index() {
    return (
        <Layout title="Especialista">
            <SpecialistsProvider>
                <Main/>
            </SpecialistsProvider>
        </Layout>
    )
}

export default Index