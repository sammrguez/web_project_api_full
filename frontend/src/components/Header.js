import logo from '../images/logo-vector.svg';

function Header({ children }) {
  return (
    <section className='header'>
      <img className='header__logo' src={logo} alt='logo del proyecto' />
      <div className='header__subheaders-container'>{children}</div>
    </section>
  );
}
export default Header;
