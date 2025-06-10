# @googleworkspace/mcp-dev-assist

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

## Tools

This server provides the following tools:

### `search_latest_official_google_documentation`

Searches the latest official Google Workspace documentation, including API references, conceptual guides, tutorials, and code examples. Ideal for finding authoritative and up-to-date information on Google Workspace APIs, directly from the source.

**Parameters:**

- `query` (string): Specific Google Workspace topic, API, method, or feature to search for.

**Example:**

```json
{
  "tool": "search_latest_official_google_documentation",
  "query": "Google Sheets API append values"
}
```

### `read_official_google_documentation_page`

Reads a specific Google developer documentation page. Use this when you need to read a specific documentation page instead of using a web browser.

**Parameters:**

- `link` (string): The URL of the documentation page to read. Must be a `developers.google.com` or `cloud.google.com` URL.

**Example:**

```json
{
  "tool": "read_official_google_documentation_page",
  "link": "https://developers.google.com/workspace/add-ons/overview"
}
```

### `preview_google_workspace_card`

Generates a preview of a Google Workspace UI Kit card. Use this tool to visualize how a card will look in Google Workspace applications.

**Parameters:**

- `card` (object): The Google Workspace UI Kit card JSON object.

**Example:**

```json
{
  "tool": "preview_google_workspace_card",
  "card": {
    "header": {
      "title": "My Card"
    },
    "sections": [
      {
        "widgets": [
          {
            "textParagraph": {
              "text": "Hello, world!"
            }
          }
        ]
      }
    ]
  }
}
```

## Resources

This server provides the following resources:

### `docs://instructions`

Provides instructions on how to best use the tools provided by this server.

### `docs://release-notes`

Provides the latest release notes for Google Workspace products.

### `docs://newsletters`

Provides access to the Google Workspace Developer newsletters.

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
