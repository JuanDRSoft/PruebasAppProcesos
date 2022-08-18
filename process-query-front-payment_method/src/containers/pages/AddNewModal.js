import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Spinner
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';

import axios from 'axios';
import api from '../../constants/api';

const AddNewModal = ({ modalOpen, toggleModal, idLawyer, reloadFnData }) => {
  const [fillingN, setFillingN] = useState();
  const [loading, setLoading] = useState(false);

  const createNotification = (type, className, msg) => {
    const cName = className || '';
    switch (type) {
      case 'error':
        NotificationManager.error(
          msg,
          'ERROR!',
          2000,
          () => {
            /* alert('callback'); */
          },
          null,
          cName
        );
        break;
      case 'success':
        NotificationManager.success(
          msg,
          'REGISTRO!',
          2000,
          () => {
            /* alert('callback'); */
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };
  const processQuery = async () => {
    if (!fillingN) {
      createNotification('error', 'filled', 'Campos obligatorios');
    } else {
      setLoading(true);

      try {
        const requestProceso = await axios.get(
          `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${fillingN.trim()}&SoloActivos=false&pagina=1`
        );

        if (requestProceso.data.procesos.length === 0) {
          createNotification('error', 'filled', 'Radicado no existe!');
          setLoading(false);
        } else {
          const {
            fechaUltimaActuacion,
            idProceso,
            despacho,
            departamento,
            sujetosProcesales
          } = requestProceso.data.procesos[0];

          await axios
            .post(`${api}/process`, {
              filingNumber: fillingN.trim(),
              lastUpdateDate: fechaUltimaActuacion,
              lawyer: idLawyer,
              idProceso,
              despacho,
              departamento,
              sujetosProcesales
            })
            .then((result) => {
              console.log(result);
              setLoading(false);
              setFillingN('');
              toggleModal();
              reloadFnData();
              createNotification(
                'success',
                'filled',
                'Proceso Agregado con Exito!'
              );
              /* window.location.href = '/'; */
            })
            .catch((err) => {
              setLoading(false);
              console.log('@err', err.response.data.msg);
              createNotification('error', 'filled', err.response.data.msg);
            });
        }
      } catch (error) {
        console.log(error.response.data.Message);

        if (error.response.data.StatusCode === 404) {
          setLoading(false);
          createNotification('error', 'filled', error.response.data.Message);
        }
      }
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName='modal-right'
      backdrop='static'
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id='pages.add-new-modal-title' />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id='pages.product-name' />
        </Label>
        <Input value={fillingN} onChange={(e) => setFillingN(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' outline onClick={toggleModal}>
          <IntlMessages id='pages.cancel' />
        </Button>
        {loading && <Spinner color='primary' className='mb-1' />}
        <Button color='primary' onClick={processQuery} disabled={loading}>
          <IntlMessages id='pages.submit' />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
