import React from 'react';

// Components
import { Button, Modal, ModalProps, ModalBody, ModalFooter, ModalHeader } from 'components/base';

type Props = {
  deleting: boolean;
  fullname?: string;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: ModalProps['open'];
  toggle: ModalProps['toggle'];
};

const ModalDeleteMember: React.FC<Props> = props => {
  const { toggle, open, deleting, fullname = 'No Name', onDelete } = props;

  return (
    <Modal open={open} toggle={toggle}>
      <ModalHeader onClose={toggle}>Hapus Data</ModalHeader>
      <ModalBody>
        <p>
          Apakah Anda yakin ingin menghapus data <strong>{fullname}</strong>?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} icon={{ name: 'times' }}>
          Tutup
        </Button>
        <Button
          variant="destructive"
          icon={{ name: 'trash-alt' }}
          onClick={onDelete}
          loading={deleting}
        >
          Hapus
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDeleteMember;
