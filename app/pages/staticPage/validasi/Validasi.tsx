/** @jsx jsx */
import Card from 'components/deskstop/Card/Card'

import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Validasi.styles';
import { Theme } from '../../../components/base/src/theme';
// import Table from '../../../components/deskstop/table/Table';
import Table from '../../../components/base/src/components/Table/Table'


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 100,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 200,
    },
    {
        title: 'Operations',
        dataIndex: '',
        key: 'operations',
        render: () => <a href="#">Delete</a>,
    },
];

const data = [
    { name: 'Jack', age: 28, address: 'some where', key: '1' },
    { name: 'Rose', age: 36, address: 'some where', key: '2' },
];

const Validasi = () => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
        <Card>
            <h2 css={[styles.heading]}>Validasi KTA</h2>
            <Table columns={columns} data={data} />
        </Card>
    )
}

export default Validasi
