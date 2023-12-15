import Main from "@/presentation/components/specialists/Main";
import Layout from "@/presentation/components/core/Layout";
import SpecialistsProvider from "@/presentation/components/specialists/context/SpecialistsContext";

function Index() {
  return (
    <Layout title="Especialistas">
      <SpecialistsProvider>
        <Main/>
      </SpecialistsProvider>
    </Layout>
  )
}

export default Index