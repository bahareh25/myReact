import React, { Component } from 'react'
import { ThemeContext, themes } from './context/them-context';
import ThemeTogglerButton from './context/themed-button';
import ThemeTogglerButtonTwo from './context/themed-button-two';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
      this.state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme,
      };
    
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeTogglerButton />
        <ThemeTogglerButtonTwo />
      </ThemeContext.Provider>
    );
  }
}

export default App;