/** @jsx jsx */
import React from 'react'
import Card from 'components/deskstop/Card/Card'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './DataKta.styles';
import { Theme } from '../../../components/base/src/theme';
import Table from '../../../components/base/src/components/Table/Table'


const DataKta = () => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    const columns = [
        {
            title: 'NIK',
            dataIndex: 'nik',
            key: 'nik',
            width: 200,
        },
        {
            title: 'Nama Lengkap',
            dataIndex: 'fullname',
            key: 'fullname',
            width: 250,
        },
        {
            title: 'Alamat',
            dataIndex: 'address',
            key: 'address',
            width: 300,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => <a href="#">verify</a>,
        },
    ];

    const data = [
        { nik: 'Jack', fullname: 28, address: 'some where', key: '1' },
        { nik: 'Rose', fullname: 36, address: 'some where', key: '2' },
    ];

    return (
        <Card>
            <h2 css={[styles.heading]}>Data KTA</h2>
            <Table columns={columns} data={data} />
        </Card>
    )
}

export default DataKta
