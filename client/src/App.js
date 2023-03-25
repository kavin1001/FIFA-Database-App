import './App.css';
import AppRoot from './components/AppRoot';
import { Route, Routes } from 'react-router-dom';

function App() {

  return <Routes>
      <Route path='/' element={<AppRoot />}/>
    </Routes>
  }

export default App;
