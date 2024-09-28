import React, { useEffect, useState } from 'react';
import { FormattedMessage } from "react-intl";
import 'bootstrap/dist/css/bootstrap.min.css';
import './robotdetail.css';

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
        return <div><FormattedMessage id="loading.details" defaultMessage="Cargando detalles..." /></div>;
    }

    const transformImageUrl = (url) => {
        return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    };

    return (
        <div className="robot-card card">
            <div className="text-center">
                <h5 className="card-title mt-3">{robot.nombre}</h5>
                <img 
                    src={transformImageUrl(robot.imagen)} 
                    alt={robot.nombre} 
                    className="robot-image" 
                />
            </div>
            <div className="card-body">
                <p className="card-text">
                    <strong><FormattedMessage id="year.manufacture" defaultMessage="Año de Fabricación" />:</strong> {robot.añoFabricacion} <br />
                    <strong><FormattedMessage id="processing.capacity" defaultMessage="Capacidad de Procesamiento" />:</strong> {robot.capacidadProcesamiento} <br />
                    <strong><FormattedMessage id="humor" defaultMessage="Humor" />:</strong> {robot.humor}
                </p>
            </div>
        </div>
    );
}

export default RobotDetail;