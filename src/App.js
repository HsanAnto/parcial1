import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';  // Asegúrate de que las rutas a tus componentes sean correctas
import ListRobots from './components/robotlist/listrobots';  // Este es el componente que debe mostrar la lista de robots

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listrobots" element={<ListRobots />} />
      </Routes>
    </Router>
  );
}

export default App;