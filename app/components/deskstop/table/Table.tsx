/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Table.styles'
import { Theme } from '../../base/src/theme';

type iProps = {
    dataDomains: Array
}

const Table: React.FC<iProps> = (props) => {
    const { dataDomains = [] } = props
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    return (
        <div css={[styles.table__container]}>
            <table css={[styles.table]}>
                <thead css={[styles.table__thead]}>
                    <tr>
                        <th className="col-domain">
                            <a className="nc-grid-ordering" href="#">NIK</a>
                        </th>
                        <th className="col-close">
                            <a className="nc-grid-ordering" href="#">Nama Lengkap</a>
                        </th>
                        <th className="col-close">
                            <a className="nc-grid-ordering" href="#">Alamat</a>
                        </th>
                        <th className="col-price">
                            <a className="nc-grid-ordering" href="#">Aksi</a>
                        </th>
                    </tr>
                </thead>
                <tbody className="panel-body">
                    {dataDomains.length > 0 ?
                        dataDomains.map((v: any, i: number) => {
                            return (
                                <tr>
                                    <td><a className="link-gray" href="/domains/marketplace/listing/91783835/"><span className="name">{v.Name}</span></a></td>
                                    <td><span className="closing-on">Closing On {v.ClosingOn}</span></td>
                                    <td className="text-right">
                                        <span className="padding-right-0-5x">${v.Price}</span>
                                        <a className="btn btn-grey btn-lg" rel="nofollow" href="/cart/addtocart.aspx?action=purchase&amp;producttype=marketplace&amp;mpid=91783835"> <img className="cart-icon" src='/icons8-add-shopping-cart-26.png' /> </a>
                                    </td>
                                </tr>
                            )
                        }) :
                        <tr>
                            <td colSpan={3}>
                                There are no items to display
                    </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Table
