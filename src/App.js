import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {Home, NewPost} from './Pages/PageHandle'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/" className='Powered_Ai'>
          <ElectricalServicesIcon/><p className='Powered_Ai_Text'>Powered By OpenAI</p>
        </Link>

        <Link to="/NewPost" className='Create_Post_Link'>
          Create
        </Link>
      </header>
    </BrowserRouter>
  );
}

export default App;
