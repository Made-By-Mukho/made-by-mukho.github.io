import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Made By Mukho</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTitle = styled.h1`
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export default Header;
