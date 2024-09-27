import React, { useState } from 'react';
import robotsImage from './LogoRobots.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: username, password: password })
            });

            if (response.status === 200) {
                navigate("/listrobots");
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
            console.error('Error al intentar autenticar:', error);
        }
    };

    return (
        <div className="container">
            <h1>Adopta un Robot con Robot Lovers!</h1>
            <div className="text-center">
                <img src={robotsImage} alt="Robots" className="img-fluid" />
            </div>
            <div className="title">
                <h2 className="text-center mb-4">Inicio de sesión</h2>
            </div>
            <div className="form-group">
                <label>Nombre de usuario</label>
                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className="alert alert-danger">Error de autenticación. Revise sus credenciales</div>}
            <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
            <button className="btn btn-danger ml-2" onClick={() => { setUsername(''); setPassword(''); setError(false); }}>Cancelar</button>
        </div>
    );
}

export default Login;
