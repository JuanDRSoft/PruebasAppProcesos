import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { adminRoot } from 'constants/defaultValues';

const Register = ({ history, registerUserAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onUserRegister = () => {
    if (email !== '' && password !== '') {
      registerUserAction({ email, password, name, phone }, history);
    }
    if (email === 'j') {
      history.push(adminRoot);
    }
    // call registerUserAction()
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MVP APP PROCESS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Input
                  type="name"
                  defaultValue={name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input
                  type="email"
                  defaultValue={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="Telefono" />
                </Label>
                <Input
                  type="phone"
                  defaultValue={phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.password" defaultValue={password} />
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
