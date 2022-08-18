import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Spinner, Row } from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

import clienteAxios from '../../../config/axios';
import Proceso from './components/Proceso/Proceso';
import style from './detailcss.module.css';

const DetailProcess = ({ match }) => {
  const [data, setData] = useState({});
  const [procesos, setProcesos] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchProcess = async () => {
      clienteAxios.get(`/process/${id}`).then((result) => {
        setData(result.data);

        clienteAxios
          .get(`/process/id/${result.data.idProceso}`)
          .then((resultProcess) => {
            console.log('@resultProcess', resultProcess);
            setCantidad(resultProcess.data.paginacion.cantidadRegistros);
            setProcesos(resultProcess.data.actuaciones);
            setLoading(false);
          });
      });
    };
    fetchProcess();
  }, []);

  useEffect(() => {
    const updateStateNotification = async () => {
      clienteAxios.put(`/process/${id}`, {
        notificationWeb: false
      });
    };
    updateStateNotification();
  }, []);

  if (!data?.lawyer) {
    return <></>;
  }

  const renderProcesos = () => {
    return procesos.map((proceso) => (
      <Proceso proceso={proceso} key={proceso.idRegActuacion} />
    ));
  };

  const {
    filingNumber,
    lastUpdateDate,
    despacho,
    departamento,
    sujetosProcesales
  } = data;

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading='page.detalle' match={match} />
          <Separator className='mb-5' />
        </Colxx>
      </Row>

      <Row className='mb-5'>
        <Colxx xxs='6'>
          <Card style={{ position: 'sticky', top: '128px' }}>
            <CardBody>
              <CardTitle style={{ fontWeight: 'bold' }}>
                DETALLES DEL PROCESO
              </CardTitle>
              <div className={style.detailData}>
                <h4 className={style.textMargin}>Numero de Radicado:</h4>
                <div className={style.textMargin}>{filingNumber}</div>
              </div>
              <div className={style.detailData}>
                <h4 className={style.textMargin}>Ultima Actualizacion:</h4>
                <div className={style.textMargin}>{lastUpdateDate}</div>
              </div>
              <div className={style.detailData}>
                <h4 className={style.textMargin}>Despacho:</h4>
                <div className={style.textMargin}>{despacho}</div>
              </div>
              <div className={style.detailData}>
                <h4 className={style.textMargin}>Departamento: </h4>
                <div className={style.textMargin}>{departamento}</div>
              </div>
              <h4>Sujetos Procesales: </h4>
              <div>{sujetosProcesales}</div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs='6'>
          <Card>
            <CardBody>
              <CardTitle style={{ fontWeight: 'bold' }}>
                ACTUACIONES DEL PROCESO - Cantidad {cantidad}
              </CardTitle>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spinner color='primary' className='mb-1' size='lg' />
                </div>
              ) : (
                <div style={{ marginTop: '3em' }}>{renderProcesos()}</div>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default DetailProcess;
