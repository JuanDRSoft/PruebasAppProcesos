import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import UseSheet from '../../../hooks/useSheet';
import clienteAxios from '../../../config/axios';

const Reports = ({ match }) => {
  const [process, setProcess] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const countDataAll = await clienteAxios.get('/process/all/bylawyer');
      setProcess(countDataAll.data);
    };

    getAllData();
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading='page.report' match={match} />
          <Separator className='mb-5' />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs='12' className='mb-4'>
          <Card>
            <CardBody>
              <p className='lead'>Resumen de Procesos</p>
              <hr className='my-4' />
              <p>
                Se descargara un archivo en excel que contiene el resumen de
                todos los procesos registrados con su respectivo estado.
              </p>
              <p className='lead mb-0'>
                <UseSheet renderData={process} />
              </p>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {/* <Row>
        <Colxx xxs='12' className='mb-4'>
          <Card>
            <CardBody>
              <p className='lead'>Resumen de Procesos</p>
              <hr className='my-4' />
              <p>
                Se descargara un archivo en excel que contiene el resumen de
                todos los procesos registrados con su respectivo estado.
              </p>
              <p className='lead mb-0'>
                <UseSheet renderData={process} />
              </p>
            </CardBody>
          </Card>
        </Colxx>
      </Row> */}
    </>
  );
};

export default Reports;
/*   <Row>
      <h1>Reportes</h1>
      <UseSheet renderData={process} />
    </Row> */
