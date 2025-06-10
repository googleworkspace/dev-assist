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

An MCP (Model Context Protocol) server that provides tools for accessing and searching Google Workspace documentation. This server enables AI assistants and other tools to retrieve up-to-date information about Google Workspace APIs and services.

- [Tools](#tools)
  - [`search_latest_official_google_documentation`](#search_latest_official_google_documentation)
  - [`read_official_google_documentation_page`](#read_official_google_documentation_page)
  - [`preview_google_workspace_card`](#preview_google_workspace_card)
- [Resources](#resources)
  - [`docs://instructions`](#docsinstructions)
  - [`docs://release-notes`](#docsrelease-notes)
  - [`docs://newsletters`](#docsnewsletters)
- [Usage](#usage)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
  - [Run the server locally](#run-the-server-locally)

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
