import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  {
    path: '/',
    exact: true,
    label: 'Cryptocurrencies',
  },
  {
    path: '/watchlist',
    exact: true,
    label: 'Watchlist',
  },
];

const Header = () => (
  <header className="py-4 px-4 sm:px-8 border-b bg-white">
    <div className="container lg:max-w-screen-2xl mx-auto flex items-center space-x-12">
      {/* Logo */}
      <Link to="/">
        <img
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          alt="AlterClass"
          className="h-8"
        />
      </Link>

      {/* Navigation links */}
      <nav className="space-x-8">
        {navLinks.map(link => (
          <NavLink
            key={link.label}
            exact={link.exact}
            to={link.path}
            className="font-medium hover:text-blue-600"
            activeClassName="text-blue-600 font-semibold"
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
