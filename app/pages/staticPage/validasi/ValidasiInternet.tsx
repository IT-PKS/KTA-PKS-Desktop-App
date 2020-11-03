import React from 'react'
import {
  Button
} from 'kta-ui-components';
import { useHistory } from 'react-router-dom';
import { PATH } from '../../../components/contextual/Router'

type iProps = {
  /**@default 'default' | 'failed' | 'success' */
  state?: string;
}

const ValidasiKta: React.FC<iProps> = ({ state }) => {
  const history = useHistory();

  return (
    <div>
      {
        state === 'failed' ?
          <>
            <p>Harap pastikan perangkat anda terkoneksi dengan internet untuk memproses data!</p>
            <Button icon={{ name: 'play-circle' }} type="submit" style={{ width: '122px', height: '35px' }}>
              Eksekusi
            </Button>
          </> : (
            <>
              <p>Berhasil Validasi data!</p>
              <Button
                icon={{ name: 'play-circle' }}
                style={{ width: '122px', height: '35px' }}
                onClick={() => history.push(PATH.VALIDATION)}
              >
                Kembali
             </Button>
            </>
          )
      }
    </div>
  )
}


export default ValidasiKta
