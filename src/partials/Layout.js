import { Header, Footer } from './index';

const Layout = ({ children = null }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 p-4 sm:p-8">
      <div className="w-full xl:max-w-screen-xl mx-auto">{children}</div>
    </main>
    <Footer />
  </div>
);

export default Layout;
