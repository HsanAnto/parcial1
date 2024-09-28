import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import robotsImage from '../../statics/LogoRobots.png';
import RobotDetail from '../robotdetail/robotdetail';
import { FormattedMessage } from "react-intl";
import "./listarrobots.css"

function RobotsList() {
    const [robots, setRobots] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState(null); 
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRobots = async () => {
            try {
                const response = await fetch('http://localhost:3001/robots');
                if (response.status === 200) {
                    const data = await response.json();
                    setRobots(data);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.error('Error al obtener el listado de robots:', error);
            }
        };
        fetchRobots();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">
                <FormattedMessage id="page.title" defaultMessage="Adopt a Robot with Robot Lovers!" />
            </h1>
            <hr className="half-rule" />
            <div className="text-center mb-4">
                <img src={robotsImage} alt="Robots" className="img-fluid custom-img-size" />
            </div>
            <hr className="half-rule" />

            {error && <div className="alert alert-danger">Error al cargar el listado de robots</div>}

            <div className="row">
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <FormattedMessage id="ID" defaultMessage="ID" />
                                </th>
                                <th>
                                    <FormattedMessage id="Nombre" defaultMessage="Nombre" />
                                </th>
                                <th>
                                    <FormattedMessage id="Modelo" defaultMessage="Modelo" />
                                </th>
                                <th>
                                    <FormattedMessage id="company.th" defaultMessage="Empresa Fabricante" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {robots.map((robot) => (
                                <tr key={robot.id} onClick={() => setSelectedRobot(robot.id)}>
                                    <td>{robot.id}</td>
                                    <td>{robot.nombre}</td>
                                    <td>{robot.modelo}</td>
                                    <td>{robot.empresaFabricante}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedRobot && (
                    <div className="col-md-5">
                        <RobotDetail robot_id={selectedRobot} />
                    </div>
                )}
            </div>

            <div className="text-center mt-4">
                <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
            </div>
        </div>
    );
}

export default RobotsList;
