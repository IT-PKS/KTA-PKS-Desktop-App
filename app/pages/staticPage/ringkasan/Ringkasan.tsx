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
                <div>
                    <div css={[styles.white__card__custom]}>
                        <h2 css={[styles.heading]}>Total Data</h2>
                        <span css={[styles.number__total__data]}>123.353.243 KTA</span>
                        <span css={[styles.se__indonesia]}>se-Indonesia</span>
                    </div>
                    <div css={[styles.white__card__custom]}>
                        <h1 css={[styles.heading]}>Sebaran Usia</h1>
                        <div css={[styles.odd__row]}>
                            <div>{`< 30`}</div>
                            <div>12.603.549</div>
                        </div>
                        <div css={[styles.even__row]}>
                            <div>{`20 - 29`}</div>
                            <div>12.603.549</div>
                        </div>
                        <div css={[styles.odd__row]}>
                            <div>{`30 - 39`}</div>
                            <div>12.603.549</div>
                        </div>
                    </div>
                </div>
                <div>

                    <div css={[styles.white__card__custom]}>
                        <h1 css={[styles.heading]}>Sebaran Domisili</h1>
                        <div css={[styles.odd__row]}>
                            <div>DKI Jakarta</div>
                            <div>4.738.035</div>
                        </div>
                        <div css={[styles.even__row]}>
                            <div>Aceh</div>
                            <div>4.738.035</div>
                        </div>
                        <div css={[styles.odd__row]}>
                            <div>Jawa Tengah</div>
                            <div>4.738.035</div>
                        </div>
                    </div>
                    <div css={[styles.white__card__custom]}>
                        <h1 css={[styles.heading]}>Laki-laki : Perempuan</h1>
                        <div css={[styles.odd__row__jenis_kelamin]}>
                            <div css={[styles.angka__laki__laki__typography]}>71.021.173</div>
                            <div css={[styles.laki__laki__typography]}>Laki-laki</div>
                        </div>
                        <div css={[styles.even__row__jenis__kelamin]}>
                            :
                    </div>
                        <div css={[styles.odd__row__jenis_kelamin]}>
                            <div css={[styles.angka__perempuan__typography]}>52.332.050</div>
                            <div css={[styles.perempuan__typography]}>Perempuan</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Ringkasan
