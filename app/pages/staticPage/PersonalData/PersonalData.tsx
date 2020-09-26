/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './PersonalData.styles';
import { Theme } from '../../theme';
import { Card, Input, Column, Button } from '../../../index'
import { Field } from 'redux-form';


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
                        <Field
                            name="nik"
                            placeholder="Akrab dipanggil dengan nama..."
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Nama lengkap *</p>
                        <Field
                            name="fullname"
                            placeholder="Sesuai tertera di KTP."
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Nama Panggilan</p>
                        <Field
                            name="callname"
                            placeholder="Akrab dipanggil dengan nama..."
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Tempat Lahir *</p>
                        <Field
                            name="callname"
                            placeholder="Nama Kota"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Tanggal Lahir *</p>
                        <Field
                            name="callname"
                            placeholder="Dalam format dd/mm/yyyy"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Jenis Kelamin *</p>
                        <Field
                            name="callname"
                            placeholder="Laki-laki / Perempuan"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Golongan Darah *</p>
                        <Field
                            name="callname"
                            placeholder="A / B / AB / O"
                            component={Input}
                        />
                    </Column>
                </div>
            </section>

            <section css={[styles.section_content]}>
                <h1 css={[styles.title_text]}>Alamat Sesuai KTP</h1>
                <div css={[styles.card_body]}>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Provinsi *</p>
                        <Field
                            name="callname"
                            placeholder="Pilih Provinsi"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Kota / Kabupaten</p>
                        <Field
                            name="callname"
                            placeholder="Pilih Kota / Kabupaten"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Kecamatan *</p>
                        <Field
                            name="callname"
                            placeholder="Pilih Kecamatan"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Kelurahan / Desa *</p>
                        <Field
                            name="callname"
                            placeholder="Pilih Kelurahan / Desa"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Alamat *</p>
                        <Field
                            name="callname"
                            placeholder="Contoh: Jalan A Perum B no. 1111"
                            component={Input}
                        />
                    </Column>
                    <Column col={[3]} >
                        <p css={[styles.text]}>RT *</p>
                        <Field
                            name="rt"
                            placeholder="RT"
                            component={Input}
                        />
                    </Column>
                    <Column col={[3]} >
                        <p css={[styles.text]}>RW *</p>
                        <Field
                            name="rt"
                            placeholder="RW"
                            component={Input}
                        />
                    </Column>
                </div>
            </section>

            <section css={[styles.section_content]}>
                <h1 css={[styles.title_text]}>Alamat Saat Ini</h1>
                <div css={[styles.card_body]}>
                    <Column col={[12]} >
                        <p css={[styles.text]}>Provinsi *</p>
                        <Field
                            name="rt"
                            placeholder="Isi apabila saat ini anda tidak tinggal di alamat yang tertera pada KTP"
                            component={Input}
                        />
                    </Column>
                    <Column col={[12]} >
                        <p css={[styles.text]}>Kota / Kabupaten</p>
                        <Field
                            name="rt"
                            placeholder="Pilih Kota / Kabupaten"
                            component={Input}
                        />
                    </Column>
                    <Column col={[12]} >
                        <p css={[styles.text]}>Negara Saat Ini (bagi yang di luar negeri) </p>
                        <Field
                            name="country"
                            placeholder="Pilih Negara"
                            component={Input}
                        />
                    </Column>
                </div>
            </section>

            <section css={[styles.section_content]}>
                <h1 css={[styles.title_text]}>Lainnya</h1>
                <div css={[styles.card_body]}>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Agama *</p>
                        <Field
                            name="country"
                            placeholder="Pilih Agama"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Status Perkawinan</p>
                        <Field
                            name="country"
                            placeholder="Kawin / Belum Kawin"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Pekerjaaan </p>
                        <Field
                            name="country"
                            placeholder="Pekerjaan"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Pendidikan Terakhir *</p>
                        <Field
                            name="country"
                            placeholder="Jenjang Pendidikan"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Email</p>
                        <Field
                            name="email"
                            placeholder="Contoh: alamatemail@emailwebsite.com"
                            component={Input}
                            type="email"
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>No. Telp / HP / WhatsApp </p>
                        <Field
                            name="email"
                            placeholder="Contoh: 080011112222"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Foto KTP *</p>
                        <Field
                            name="email"
                            placeholder="Foto KTP"
                            component={Input}
                        />
                    </Column>
                    <Column col={[6]} >
                        <p css={[styles.text]}>Foto Diri * </p>
                        <Field
                            name="email"
                            placeholder="Foto Diri"
                            component={Input}
                        />
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
