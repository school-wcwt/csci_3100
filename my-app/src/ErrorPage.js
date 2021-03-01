import logo from './image/logo.png';
import './App.css';
import TitleBar from './components/titlebar/TitleBar';




function Link_Word({message,link}){
  return (
    <a
    className="App-link"
    href={link}
    target="_blank"
    
  >
    {message}
  </a>
  )
}

function ErrorPage({message}) {
  if (!message){message = "This Place is Coming Soon";}
  return (
    <div className="App">
      <TitleBar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello Customers! We want to tell that
        </p>
        <Link_Word message = {message} link = {"www.youtube.com"}/>
      </header>
    </div>
  );
}

export default ErrorPage;
