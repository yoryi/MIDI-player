import { css, Global } from "@emotion/react"
import { useTheme } from "../../hooks/useTheme"

export const GlobalCSS = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        html {
          font-size: 16px;
        }

        html,
        body {
          height: 100%;
          margin: 0;
        }

        body {
          -webkit-font-smoothing: subpixel-antialiased;
          color: ${theme.textColor};
          background-color: ${theme.backgroundColor};
          overscroll-behavior: none;
          font-family: ${theme.font};
          font-size: 0.75rem;
          overflow-y: hidden;
        }

        #root {
          position: relative;
          height: calc(100vh - 4px);
          border: 2px solid #CCC;
          border-radius: 20px;
        }
        #root::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          width: 100%;
          height: 50px;
          border-radius: 20px 20px 0 0;
          border: 2px solid #CCC;
          z-index: 1;
        }

        div,
        label,
        button,
        canvas,
        section,
        a,
        p,
        header,
        footer,
        ul,
        li {
          user-select: none;
          -webkit-user-select: none;
          -webkit-user-drag: none;
        }
      `}
    />
  )
}
