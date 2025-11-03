import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center mt-auto py-4">
      <Container>
        <p className="mb-0">
          Contact us: 12345678765
        </p>
        <p className="mb-0">
          &copy; 2025 FreshFood Mart. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;