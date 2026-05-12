const light = {
  backgroundLightL: "#F8F9FA",
  backgroundLightD: "#FFFFFF",
  fontLight: "#344767",
  borderLight: "#E9ECEF",
  borderLight2: "#DEE2E6",
};

const dark = {
  // backgroundDarkL: "#1A1A1A",
  // backgroundDarkD: "#1d1d1d",
  // fontDark: "#aaaaaa",
  // borderDark: "#2C2C2E",
  // borderDark2: "#3A3A3C",
  // backgroundDarkL: "#1e1c1c", // leve, padrão moderno (tipo iOS)
  backgroundDarkL: "#1d1c1e", // leve, padrão moderno (tipo iOS)
  // backgroundDarkD: "#1b1515", // fundo principal (Material vibe)
  backgroundDarkD: "#18191c", // fundo principal (Material vibe)
  fontDark: "#b1b1b1",
  borderDark: "#2A2A2D", // borda sutil
  borderDark2: "#3A3A3C", // borda mais forte (igual você já usa)
};

export const colors = (darkMode) => {
  return {
    backgroundD: darkMode ? dark.backgroundDarkD : light.backgroundLightD,
    backgroundL: darkMode ? dark.backgroundDarkL : light.backgroundLightL,
    color: darkMode ? dark.fontDark : light.fontLight,
    borderColor: darkMode ? dark.borderDark : light.borderLight,
    borderColor2: darkMode ? dark.borderDark2 : light.borderLight2,
    accent: "#ed3237", // Cor de destaque/accent principal (vermelho da logo)
    accentLight: "rgba(237, 50, 55, 0.5)",
    colorBase: {
      red: "#DC2626",
      stackbloco: "#ed3237",
      yellow: "#F59E0B",
      green: "#059669",
      orange: "#fc5800",
      blue: "#3B82F6",
      redLight: "rgba(220, 38, 38, 0.5)",
      stackblocoLight: "rgba(237, 50, 55, 0.5)",
      yellowLight: "rgba(245, 158, 11, 0.5)",
      greenLight: "rgba(5, 150, 105, 0.5)",
      orangeLight: "rgba(234, 88, 12, 0.5)",
      blueLight: "rgba(59, 130, 246, 0.5)",
    },
    colorInvert: darkMode ? light.fontLight : dark.fontDark,
  };
};

export const themeStyle = (darkMode) => {
  return {
    ...colors(darkMode),

    // Espaçamentos modernos
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "48px",
    },

    // Bordas arredondadas
    borderRadius: {
      none: "0",
      sm: "6px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px",
    },

    // Sombras modernas
    shadow: {
      none: "none",
      xs: darkMode
        ? "0 1px 2px 0 rgba(0, 0, 0, 0.4)"
        : "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 3px 0 rgba(0, 0, 0, 0.06)",
      sm: darkMode
        ? "0 2px 4px 0 rgba(0, 0, 0, 0.4)"
        : "0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 4px 8px 0 rgba(0, 0, 0, 0.08)",
      md: darkMode
        ? "0 4px 8px -2px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4)"
        : "0 4px 8px -2px rgba(0, 0, 0, 0.06), 0 12px 16px -4px rgba(0, 0, 0, 0.08)",
      lg: darkMode
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      xl: darkMode
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 24px 48px -12px rgba(0, 0, 0, 0.12)",
    },

    // Transições suaves
    transition: {
      fast: "all 0.15s ease",
      base: "all 0.2s ease",
      slow: "all 0.3s ease",
    },

    // Tamanhos de fonte modernos
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
    },

    // Font weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    // Z-index padrões
    zIndex: {
      dropdown: 1000,
      modal: 1050,
      popover: 1060,
      tooltip: 1070,
    },
  };
};
