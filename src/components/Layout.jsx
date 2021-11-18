import { Container } from 'react-bootstrap';

import { Header } from './Header';

export const Layout = ({ children }) => (
  <>
    <Header />
    <main>
      <Container>{children}</Container>
    </main>
  </>
);
