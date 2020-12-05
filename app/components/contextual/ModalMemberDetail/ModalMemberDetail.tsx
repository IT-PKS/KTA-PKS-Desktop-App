import React from 'react';
import isNumber from 'lodash/isNumber';
import { useTheme } from 'emotion-theming';
import isString from 'lodash/isString';
import createStyles from './ModalMemberDetail.styles';


// Components
import {
  Theme,
  LeafletMapDisplay,
  Button,
  Modal,
  ModalProps,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'components/base';

// Utils
import { getLabel, RequiredDataType } from './ModalMemberDetail.utils';
import { keys } from 'utils/object';


type Props = {
  deleting: boolean;
  fullname?: string;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: ModalProps['open'];
  toggle: ModalProps['toggle'];
  data: any
};

const ModalDeleteMember: React.FC<Props> = props => {
  const { toggle, open, data } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const renderTable = (fieldData: Partial<RequiredDataType>) => {
    return (
      <table css={styles.table}>
        <tbody>
          {keys(fieldData).map((key, index) => {
            let value = fieldData[key];
            if (isString(value) && key === 'birthdate') {
              value = value.split('-').reverse().join('-');
            }
            return (
              <tr key={index}>
                <td>{getLabel(key)}</td>
                <td>:</td>
                <td>{value || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };


  const renderMap = (lat: number | null, lon: number | null) => {
    if (isNumber(lat) && isNumber(lon)) {
      return <LeafletMapDisplay css={styles.map} center={[lat, lon]} scrollWheelZoom={false} />;
    }
    return null;
  };

  const {
    id_card,
    fullname,
    nickname,
    birthplace,
    birthdate,
    gender,
    blood_type,
    province,
    city,
    district,
    sub_district,
    address,
    lat,
    lon,
    domicile,
    country,
    religion,
    marital_status,
    job,
    last_education,
    email,
    phone,
  } = data;

  const lat_lon = isNumber(lat) && isNumber(lon) ? `${lat}, ${lon}` : '-';
  const dataDiri = {
    id_card,
    fullname,
    nickname,
    birthplace_birthdate:
      birthplace && birthdate
        ? `${birthplace}, ${birthdate.split('-').reverse().join('-')}`
        : undefined,
    gender,
    blood_type,
  };
  const alamatSesuaiKtp = { province, city, district, sub_district, address };
  const alamatSaatIni = { lat_lon, domicile, country };
  const lainnya = { religion, marital_status, job, last_education, email, phone };

  return (
    <>
      {
        open &&
        <Modal open={open} toggle={toggle} size="lg">
          <ModalHeader onClose={toggle}>Hapus Data</ModalHeader>
          <ModalBody>
            {/* Data Diri */}
            <h4 css={styles.heading}>Data Diri</h4>
            {renderTable(dataDiri)}
            <br />

            {/* Alamat Sesuai KTP */}
            <h4 css={styles.heading}>Alamat Sesuai KTP</h4>
            {renderTable(alamatSesuaiKtp)}
            <br />


            {/* Alamat Saat Ini */}
            <h4 css={styles.heading}>Alamat Saat Ini</h4>
            {renderMap(lat, lon)}
            {renderTable(alamatSaatIni)}

            <br />

            {/* Lainnya */}
            <h4 css={styles.heading}>Lainnya</h4>
            {renderTable(lainnya)}

          </ModalBody>
          <ModalFooter>
            <Button onClick={toggle} icon={{ name: 'times' }}>
              Tutup
        </Button>
          </ModalFooter>
        </Modal>
      }
    </>
  );
}

export default ModalDeleteMember;
