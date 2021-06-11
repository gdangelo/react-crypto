import { NavLink } from 'react-router-dom';
import { Logo } from 'components';

const navLists = [
  {
    title: 'Company',
    links: [
      {
        label: 'About us',
        exact: true,
        path: '/about',
      },
      {
        label: 'Terms of use',
        exact: true,
        path: '/terms',
      },
      {
        label: 'Privacy Policy',
        exact: true,
        path: '/privacy-policy',
      },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact us', path: 'https://alterclass.io' },
      { label: 'FAQ', path: 'https://alterclass.io' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'Facebook', path: 'https://www.facebook.com/alterclass' },
      { label: 'Twitter', path: 'https://twitter.com/AlterClassIO' },
      {
        label: 'Youtube',
        path: 'https://www.youtube.com/channel/UCn858neTm5-bPjl6-wznR2g',
      },
      { label: 'Instagram', path: 'https://www.instagram.com/alterclass.io/' },
    ],
  },
];

const Footer = () => (
  <footer className="mt-20 py-6 px-4 sm:px-8">
    <div className="w-full xl:max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between space-y-12 md:space-y-0 md:space-x-16">
        <div className="space-y-4">
          <Logo />
          <p>Cryptocurrency Prices, Charts And Market Capitalizations</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-20">
          {navLists?.map(list => (
            <div key={list.title}>
              <p className="font-semibold uppercase mb-6">{list.title}</p>
              <ul className="space-y-3">
                {list?.links.map(link => (
                  <li key={link.label}>
                    {link.path.startsWith('/') ? (
                      <NavLink
                        to={link.path}
                        exact={link.exact}
                        className="font-medium text-gray-500 hover:text-blue-600"
                        activeClassName="text-blue-600 font-semibold"
                      >
                        {link.label}
                      </NavLink>
                    ) : (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-500 hover:text-blue-600"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-12 pt-8 text-sm leading-6 text-gray-500 text-center">
        © 2021 AlterClass. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
