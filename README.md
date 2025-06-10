# Google Workspace Developer Assist

[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![GitHub issues](https://img.shields.io/github/issues/googleworkspace/mcp-dev-assist?style=flat-square)](https://github.com/googleworkspace/mcp-dev-assist/issues)

This is a monorepo for the Google Workspace Developer Assist project.

## Packages

### `@googleworkspace/mcp-dev-assist`

An MCP (Model Context Protocol) server that provides tools for accessing and searching Google Workspace documentation. This server enables AI assistants and other tools to retrieve up-to-date information about Google Workspace APIs and services.

See [packages/mcp-dev-assist/README.md](packages/mcp-dev-assist/README.md) for more details.

### `@googleworkspace/uikit-dev-assist`

A utility library for generating previews of Google UIkit components.

See [packages/uikit/README.md](packages/uikit/README.md) for more details.

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

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For support, please [open an issue](https://github.com/googleworkspace/mcp-dev-assist/issues) on GitHub.
