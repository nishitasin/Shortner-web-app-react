// Component for URL shortening form
import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Link } from '@mui/material';
import { Log } from '../middleware/logger';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  Log('frontend', 'debug', 'component', 'Layout component rendered.');
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <nav>
            <Link href="/" color="inherit" sx={{ ml: 2 }}>
              Shorten URL
            </Link>
            <Link href="/stats" color="inherit" sx={{ ml: 2 }}>
              Statistics
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
