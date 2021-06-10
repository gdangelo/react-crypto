import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/">
    <img
      src={`${process.env.PUBLIC_URL}/logo.svg`}
      alt="AlterClass"
      className="h-8 w-auto"
    />
  </Link>
);
export default Logo;
