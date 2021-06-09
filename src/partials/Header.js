import { Link } from 'react-router-dom';

const Header = () => (
  <header className="py-4 px-4 sm:px-8 border-b flex justify-between items-center bg-white">
    <div className="container mx-auto">
      <Link to="/">
        <img
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          alt="AlterClass"
          className="h-8"
        />
      </Link>
    </div>
  </header>
);

export default Header;
