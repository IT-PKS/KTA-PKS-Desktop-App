/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import createStyles from './Card.styles'
import { Theme } from '../../base/src/theme';
import { useTemplateDataContext } from '../../contextual/TemplateDataProvider'

const Card: React.FC = (props) => {
    const { children, } = props
    const { isOpenMenu } = useTemplateDataContext()
    const theme = useTheme<Theme>();
    const styles = createStyles(theme);
    return (
        <div css={[styles.content__bacground]}>
            <div css={[styles.content, isOpenMenu || styles.content__minimize]}>
                {children}
            </div>
        </div>
    )
}

export default Card
