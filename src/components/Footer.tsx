import React from "react";
import styled from "styled-components";

const Footer = () => {
  const getFooterText = () => {
    const currentYear = new Date().getFullYear();

    if (currentYear === 2024) {
      return `Copyright © ${currentYear} Made By Mukho. All rights reserved.`;
    } else {
      return `Copyright © ${currentYear} - ${currentYear} Made By Mukho. All rights reserved.`;
    }
  };

  return (
    <FooterContainer>
      <FooterText>{getFooterText()}</FooterText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 1.5rem;
  background-color: #e0e0e0;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.9;
  color: #000;
`;

export default Footer;
