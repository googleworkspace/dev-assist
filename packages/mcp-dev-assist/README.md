# @googleworkspace/mcp-dev-assist

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
- Fetch official Google Workspace documentation and snippets

To get started, you can add this server to your MCP client configuration.

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@googleworkspace/mcp-dev-assist"]
}
```

### Hosted MCP Server

Coming soon!

We will provide a hosted version of this MCP server that you can use without needing to run it locally. Stay tuned for updates and follow this issue for more details: https://github.com/googleworkspace/dev-assist/issues/24
