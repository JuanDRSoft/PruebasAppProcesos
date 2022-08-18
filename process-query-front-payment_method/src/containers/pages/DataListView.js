import React from 'react';
import { Card, /* CustomInput, */ Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import alert from '../../assets/notification/alert.png';

const DataListView = ({ proceso, isSelect, collect, onCheckItem }) => {
  const {
    filingNumber,
    despacho,
    departamento,
    lastUpdateDate,
    sujetosProcesales,
    state,
    notificationWeb
  } = proceso;
  return (
    <Colxx xxs='12' className='mb-3'>
      <ContextMenuTrigger id='menu_id' data={filingNumber} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, filingNumber)}
          className={classnames('d-flex flex-row', {
            active: isSelect
          })}
        >
          <div className='pl-2 d-flex flex-grow-1 min-width-zero'>
            <div
              className='card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'
              style={{ gap: '15px' }}
            >
              <NavLink
                to={`/app/detail/${filingNumber}`}
                className='w-40 w-sm-100'
              >
                <p>Radicado: {filingNumber}</p>
                <p className='list-item-heading mb-1 truncate'>{despacho}</p>
                <p className='list-item-heading mb-1 truncate'>
                  {departamento}
                </p>
              </NavLink>
              <p
                className='mb-1 text-muted text-small w-15 w-sm-100 d-flex flex-column'
                style={{ gap: '5px' }}
              >
                <div> Ultima actualizacion: </div>
                <div style={{ fontSize: '1.2rem' }}>
                  <Badge color={state ? 'primary' : 'danger'} pill>
                    {new Date(lastUpdateDate).toISOString().slice(0, 10)}
                  </Badge>
                </div>
              </p>
              <p className='mb-1 text-muted text-small w-30 w-sm-100'>
                Sujetos Procesales: {sujetosProcesales}
              </p>
              <div style={{ width: '20px' }}>
                {notificationWeb && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 1em'
                    }}
                  >
                    <img width='30' src={alert} alt='' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
