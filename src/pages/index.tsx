import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Button from '@/components/Button';

function Home() {
  return (
    <Layout>
      <Container className="mt-20">
        <h1 className="text-6xl font-black text-center text-slate-900 mb-6">
        PHẦN MỀM BÁO CÁO CHI HỘI
        </h1>
        
        <p className="text-center">
          <Button href="/contact">
            BẮT ĐẦU BÁO CÁO
          </Button>
        </p>
      </Container>
    </Layout>
  )
}

export default Home;
