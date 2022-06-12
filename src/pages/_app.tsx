import Layout from '../components/Layout';
import RouterLoading from '../components/RouterLoading';
import { LayoutMenuProvider } from '../contexts/layout-menu';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <RouterLoading>
      <LayoutMenuProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutMenuProvider>
    </RouterLoading>
  );
}

export default App;
