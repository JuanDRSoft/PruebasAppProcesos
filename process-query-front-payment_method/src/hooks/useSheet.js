import React from 'react';
/* import axios from 'axios'; */
import XlsxPopulate from 'xlsx-populate';
import { saveAs } from 'file-saver';

import { Button } from 'reactstrap';

export default function App({ renderData }) {
  function getSheetData(data, header) {
    const sheetData = data.map(function (row, i) {
      const array = [];

      const {
        filingNumber,
        despacho,
        departamento,
        lastUpdateDate,
        state /* ,
        idProceso */
      } = row;

      /* const requestAccion = await axios.get(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${idProceso}?pagina=1`
      );

      console.log(
        '@data',
        requestAccion.data,
        requestAccion.data.actuaciones[0]
      );

      const { actuacion, anotacion, fechaActuacion } =
        requestAccion.data.actuaciones[0]; */

      array.push(i + 1);
      array.push(filingNumber);
      array.push(departamento);
      array.push(despacho);
      array.push(lastUpdateDate ? lastUpdateDate.split('T')[0] : '');
      /* array.push(fechaActuacion);
      array.push(actuacion);
      array.push(anotacion); */
      array.push(state ? 'Activo' : 'Inactivo');

      return array;
    });

    console.log('@sheetData', sheetData);
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel() {
    const header = [
      '#',
      'Radicado',
      'Departamento',
      'Despacho',
      'Ultima Actualizacion',
      'Estado' /* ,
      'Fecha ultima actuación',
      'Ultima actuación',
      'Ultima anotación' */
    ];

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(renderData, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell('A1').value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style('bold', true);
      sheet1.column(1).width(5);
      sheet1.column(2).width(25);
      sheet1.column(3).width(20);
      sheet1.column(4).width(65);
      sheet1.column(5).width(25);
      sheet1.column(6).width(15);
      sheet1.range(`A1:${endColumn}1`).style('fill', 'BFBFBF');
      range.style('border', true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, 'Reporte procesos.xlsx');
      });
    });
  }

  return (
    <Button type='button' onClick={saveAsExcel} size='lg'>
      Descargar Reporte
    </Button>
  );
}
