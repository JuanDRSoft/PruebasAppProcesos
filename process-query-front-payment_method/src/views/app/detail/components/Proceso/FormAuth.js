import { Colxx } from 'components/common/CustomBootstrap';
import clienteAxios from 'config/axios';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Row
} from 'reactstrap';
import * as Yup from 'yup';

const FormAuth = ({ lawyer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');

  const { _id } = lawyer;

  useEffect(() => {
    setId(_id);
    setName(lawyer.name);
    setEmail(lawyer.email);
    setPhone(lawyer.phone);
    setCity(lawyer.city);
    setDepartment(lawyer.department);
    setAddress(lawyer.address);
  }, [lawyer]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, phone, city, department, address].includes('')) {
      return;
    }

    const data = await clienteAxios.put(`/lawyer/${id}`, {
      name,
      email,
      phone,
      city,
      department,
      address
    });
    console.log(data, 'data');
    window.location.reload();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    name: Yup.string().required('Name is required!'),
    phone: Yup.number().required('phone is required!'),
    city: Yup.string().required('city is required!'),
    department: Yup.string().required('department is required'),
    address: Yup.string().required('address is required!')
  });

  return (
    <div>
      <Row className='mb-4'>
        <Colxx xxs='12'>
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  city: '',
                  department: '',
                  address: ''
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form
                    className='av-tooltip tooltip-label-right'
                    onSubmit={onSubmit}
                  >
                    <FormGroup>
                      <Label>Nombre Completo</Label>
                      <Field
                        className='form-control'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && touched.name && (
                        <div className='invalid-feedback d-block'>
                          {errors.name}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Email</Label>
                      <Field
                        className='form-control'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && touched.email && (
                        <div className='invalid-feedback d-block'>
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Telefono</Label>
                      <Field
                        className='form-control'
                        name='phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && touched.phone && (
                        <div className='invalid-feedback d-block'>
                          {errors.phone}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Ciudad</Label>
                      <Field
                        className='form-control'
                        name='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      {errors.city && touched.city && (
                        <div className='invalid-feedback d-block'>
                          {errors.city}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Departamento</Label>
                      <Field
                        className='form-control'
                        name='department'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                      {errors.department && touched.department && (
                        <div className='invalid-feedback d-block'>
                          {errors.department}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label>Dirección</Label>
                      <Field
                        className='form-control'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && touched.address && (
                        <div className='invalid-feedback d-block'>
                          {errors.address}
                        </div>
                      )}
                    </FormGroup>

                    <Button color='primary' block type='submit'>
                      Guardar Cambios
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default FormAuth;
