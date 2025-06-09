# Google Workspace MCP Dev Assist

[![npm version](https://badge.fury.io/js/%40googleworkspace%2Fmcp-dev-assist.svg)](https://badge.fury.io/js/%40googleworkspace%2Fmcp-dev-assist)

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
