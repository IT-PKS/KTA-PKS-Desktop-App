/** @jsx jsx */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Global, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../../components/base/src/theme';
import createStyles from './Login.styles';
import { Link } from 'react-router-dom';
// import initSQLite from '../../../services/sqlite/initSQLite'
// import { Country } from '../../../entity/Country'
// import { Province } from '../../../entity/Province'
// import { City } from '../../../entity/City'
// import { District } from '../../../entity/District'
// import { SubDistrict } from '../../../entity/SubDistrict'


// Components & error messages
import { Button, Input, Label, Panel, FormGroup, Checkbox, Row, Column } from 'kta-ui-components';

// Images
import logoImg from '../../../components/base/src/img/logo-71x100.png';

// export const addLocalUser = async () => {
//   const connection: any = await initSQLite([Country, Province, City, District, SubDistrict])
//   connection.manager.find(Country)
//   connection.manager.find(Province)
//   connection.manager.find(City)
//   connection.manager.find(District)
//   connection.manager.find(SubDistrict)
//   connection.close()
// }

// addLocalUser()

type LoginFormData = {
  email: string;
  password: string;
  remember_me: boolean;
};

type iProps = {
  onSubmit(): any;
  /** @default false */
  loading?: boolean;
};

const Login: React.FC<iProps> = (props) => {
  const { onSubmit, loading } = props
  const { register, handleSubmit, errors } = useForm<LoginFormData>();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const pattern = {
    // https://regexlib.com/REDetails.aspx?regexp_id=26
    email: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  };
  const errorMessages = {
    email: {
      required: 'Email tidak boleh kosong',
      pattern: 'Format email yang anda masukan salah',
    },
    password: {
      required: 'Password tidak boleh kosong',
    },
  };

  React.useEffect(() => {
    // console.log('errors', errors);
  }, [errors]);

  return (
    <Fragment>
      <Global styles={styles.global} />

      <div css={styles.wrapper}>
        <Panel css={styles.panel}>
          <div css={styles.header}>
            <img src={logoImg} alt="Logo PKS" />
            <div css={styles.headerText}>
              <h3>
                Admin Dasbor KTA
                <br /> Partai Keadilan Sejahtera
              </h3>
            </div>
          </div>

          <form css={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup>
              <Label required>Email</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.email.required,
                  },
                  pattern: {
                    value: pattern.email,
                    message: errorMessages.email.pattern,
                  },
                })}
                type="email"
                name="email"
                autoComplete="on"
                placeHolder="Email yang terdaftar sebagai admin"
                errorMessage={errors.email && errors.email.message}
              />
            </FormGroup>

            <FormGroup>
              <Label required>Password</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.password.required,
                  },
                })}
                type="password"
                name="password"
                placeHolder="Password admin anda"
                errorMessage={errors.password && errors.password.message}
              />
            </FormGroup>

            <Row verticalAlign="middle">
              <Column>
                <Checkbox innerRef={register} label="Ingat saya" name="remember_me" />
              </Column>
              <Column css={styles.forgetPasswordColumn}>
                <Link to="forgot-password">
                  Lupa password?
                </Link>
              </Column>
            </Row>

            <div css={styles.buttonContainer}>
              <Button icon={{ name: 'sign-in-alt' }} type="submit" loading={loading}>
                Login
              </Button>
            </div>
          </form>
        </Panel>
      </div >
    </Fragment >
  );
};

export default Login;
