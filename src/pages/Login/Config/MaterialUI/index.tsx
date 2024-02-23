import { createTheme, ThemeProvider } from '@mui/material/styles';

// Typography
import { Typograph, TypographComponents } from './Typography';

const theme = createTheme({
    typography: Typograph,
    palette: {
        primary: {
            main: '#1a8383'
        },
        secondary: {
            main: '#ffc403'
        }
    },
    components: {...TypographComponents,
        MuiButton: {
            defaultProps: {
                sx: {
                    padding:'14px'
                }
            }
        }
    }
});

export const MaterialUIThemeProvider = ({ children }: React.PropsWithChildren) => (
    <ThemeProvider theme={theme} >
        {children}
    </ThemeProvider>
)