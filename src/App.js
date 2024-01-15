import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NewMessage from './components/NewMessage';
import ViewMessage from './components/ViewMessage';

import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <>
      <Navbar/>
      <Routes>
        <Route path='' element={<Login/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='new-message' element={<NewMessage/>}/>
        <Route path='view-message' element={<ViewMessage/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
      </>
    </div>

  );
}

export default App;