import { NavLink } from 'react-router-dom';
import { Logo } from 'components';

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
    <div className="w-full xl:max-w-screen-2xl mx-auto flex items-center space-x-12">
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Navigation links */}
      <nav className="hidden sm:block space-x-8">
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
