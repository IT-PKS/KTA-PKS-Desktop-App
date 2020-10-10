/** @jsx jsx */
import Card from 'components/deskstop/Card/Card'

import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Ringkasan.styles';
import { Theme } from '../../../components/base/src/theme';

const Ringkasan = () => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
        <Card transparent>
            <div css={[styles.ringkasan__container]}>
                <div css={[styles.white__card__custom]}>
                    <h2 css={[styles.heading]}>Total Data</h2>
                    <span css={[styles.number__total__data]}>123.353.243 KTA</span>
                    <span css={[styles.se__indonesia]}>se-Indonesia</span>
                </div>
                <div css={[styles.white__card__custom]}>
                    <h1 css={[styles.heading]}>Sebaran Domisili</h1>
                    <div>
                        <p>{`<30`}</p>
                        <p>4.738.035</p>
                    </div>
                </div>
                <div css={[styles.white__card__custom]}>
                    <h1 css={[styles.heading]}>Sebaran Usia</h1>
                    <div>
                        <p>DKI Jakarta</p>
                        <p>12.603.549</p>
                    </div>
                </div>
                <div css={[styles.white__card__custom]}>
                    <h1 css={[styles.heading]}>Laki-laki : Perempuan</h1>
                    <div>
                        <p>71.021.173</p>
                        <p>Laki-laki</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Ringkasan
