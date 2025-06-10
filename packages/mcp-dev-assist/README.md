# @googleworkspace/mcp-dev-assist

[![npm version](https://img.shields.io/npm/v/%40googleworkspace%2Fmcp-dev-assist)](https://www.npmjs.com/package/@googleworkspace/mcp-dev-assist)
![NPM Downloads](https://img.shields.io/npm/dm/%40googleworkspace%2Fmcp-dev-assist)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/googleworkspace/dev-assist)
![GitHub last commit](https://img.shields.io/github/last-commit/googleworkspace/dev-assist)
![GitHub License](https://img.shields.io/github/license/googleworkspace/dev-assist)
[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)

An MCP (Model Context Protocol) server that provides tools for accessing and searching Google Workspace documentation. This server enables AI assistants and other tools to retrieve up-to-date information about Google Workspace APIs and services.

## Features

- Search Google Workspace documentation
- Read official Google Workspace documentation pages
- Access release notes and updates
- Simple integration with any MCP-compatible client supporting `Streamable HTTP` requests and a legacy `SSE` endpoint.

## Usage

### Prerequisites

- Google API Key with Custom Search API enabled
- Google Custom Search Engine ID

### Configuration

Set the following environment variables:

```bash
export GOOGLE_API_KEY=your_api_key_here
export GOOGLE_SEARCH_ENGINE_ID=701ecba480bf443fa  # You can customize this
```

### Run the server locally

```bash
pnpx @googleworkspace/mcp-dev-assist
```

This exposes an MCP server on `http://localhost:8080/mcp` for `Streamable HTTP` requests and a legacy `SSE` endpoint at `http://localhost:8080/`.

A hosted version will be available soon!
