import React, { useEffect, useState } from 'react';
import Header from './Header';
import Signs from './Signs';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userCredentials, setuserCredentials] = useState({
    email: '',
    password: '',
  });

  const [successRegister, setsuccessRegister] = useState(false);
  const [shoulBeInfoOpen, setShoulBeInfoOpen] = useState(false);

  function onCloseInfoTool() {
    setShoulBeInfoOpen(false);
  }

  useEffect(() => {
    if (location.state === 'success') {
      setShoulBeInfoOpen(true);
      setsuccessRegister(true);
    }
  }, [location.state]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setuserCredentials({
      ...userCredentials,
      [name]: value,
    });
  }
  function handleSubmit(evt) {
    evt.preventDefault();

    if (!userCredentials.email || !userCredentials.password) {
      return;
    }

    auth
      .authorize(userCredentials.email, userCredentials.password)
      .then((data) => {
        if (data && data.token) {
          setuserCredentials({
            email: '',
            password: '',
          });
          handleLogin();
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header>
        <Link to='/signup' className='header__sign'>
          {' '}
          Registrate
        </Link>
      </Header>
      <Signs
        header={'Inicia sesión'}
        buttonText={'Inicia sesión'}
        linkSpan={'../signup'}
        linkSpanText={'¿Aún no eres miembro? Regístrate aquí'}
        onSubmit={handleSubmit}
      >
        <input
          type='email'
          className='sign__input'
          placeholder='Correo electrónico'
          id='email'
          name='email'
          minLength='4'
          maxLength='30'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          className='sign__input'
          placeholder='Contraseña'
          id='password'
          name='password'
          minLength='4'
          maxLength='30'
          onChange={handleChange}
          required
        />
      </Signs>
      <InfoTooltip
        isSuccess={successRegister}
        shoulBeInfoOpen={shoulBeInfoOpen}
        onCloseBtn={onCloseInfoTool}
      />
    </>
  );
}

export default Login;
