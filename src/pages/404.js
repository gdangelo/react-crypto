import { Link } from 'react-router-dom';
import { Layout } from 'partials';

const NotFound = () => (
  <Layout>
    <div className="space-y-6 text-center">
      <h1 className="text-3xl sm:text-6xl capitalize">404 - Page not found</h1>
      <p className="text-xl">We can't find the page you are looking for.</p>
    </div>
    <Link
      to="/"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg sm:text-xl focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap flex items-center space-x-2 max-w-max mx-auto mt-12"
    >
      Go back home
    </Link>
  </Layout>
);

export default NotFound;
