import { useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login'
import { useEffect } from 'react';
import checkSessionValidity from './components/CheckSessionValidity'; // Import the function

function App() {
   

  const navigate = useNavigate();

    useEffect(() => {
        const isSessionValid = checkSessionValidity();
        if (!isSessionValid) {
            navigate('/login'); // Redirect to login if session is invalid
        }
    }, [navigate]);



  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
