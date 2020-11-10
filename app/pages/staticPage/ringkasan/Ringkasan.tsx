/** @jsx jsx */
import Card from 'components/deskstop/Card/Card'
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Ringkasan.styles';
import { Theme } from '../../../components/base/src/theme';
import { getRingkasan } from '../../../client/RingkasanClient'

const Ringkasan = () => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const [datas, setDatas] = useState<any>(false)
    const [total, setTotal] = useState<any>(false)
    const [age, setAge] = useState<any>(false)
    const [location, setLocation] = useState<any>(false)
    const toArray = (params: any) => Object.keys(params)


    const _handleGetRingkasan = async () => {
        const { data } = await getRingkasan()
        setDatas(data)
        setTotal(data?.total)
        setAge(toArray(data?.age))
        setLocation(toArray(data?.location))
    }

    useEffect(() => {
        _handleGetRingkasan()
    }, [])

    return (
        <Card transparent>
            <div css={[styles.ringkasan__container]}>
                <div>
                    <div css={[styles.white__card__custom]}>
                        <h2 css={[styles.heading]}>Total Data</h2>
                        <span css={[styles.number__total__data]}>{total && total['se-Indonesia']} KTA</span>
                        <span css={[styles.se__indonesia]}>se-Indonesia</span>
                    </div>
                    <div css={[styles.white__card__custom]}>
                        <h1 css={[styles.heading]}>Sebaran Usia</h1>

                        {age &&
                            age?.map((v: string, i: number) => {
                                return (
                                    <div key={i} css={[styles.odd__row]}>
                                        <div>{v}</div>
                                        <div>{datas?.age[v]}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>

                    <div css={[styles.white__card__custom]}>
                        <h1 css={[styles.heading]}>Sebaran Domisili</h1>
                        {location &&
                            location?.map((v: string, i: number) => {
                                return (
                                    <div key={i} css={[styles.odd__row]}>
                                        <div>{v}</div>
                                        <div>{datas?.location[v]}</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div css={[styles.white__card__custom]}>
                        <h1 css={[styles.heading]}>Laki-laki : Perempuan</h1>
                        <div css={[styles.odd__row__jenis_kelamin]}>
                            <div css={[styles.angka__laki__laki__typography]}>{datas && datas?.gender['Laki-laki']}</div>
                            <div css={[styles.laki__laki__typography]}>Laki-laki</div>
                        </div>
                        <div css={[styles.even__row__jenis__kelamin]}>
                            :
                    </div>
                        <div css={[styles.odd__row__jenis_kelamin]}>
                            <div css={[styles.angka__perempuan__typography]}>{datas && datas?.gender['Perempuan']}</div>
                            <div css={[styles.perempuan__typography]}>Perempuan</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Ringkasan
