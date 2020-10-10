/** @jsx jsx */
import Card from 'components/deskstop/Card/Card'

import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Validasi.styles';
import { Theme } from '../../../components/base/src/theme';


const Validasi = () => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
        <Card>
            <h2 css={[styles.heading]}>Validasi KTA</h2>
        </Card>
    )
}

export default Validasi
