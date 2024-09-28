import React, { useState } from 'react';
import robotsImage from '../../statics/LogoRobots.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './login.css';  // Asegúrate de tener este archivo CSS para los estilos

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
            <h1 className="text-center mb-4">
                <FormattedMessage id="page.title" defaultMessage="Adopt a Robot with Robot Lovers!" />
            </h1>
            <hr className="half-rule" />
            <div className="text-center">
                <img src={robotsImage} alt="Robots" className="img-fluid custom-img-size" />
            </div>
            <hr className="half-rule" />
            <div className="title">
                <h2 className="text-center mb-4">
                    <FormattedMessage id="login.title" defaultMessage="Inicio de sesión" />
                </h2>
            </div>

            <div className="d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="form-group">
                        <label className="font-weight-bold">
                            <FormattedMessage id="user.lable" defaultMessage="Nombre de usuario" />
                        </label>
                        <input
                            type="text"
                            className={`form-control bg-light ${error ? 'input-error' : ''}`}  // Agregar clase condicional
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">
                            <FormattedMessage id="password.lable" defaultMessage="Contraseña" />
                        </label>
                        <input
                            type="password"
                            className={`form-control bg-light ${error ? 'input-error' : ''}`}  // Agregar clase condicional
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="alert alert-danger"><FormattedMessage id="alertmessage" defaultMessage="Error de autenticación. Revise sus credenciales" /></div>}

                    {/* Alinear botones */}
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-primary btn-alargado" onClick={handleLogin}>
                            <FormattedMessage id="Ingresar" defaultMessage="Ingresar" />
                        </button>
                        <button className="btn btn-danger btn-alargado" onClick={() => { setUsername(''); setPassword(''); setError(false); }}>
                            <FormattedMessage id="Cancelar" defaultMessage="Cancelar" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
            </div>
        </div>
    );
}

export default Login;
