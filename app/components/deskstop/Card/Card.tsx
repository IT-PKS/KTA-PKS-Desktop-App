/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Card.styles'
import { Theme } from '../../base/src/theme';
import { useTemplateDataContext } from '../../contextual/TemplateDataProvider'

type iProps = {
    transparent: boolean
}

const Card: React.FC<iProps> = (props) => {
    const { children, transparent } = props
    const { isOpenMenu } = useTemplateDataContext()
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <div css={[styles.content__bacground]}>
            <div css={[
                styles.content, isOpenMenu || styles.content__minimize,
                transparent ? styles.content__transparent : styles.content__bg__white
            ]}>
                {children}
            </div>
        </div>
    )
}

export default Card
