import { createMuiTheme } from '@material-ui/core/styles';

//Global Style for Components
export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        boxShadow: '0 4px 4px rgba(83, 103, 239, 0.25)',
        borderRadius: '0 12px 12px 12px',
        border: '1px solid transparent',
        height: '45px',
        minWidth: '150px',
        fontSize: '1rem'
      }
    }
  },

  palette: {
    primary: {
      light: '',
      main: '#5367ef',
      dark: '#1b1ee6',
      contrastText: '',
    },
    // secondary: '#5367ef',
    // error: '',
  }
})