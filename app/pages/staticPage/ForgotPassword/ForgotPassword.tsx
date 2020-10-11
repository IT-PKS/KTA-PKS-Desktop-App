/** @jsx jsx */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Global, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../../components/base/src/theme';
import createStyles from './ForgotPassword.styles';
import { Link } from 'react-router-dom';

// Components & error messages
import { Button, Input, Label, Panel, FormGroup } from 'kta-ui-components';

// Images
import logoImg from '../../../components/base/src/img/logo-71x100.png';

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

const ForgotPassword: React.FC<iProps> = (props) => {
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
    console.log('errors', errors);
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
            <h4>Lupa Password</h4>
            <p>Kami akan mengirimkan panduan untuk me-reset password ke email anda.</p>
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
                placeHolder="Email yang terdaftar sebagai admin"
                autoComplete="on"
                errorMessage={errors.email && errors.email.message}
              />
            </FormGroup>


            <div css={styles.buttonContainer}>
              <Link to="/enter-new-password">
                <Button icon={{ name: 'sign-in-alt' }} type="submit" loading={loading}>
                  Reset Password
              </Button>
              </Link>
              <Link to="/sign-in">
                &nbsp;<a css={[styles.kembali__signin]}>Kembali</a>
              </Link>
            </div>
          </form>
        </Panel>
      </div>
    </Fragment >
  );
};

export default ForgotPassword;
