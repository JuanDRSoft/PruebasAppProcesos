import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const Proceso = ({ proceso }) => {
  const { actuacion, anotacion, fechaActuacion } = proceso;

  return (
    <Card style={{ margin: '1em 0', border: '1px solid #e6e6e6' }}>
      <CardBody>
        <CardTitle style={{ fontWeight: 'bold' }}>
          Fecha Actuación: {new Date(fechaActuacion).toISOString().slice(0, 10)}
        </CardTitle>
        <h4>Actuación: {actuacion}</h4>
        <h4>Anotación: {anotacion}</h4>
      </CardBody>
    </Card>
  );
};

export default Proceso;
