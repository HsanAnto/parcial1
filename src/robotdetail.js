import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RobotDetail({ robot_id }) {
    const [robot, setRobot] = useState(null);

    useEffect(() => {
        const fetchRobot = async () => {
            const response = await fetch(`http://localhost:3001/robots/${robot_id}`);
            const data = await response.json();
            setRobot(data);
        };

        fetchRobot();
    }, [robot_id]);

    if (!robot) {
        return <div>Cargando detalles...</div>;
    }

    const transformImageUrl = (url) => {
        return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    };

    return (
        <div className="card" style={{ width: '18rem' }}>
            <img 
                src={transformImageUrl(robot.imagen)} 
                alt={robot.nombre} 
                className="card-img-top" 
                style={{ objectFit: 'cover', height: '250px' }} 
            />
            <div className="card-body">
                <h5 className="card-title">{robot.nombre}</h5>
                <p className="card-text">
                    <strong>Año de Fabricación:</strong> {robot.añoFabricacion} <br />
                    <strong>Capacidad de Procesamiento:</strong> {robot.capacidadProcesamiento} <br />
                    <strong>Humor:</strong> {robot.humor}
                </p>
            </div>
        </div>
    );
}

export default RobotDetail;
