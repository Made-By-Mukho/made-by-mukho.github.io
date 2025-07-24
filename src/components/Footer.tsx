import React from "react";
import styled from "styled-components";

const Footer = () => {
  const getFooterText = () => {
    const currentYear = new Date().getFullYear();

    if (currentYear === 2024) {
      return `Copyright © ${currentYear} Mukho. All rights reserved.`;
    } else {
      return `Copyright © 2024 - ${currentYear} Mukho. All rights reserved.`;
    }
  };

  return (
    <FooterContainer>
      <VisitorCounter>
        <img
          src="https://hits.sh/made-by-mukho.github.io.svg"
          alt="방문자 수"
        />
      </VisitorCounter>
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

const VisitorCounter = styled.div`
  margin-bottom: 1rem;

  img {
    height: 20px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  opacity: 0.9;
  color: #000;
`;

export default Footer;
