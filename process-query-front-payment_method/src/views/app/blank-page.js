import React, { useEffect, useState } from 'react';
import { Row, Badge, Card } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IconCardsCarousel from 'containers/dashboards/IconCardsCarousel';
import data from 'data/iconCards';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import clienteAxios from '../../config/axios';
import FormAuth from './detail/components/Proceso/FormAuth';

const BlankPage = ({ match, authUser }) => {
  const [count, setCount] = useState({});
  const [lawyer, setLawyer] = useState({});
  const [payment, setPayment] = useState({});
  const [urlPago, setUrlPago] = useState('');
  const [approved, setApproved] = useState(false);

  const { currentUser } = authUser;
  const { _id } = lawyer;

  useEffect(() => {
    const getCount = async () => {
      const countData = await clienteAxios.get('/process/count/bylawyer');
      setCount(countData.data);
    };

    const getLawyer = async () => {
      const lawyerData = await clienteAxios.get(`/lawyer/${currentUser.id}`);
      setLawyer(lawyerData.data);
    };

    getLawyer();
    getCount();
  }, []);

  const invoice = () => {
    const price = count[1] * 500;
    return price;
  };

  const paymentMethod = async () => {
    const url = 'https://api.mercadopago.com/checkout/preferences';

    const body = {
      payer: { email: 'test_user_49925203@testuser.com' },
      items: [
        {
          id: `${_id}`,
          title: 'Subscripción',
          currency_id: 'COP',
          description: 'pago de su factura mensual',
          picture_url: 'prueba',
          category_id: 'cat123',
          quantity: count[1],
          unit_price: 500
        }
      ],
      back_urls: {
        success: 'localhost:3000/app/blank-page/',
        failure: '/failure',
        pending: '/pending'
      },
      notification_url: 'https://paymenth-method.herokuapp.com/ipn'
    };

    const paymentData = await clienteAxios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer APP_USR-3358235138150118-080815-8185f95057c925ac403db991da834eb0-1175458796`
      }
    });

    setPayment(paymentData.data);
    console.log(paymentData.data, payment);

    setUrlPago(paymentData.data.init_point);
  };

  useEffect(() => {
    paymentMethod();
  }, [count]);

  useEffect(() => {
    if (window.location.search.includes('approved')) {
      setApproved(true);
    }
  });

  const fnData = () => {
    data.forEach((element, i) => {
      data[i].value = count[i];
    });

    return <IconCardsCarousel data={data} />;
  };

  return (
    <>
      <Row>
        <Colxx xxs='12'>
          <Breadcrumb heading='menu.blank-page' match={match} />
          <Separator className='mb-5' />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs='12' className='mb-1' /* style={{ marginBotton: '0px' }} */>
          {/*  <p>
            <IntlMessages id="menu.blank-page" />
          </p> */}
          {count && fnData()}
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs='12' className='mb-1'>
          <h1>Membresia Y Facturación</h1>

          <Card>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 40,
                justifyContent: 'center',
                paddingTop: 20
              }}
            >
              <p
                style={{
                  // margin: '0 0.7em 0 0',
                  fontSize: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  textAlign: 'center',
                  gap: 10
                }}
              >
                <IntlMessages id='Estado de su membresia:' />

                {approved ? (
                  <Badge color='success' pill className='mb-1'>
                    ACTIVA
                  </Badge>
                ) : (
                  <Badge color='danger' pill className='mb-1'>
                    VENCIDA
                  </Badge>
                )}
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                <p style={{ fontSize: 18 }}>
                  <IntlMessages id='Estado de tu proxima factura:' />
                </p>
                <p style={{ fontSize: 30 }}>
                  {invoice()} <IntlMessages id='COP' />
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <p style={{ fontSize: 18 }}>Fecha de vencimiento:</p>
                <p style={{ fontSize: 30 }}>
                  {approved ? '30/08/2022' : '30/07/2022'}
                </p>
              </div>
            </div>
          </Card>
          {approved ? null : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 20
              }}
            >
              <iframe
                width='100%'
                height='600'
                style={{ border: 'none' }}
                id='inlineFrameExample'
                title='Inline Frame Example'
                src={urlPago}
              >
                h
              </iframe>
            </div>
          )}
        </Colxx>
      </Row>
      <Row className='mt-4'>
        <h1 style={{ paddingLeft: '15px' }}>Colaboradores</h1>
      </Row>
      <Row className='mt-4'>
        <Colxx xxs='12' className='mb-1'>
          <h1 style={{ paddingLeft: '15px' }}>Datos de cuenta</h1>

          <div>
            <FormAuth lawyer={lawyer} />
          </div>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  return {
    authUser
  };
};
export default injectIntl(connect(mapStateToProps, {})(BlankPage));
