/** @jsx jsx */
import React, { useState } from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Sidebar.styles';
import { Theme } from '../../../components/base/src/theme';
import { Icon } from 'kta-ui-components'
import { useTemplateDataContext } from '../../../components/contextual/TemplateDataProvider'

const Sidebar: React.FC<iProps> = (props) => {
    const { onLogout } = props;
    const { isOpenMenu, onMinimizeMenu } = useTemplateDataContext()
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);

    const menus = [
        { title: 'Ringkasan', icon: "list", active: false },
        { title: 'Tambah Data', icon: "plus-circle", active: false },
        { title: 'Validasi', icon: "check-circle", active: false },
        { title: 'Data KTA', icon: "id-card", active: false },
        { title: 'Laporan', icon: "chart-line", active: false },
    ]

    const _handleMinimizeMenu = () => {
        onMinimizeMenu(!isOpenMenu)
    }

    return (
        <div css={[styles.sidebar]}>
            <ul css={[styles.sidebar_menus, isOpenMenu || styles.sidebar_menus__close, styles.sidebar_menus__responsive]}>
                {
                    menus.map((v, i) => {
                        return (
                            <li key={i} css={[styles.menu, isOpenMenu || styles.menu__close, styles.menu__responsive]}>
                                <Icon icon={`${v.icon}`} size="2x" />
                                <div>
                                    <p>{v.title}</p>
                                </div>
                            </li>
                        )
                    })
                }
                <div css={[styles.sidebar_minimize, isOpenMenu || styles.sidebar_minimize__close, styles.sidebar_minimize__responsive]} onClick={_handleMinimizeMenu}>
                    <Icon icon={isOpenMenu ? 'chevron-left' : 'chevron-right'} css={[styles.icon_chevron_left]} />
                </div>
            </ul>
            <div css={[styles.bottom__menu, isOpenMenu || styles.bottom__menu_minimize, styles.bottom__menu_responsive]}>
                <div css={[styles.settings]}>
                    <Icon icon="cog" css={[styles.icon_settings, isOpenMenu || styles.icon_settings_minimize, styles.icon_settings_responsive]} size="2x" />
                    <p>Settings</p>
                </div>
                <div css={[styles.logout]} onClick={onLogout}>
                    <Icon icon="sign-in-alt" css={[styles.icon_logout]} size="2x" />
                    <p>Sign Out</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
