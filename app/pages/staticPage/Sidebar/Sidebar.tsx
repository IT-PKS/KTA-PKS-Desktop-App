/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Sidebar.styles';
import { Theme } from '../../../components/base/src/theme';
import { Icon } from 'kta-ui-components'
import { useTemplateDataContext } from '../../../components/contextual/TemplateDataProvider'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = (props) => {
    const location = useLocation()
    const { isOpenMenu, onMinimizeMenu } = useTemplateDataContext()
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    const menus = [
        { title: 'Ringkasan', icon: "list", active: false, path: '/ringkasan' },
        { title: 'Tambah Data', icon: "plus-circle", active: false, path: '/' },
        { title: 'Validasi', icon: "check-circle", active: false, path: '/validasi' },
        { title: 'Data KTA', icon: "id-card", active: false, path: '/data-kta' },
        { title: 'Laporan', icon: "chart-line", active: false, path: '/laporan' }
    ]

    const _handleMinimizeMenu = () => {
        onMinimizeMenu(!isOpenMenu)
    }

    return (
        <Fragment>
            <ul css={[styles.sidebar_menus, isOpenMenu || styles.sidebar_menus__close, styles.sidebar_menus__responsive]}>
                {
                    menus.map((v, i) => {
                        return (
                            <Link key={i} to={v.path} >
                                <li
                                    className={`${location.pathname === v.path && 'active'}`} css={[styles.menu, isOpenMenu || styles.menu__close, styles.menu__responsive]}>
                                    <Icon name={`${v.icon}`} size="2x" />
                                    <div>
                                        <p>{v.title}</p>
                                    </div>
                                </li>
                            </Link>
                        )
                    })
                }
                <div css={[styles.sidebar_minimize, isOpenMenu || styles.sidebar_minimize__close, styles.sidebar_minimize__responsive]} onClick={_handleMinimizeMenu}>
                    <Icon name={isOpenMenu ? 'chevron-left' : 'chevron-right'} css={[styles.icon_chevron_left]} />
                </div>
            </ul>
        </Fragment>
    )
}

export default Sidebar;
