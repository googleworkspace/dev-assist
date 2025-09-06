**NOTE:** Refactor in progress. This code is not currently functional. Please submit issues with ideas and feedback.

---

# Google Workspace Developer Assist

[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![GitHub issues](https://img.shields.io/github/issues/googleworkspace/mcp-dev-assist?style=flat-square)](https://github.com/googleworkspace/mcp-dev-assist/issues)

This is a monorepo for the Google Workspace Developer Assist project.

## Packages

<!-- packages -->

- [@googleworkspace/card-dev-assist](./packages/card-dev-assist) - Utility functions for Google Workspace card development.

- [@googleworkspace/mcp-dev-assist](./packages/mcp-dev-assist) - An MCP (Model Context Protocol) server for accessing and searching Google Workspace documentation, enabling AI assistants and tools to retrieve up-to-date information.

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
