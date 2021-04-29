import logo from '../../image/logo.png';
import './App.css';
import TitleBar from '../../component/titlebar/TitleBar';

function Link_Word({message,link}){
  return (
    <a
    className="App-link"
    href={link}
    
  >
    {message}
  </a>
  )
}
/**
 * 
 * @param {string} message your error message
 * @returns error page
 */
function ErrorPage({message}) {
  if (!message){message = "This Place is Coming Soon";}
  return (
    <div className="App">
      <TitleBar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Customers! </p>
        <p>We want to tell that</p>
        <Link_Word message = {message} link = {'/'}/>
      </header>
    </div>
  );
}

export default ErrorPage;
