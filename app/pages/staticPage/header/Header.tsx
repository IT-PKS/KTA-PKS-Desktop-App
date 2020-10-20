/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Header.styles';
import { Theme } from '../../../components/base/src/theme';
import pksLogo from '../../../components/base/src/img/logo-71x100.png'
import { Icon } from 'kta-ui-components'

type iProps = {
    onLogout(): any
}

const Header: React.FC<iProps> = (props) => {
    const { onLogout } = props
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const { children } = props
    return (
        <Fragment>
            <header css={[styles.header]}>
                <img css={[styles.image__header]} src={pksLogo} />
                <p css={[styles.header__text]}>Admin Dasbor KTA <br />Partai Keadilan Sejahtera</p>
                <div css={[styles.header__separator__black]}></div>
                <div css={[styles.user__icon__container]}>
                    <Icon name="user-circle" size="3x" />&nbsp;&nbsp;
                </div>
                <div css={[styles.user__name__container]}>
                    <div css={[styles.dropdown]} className="dropdown">
                        <span>
                            {localStorage.getItem('user')?.replace(/"/g, '')}
                        </span>
                        <div css={[styles.dropdown__content]} className="dropdown-content">
                            <p onClick={onLogout}>logout</p>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </Fragment>
    )
}

export default Header
