/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Header.styles';
import { Theme } from '../../../components/base/src/theme';
import pksLogo from '../../../components/base/src/img/logo-71x100.png'

const Header: React.FC = (props) => {
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    const { children } = props
    return (
        <div>
            <header css={[styles.header]}>
                <img css={[styles.image__header]} src={pksLogo} />
                <p css={[styles.header__text]}>Admin Dasbor KTA <br />Partai Keadilan Sejahtera</p>
                <div css={[styles.header__separator__black]}></div>
            </header>
            {children}
        </div>
    )
}

export default Header
