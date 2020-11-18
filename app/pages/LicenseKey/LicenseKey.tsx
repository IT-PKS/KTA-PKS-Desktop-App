/** @jsx jsx */
/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Global, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../components/base/src/theme';
import createStyles from './LicenseKey.styles';
import { useAuthDataContext } from 'utils/AuthDataProvider';
import { ipcRenderer } from 'electron';

// Components & error messages
import { Button, Input, Label, Panel, FormGroup } from 'kta-ui-components';

// Images
import logoImg from '../../components/base/src/img/logo-71x100.png';

ipcRenderer.on('message', (event: any, text: any) => {

  console.log('hii')
  console.log(text)

})

ipcRenderer.on('version', (event: any, text: any) => {

  console.log('versi');
  console.log(text);

})

type LicenseFormData = {
  license: string;
};

type ILogin = {
  onSubmit(): any;
  /** @default false */
  loading?: boolean;
};


const LicenseKey: React.FC<ILogin> = (props) => {
  const { loading } = props
  const { onSubmitLicense } = useAuthDataContext();
  const { register, handleSubmit, errors } = useForm<LicenseFormData>();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const errorMessages = {
    license: {
      required: 'License Key tidak boleh kosong',
    }
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

          <form css={styles.form} onSubmit={handleSubmit(onSubmitLicense)} noValidate>
            <h4>Masukkan Lisensi</h4>
            <p>Masukkan license untuk membuka kunci aplikasi admin Kartu Tanda Anggota PKS</p>
            <FormGroup>
              <Label required>License</Label>
              <Input
                innerRef={register({
                  required: {
                    value: true,
                    message: errorMessages.license.required,
                  },
                })}
                name="license"
                errorMessage={errors.license && errors.license.message}
              />
            </FormGroup>


            <div css={styles.buttonContainer}>
              <Button icon={{ name: 'check-circle' }} type="submit" loading={loading}>
                Verifikasi Lisensi
              </Button>
            </div>
          </form>
        </Panel>
      </div>
    </Fragment >
  );
};

export default LicenseKey;
