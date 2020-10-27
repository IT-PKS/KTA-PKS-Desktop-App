/** @jsx jsx */
import React from 'react'
import Card from 'components/deskstop/Card/Card'
import { jsx } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { useTheme } from 'emotion-theming';
import createStyles from './DataKta.styles';
import { Theme } from '../../../components/base/src/theme';
import Table from '../../../components/base/src/components/Table/Table'

import formHelper, {
    RegisterFormData,
    SelectOption
} from '../../../components/base/src/staticPages/Register/Register.formHelper';


// Components
import {
    Column,
    FormGroup,
    Button,
    Row,
    Select
} from 'kta-ui-components';


type iProps = {
    defaultValues?: { [K in keyof RegisterFormData]?: RegisterFormData[K] };
    state?: 'default' | 'success' | 'failed';
    onSubmit(): any;
    /** @default false */
    loading?: boolean;
    setState(value: any): any;
};


const DataKta: React.FC<iProps> = (props) => {
    const { defaultValues, state = 'default', onSubmit, loading, setState } = props;
    const { register, handleSubmit, errors, setValue, formState } = useForm<RegisterFormData>({
        defaultValues,
    });
    const { errorMessages, pattern } = formHelper;
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const [tindakanMasal, setTindakanMasal] = React.useState<any | []>([])

    const handleSelectOnChange = (
        key: keyof RegisterFormData,
        callback?: (selectedOption: ValueType<SelectOption>) => void,
    ) => (selectedOption: ValueType<SelectOption>) => {
        if (selectedOption && 'value' in selectedOption) {
            setValue(key, selectedOption.value, {
                shouldValidate: formState.isSubmitted,
            });
        }
        callback && callback(selectedOption);
    };
    const getSelectDefaultValue = (key: SelectKeys) => {
        let selectedOption: Array<SelectOption> | undefined;
        const currValue = defaultValues && defaultValues[key];

        if (currValue) {
            selectedOption = options[key].filter(option => option.value === currValue);
        }

        return selectedOption;
    };



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
            <Row>
                <Column col={[12, 12, 4]}>
                    {/* Golongan Darah */}
                    <FormGroup>
                        <Select<SelectOption>
                            options={tindakanMasal}
                            defaultValue={getSelectDefaultValue('golonganDarah')}
                            onChange={handleSelectOnChange('golonganDarah')}
                            innerRef={() =>
                                register(
                                    { name: 'golonganDarah' },
                                    {
                                        required: {
                                            value: true,
                                            message: errorMessages.golonganDarah.required,
                                        },
                                    },
                                )
                            }
                            errorMessage={errors.golonganDarah && errors.golonganDarah.message}
                            placeholder="Tindakan masal"
                        />
                    </FormGroup>
                </Column>
                <Column col={[12, 12, 4]}>
                    <Button icon={{ name: 'play-circle' }} type="submit" style={{ width: '113px', height: '35px' }}>
                        Eksekusi
                    </Button>
                </Column>
            </Row>
            <Table columns={columns} data={data} />
        </Card>
    )
}

export default DataKta
