import baseConfig from "./vitest.config.ts";

export default {
  ...baseConfig,
  test: {
    ...baseConfig.test,
    globalSetup: ["./tests/integration/global-setup.ts"],
  },
};
