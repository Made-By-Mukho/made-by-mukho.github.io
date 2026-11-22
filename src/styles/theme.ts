export const theme = {
  colors: {
    primary: "#9370DB",
    secondary: "#424769",
    accent: "#7077A1",
    background: "#F6F6F6",
    white: "#FFFFFF",
    text: {
      primary: "#2D3250",
      secondary: "#424769",
      light: "#7077A1",
    },
  },
  shadows: {
    small: "0 2px 4px rgba(0,0,0,0.1)",
    medium: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

export const discographyTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#0D0D11",
    surface: "#15151D",
    surfaceElevated: "#1B1A27",
    surfaceFooter: "#09090C",
    border: "rgba(255, 255, 255, 0.08)",
    borderAccent: "rgba(147, 112, 219, 0.45)",
    releaseGrades: {
      "Full Album": "#8A7E80",
      EP: "#FF890A",
      Single: "#9370DB",
    },
    text: {
      ...theme.colors.text,
      primary: "#F3F3F7",
      secondary: "#CFCFE0",
      light: "#8E8EA0",
      accent: "#B79CF7",
    },
  },
  shadows: {
    ...theme.shadows,
    vinyl: "0 10px 28px rgba(0, 0, 0, 0.65)",
    dock: "0 -8px 24px rgba(0, 0, 0, 0.5)",
  },
};

