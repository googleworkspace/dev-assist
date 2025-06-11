# Google Workspace Developer Assist

[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![GitHub issues](https://img.shields.io/github/issues/googleworkspace/mcp-dev-assist?style=flat-square)](https://github.com/googleworkspace/mcp-dev-assist/issues)

This is a monorepo for the Google Workspace Developer Assist project.

## Packages

<!-- packages -->

### [@googleworkspace/card-dev-assist](packages/card-dev-assist)

[![npm version](https://img.shields.io/npm/v/%40googleworkspace%2Fcard-dev-assist)](https://www.npmjs.com/package/@googleworkspace/card-dev-assist)
![NPM Downloads](https://img.shields.io/npm/dm/%40googleworkspace%2Fcard-dev-assist)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/googleworkspace/dev-assist)
![GitHub last commit](https://img.shields.io/github/last-commit/googleworkspace/dev-assist)
![GitHub License](https://img.shields.io/github/license/googleworkspace/dev-assist)
[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)

A utility library for generating previews of Google card components. This package provides tools to render and visualize card cards, making it easier to develop and test Google Workspace Add-ons.

### [@googleworkspace/mcp-dev-assist](packages/mcp-dev-assist)

[![npm version](https://img.shields.io/npm/v/%40googleworkspace%2Fmcp-dev-assist)](https://www.npmjs.com/package/@googleworkspace/mcp-dev-assist)
![NPM Downloads](https://img.shields.io/npm/dm/%40googleworkspace%2Fmcp-dev-assist)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/googleworkspace/dev-assist)
![GitHub last commit](https://img.shields.io/github/last-commit/googleworkspace/dev-assist)
![GitHub License](https://img.shields.io/github/license/googleworkspace/dev-assist)
[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)

A [Model Context Protocol](https://modelcontextprotocol.io/), server that provides tools for accessing and searching Google Workspace documentation.

> The Model Context Protocol (MCP) is a standard that enables AI assistants to access external tools and data through a network of specialized servers.

This server enables AI assistants and other tools to:

- Retrieve up-to-date information about Google Workspace APIs and services
- Preview Google Workspace Cards

To get started, you can add this server to your MCP client configuration.

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@googleworkspace/mcp-dev-assist", "--stdio"],
  "env": {
    "GOOGLE_API_KEY": "YOUR_API_KEY",
    "GOOGLE_SEARCH_ENGINE_ID": "701ecba480bf443fa"
  }
}
```

> **Tip:** Try installing with `npm i -g @googleworkspace/mcp-dev-assist` to be able to debug installation issues.

See the [usage](https://github.com/googleworkspace/dev-assist/tree/main/packages/mcp-dev-assist#usage) section for more details on how to configure and run this server including HTTP transport options.

<!-- /packages -->

## Development

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for more information.

```bash
pnpm install
pnpm build
pnpm test
pnpm check
pnpm lint
```

To add a new version for a pull request, run:

```bash
pnpm changeset add
```

If changes are made to the documentation, you can update the documentation by running:

```bash
pnpm readme
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For support, please [open an issue](https://github.com/googleworkspace/mcp-dev-assist/issues) on GitHub.
