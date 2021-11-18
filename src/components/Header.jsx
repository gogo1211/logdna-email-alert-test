import Image from 'next/image';
import { Navbar, Container } from 'react-bootstrap';

export const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <Image
          src="https://assets-global.website-files.com/603024253162e837e0c31b6f/60487966235fa055a05d4285_Group.png"
          width="123"
          height="40"
          alt="logdna"
        />
      </Navbar.Brand>
    </Container>
  </Navbar>
);
