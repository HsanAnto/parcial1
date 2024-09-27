import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import robotsImage from './LogoRobots.png';
import RobotDetail from './robotdetail';

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
            <h1 className="text-center mb-4">Adopta un Robot con Robot Lovers!</h1>
            <div className="text-center mb-4">
                <img src={robotsImage} alt="Robots" className="img-fluid" />
            </div>

            {error && <div className="alert alert-danger">Error al cargar el listado de robots</div>}

            <div className="row">
                {/* Lista de Robots */}
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Modelo</th>
                                <th>Empresa Fabricante</th>
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

                
                <div className="col-md-6">
                    {selectedRobot ? (
                        <RobotDetail robot_id={selectedRobot} />
                    ) : (
                        <p>Seleccione un robot para ver detalles</p>
                    )}
                </div>
            </div>

            <div className="text-center mt-4">
                <p>Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
            </div>
        </div>
    );
}

export default RobotsList;
