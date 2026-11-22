import React from "react";
import styled from "styled-components";

interface HeaderProps {
  isDiscography?: boolean;
  onToggleVersion?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDiscography = true,
  onToggleVersion,
}) => {
  return (
    <HeaderContainer $isDiscography={isDiscography}>
      <HeaderInner>
        <HeaderTitle>Made By Mukho</HeaderTitle>
        {onToggleVersion && (
          <VersionToggleButton
            type="button"
            role="switch"
            aria-checked={isDiscography}
            aria-label="UI 버전 전환"
            $isDiscography={isDiscography}
            onClick={onToggleVersion}
          >
            <ToggleOption $active={isDiscography}>디스코그래피</ToggleOption>
            <ToggleOption $active={!isDiscography}>구버전</ToggleOption>
          </VersionToggleButton>
        )}
      </HeaderInner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header<{ $isDiscography: boolean }>`
  padding: 1rem;
  background-color: ${({ theme, $isDiscography }) =>
    $isDiscography ? "#12111a" : theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border-bottom: ${({ $isDiscography }) =>
    $isDiscography ? "1px solid rgba(147, 112, 219, 0.28)" : "none"};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.2s ease;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const HeaderTitle = styled.h1`
  margin: 0;
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

const VersionToggleButton = styled.button<{ $isDiscography: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid
    ${({ $isDiscography }) =>
      $isDiscography
        ? "rgba(147, 112, 219, 0.45)"
        : "rgba(255, 255, 255, 0.45)"};
  background-color: ${({ $isDiscography }) =>
    $isDiscography ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.16)"};
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ $isDiscography }) =>
      $isDiscography
        ? "rgba(147, 112, 219, 0.8)"
        : "rgba(255, 255, 255, 0.75)"};
  }
`;

const ToggleOption = styled.span<{ $active: boolean }>`
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ $active }) =>
    $active ? "#ffffff" : "rgba(255, 255, 255, 0.72)"};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 4px rgba(0, 0, 0, 0.25)" : "none"};
  transition: background-color 0.18s ease, color 0.18s ease;

  @media (max-width: 768px) {
    padding: 0.24rem 0.58rem;
    font-size: 0.74rem;
  }
`;

export default Header;
