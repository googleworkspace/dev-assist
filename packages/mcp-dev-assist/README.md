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

Generates a preview of a Google Workspace Card. Use this tool to visualize how a card will look in Google Workspace applications.

> **Note**: Not all MCP clients support rendering images returned by MCP tools, so the preview may not be visible in all clients. However, a successful response indicates that the card is valid and can be rendered in Google Workspace applications.

**Parameters:**

- `card` (object): The Google Workspace Card JSON object.

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

> **Note**: Resources are not available in all MCP clients.

## Usage

This package requires a Google API Key with Custom Search API enabled and a Google Custom Search Engine ID. These should be provided as environment variables to the server.

The `GOOGLE_SEARCH_ENGINE_ID` can be set to this search engine ID: `701ecba480bf443fa`. This search engine is configured to search across all Google Workspace documentation using the following sites:

```xml
<?xml version="1.0" encoding="UTF-8"?><Annotations>
  <Annotation about="developers.google.com/apps-script/*" timestamp="0x00063584435f37fd" score="1.0">
    <Label name="_include_"/>
    <AdditionalData attribute="original_url" value="developers.google.com/apps-script/*"/>
  </Annotation>
  <Annotation about="developers.google.com/workspace/*" timestamp="0x00063480a0b76c0d" score="1.0">
    <Label name="_include_"/>
    <AdditionalData attribute="original_url" value="developers.google.com/workspace/*"/>
  </Annotation>
</Annotations>
```

The `GOOGLE_API_KEY` should be set to your Google API Key that has access to the Custom Search API. Enable the Custom Search API in your Google Cloud project and obtain an API key from the Google Cloud Console. See the [Google Custom Search API documentation](https://developers.google.com/custom-search/v1/overview) for more details on how to set this up.

> Custom Search JSON API provides 100 search queries per day for free. If you need more, you may sign up for billing in the API Console. Additional requests cost $5 per 1000 queries, up to 10k queries per day.

This package can be used as a `stdio` server or as an `http` server.

### Streamable HTTP Transport

To run the server in `http` mode, you can run `npx @googleworkspace/mcp-dev-assist` with the following environment variables set:

- `GOOGLE_API_KEY`: `Your Google API Key with Custom Search API enabled`.
- `GOOGLE_SEARCH_ENGINE_ID`: `701ecba480bf443fa`.

Here is an example of how to configure an MCP client to use this server via `http`:

```json
{
  "type": "streamable-http",
  "url": "http://localhost:8080/mcp"
}
```

### Stdio Transport

Here is an example of how to configure an MCP client to use this server via `stdio`:

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

### Hosted MCP Server

Coming soon!

We will provide a hosted version of this MCP server that you can use without needing to run it locally. Stay tuned for updates and follow this issue for more details: https://github.com/googleworkspace/dev-assist/issues/24
