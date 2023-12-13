import Main from "@/presentation/components/localities/Main";
import Layout from "@/presentation/components/core/Layout";
import LocalitiesProvider from "@/presentation/components/localities/context/LocalitiesContext";

function Home() {
  return (
    <Layout title="Centros médicos">
      <LocalitiesProvider>
        <Main/>
      </LocalitiesProvider>
    </Layout>
  )
}

export default Home