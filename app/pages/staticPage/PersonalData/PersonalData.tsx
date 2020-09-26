/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './PersonalData.styles';
import { Theme } from '../../../components/base/src/theme';
import { Input, Column, Button } from 'kta-ui-components'
import Card from '../../../components/deskstop/Card/Card'


const PersonalData: React.FC = () => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <Card>
            <section css={[styles.section_content]}>
                <h1 css={[styles.title_text]}>Data Diri</h1>
                <div css={[styles.card_body]}>
                    <Column col={[12]} >
                        <p css={[styles.text]}>NIK / No. KTP *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Nama lengkap *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Nama Panggilan</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Tempat Lahir *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Tanggal Lahir *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Jenis Kelamin *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Golongan Darah *</p>
                        <Input />
                    </Column>
                </div>
            </section>

            <section css={[styles.section_content]}>
                <h1 css={[styles.title_text]}>Alamat Sesuai KTP</h1>
                <div css={[styles.card_body]}>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Provinsi *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Kota / Kabupaten</p>
                        <Input />

                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Kecamatan *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Kelurahan / Desa *</p>
                        <Input />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Alamat *</p>
                        <Input />
                    </Column>
                    <Column col={[3]} >
                        <p css={[styles.text]}>RT *</p>
                        <Input />
                    </Column>
                    <Column col={[3]} >
                        <p css={[styles.text]}>RW *</p>
                        <Input />
                    </Column>
                </div>
            </section>

            <section css={[styles.section_content]}>
                <h1 css={[styles.title_text]}>Alamat Saat Ini</h1>
                <div css={[styles.card_body]}>
                    <Column col={[12]} >
                        <p css={[styles.text]}>Provinsi *</p>
                        <Input />
                    </Column>
                    <Column col={[12]} >
                        <p css={[styles.text]}>Kota / Kabupaten</p>
                        <Input />
                    </Column>
                    <Column col={[12]} >
                        <p css={[styles.text]}>Negara Saat Ini (bagi yang di luar negeri) </p>
                        <Input />
                    </Column>
                </div>
            </section>

            <section css={[styles.statement_section]}>
                <div css={[styles.statement_list]}>
                    <input type="checkbox" />
                    <p>Dengan ini saya menyatakan bahwa saya bukan merupakan pengurus dari partai politik lain</p>
                </div>
                <div css={[styles.statement_list]}>
                    <input type="checkbox" />
                    <p>Saya menyatakan bahwa semua data yang tertulis di atas ini adalah benar dan saya bertanggung jawab penuh atas keabsahan data tersebut</p>
                </div>
            </section>

            <section css={[styles.button_section]}>
                <Button type="submit" icon="paper-plane" variant="primary">
                    Kirim Data
                </Button>
            </section>
        </Card>
    )
}

export default PersonalData
