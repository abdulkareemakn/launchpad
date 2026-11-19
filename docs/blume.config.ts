import { defineConfig } from "blume";

export default defineConfig({
  title: "Launchpad",
  description:
    "A MERN starter with foundations and guides for setup, building, and deployment.",

  logo: "/launchpad.svg",

  footer: {
    copyright: "© 2026 Abdul Kareem",
    links: [
      {
        label: "MIT License",
        href: "https://github.com/abdulkareemakn/launchpad/blob/main/LICENSE",
      },
    ],
  },

  github: {
    owner: "abdulkareemakn",
    repo: "launchpad",
    branch: "main",
    dir: "docs",
  },

  theme: {
    accent: "#258ea6",
    fonts: {
      display: "ibm-plex-sans",
      body: "ibm-plex-sans",
      mono: "ibm-plex-mono",
    },
  },

  navigation: {
    tabs: [
      { label: "Home", path: "/" },
      { label: "Start here", path: "/installation" },
      { label: "Build", path: "/build" },
      { label: "Code quality", path: "/quality" },
      { label: "Deployment", path: "/deployment" },
      { label: "Reference", path: "/reference" },
    ],
  },
});
