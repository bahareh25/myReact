import React from 'react'
import { ThemeContext } from './them-context';



function ThemeTogglerButtonTwo() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}>
          Change Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButtonTwo;