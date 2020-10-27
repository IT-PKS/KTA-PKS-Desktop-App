import React from 'react'
import {
  Button
} from 'kta-ui-components';

type iProps = {
  state?: 'default' | 'failed';
}

const ValidasiKta: React.FC<iProps> = props => {
  return (
    <div>
      <p>Harap pastikan perangkat anda terkoneksi dengan internet untuk memproses data!</p>
      <Button icon={{ name: 'play-circle' }} type="submit" style={{ width: '122px', height: '35px' }}>
        Eksekusi
      </Button>
    </div>
  )
}


export default ValidasiKta
