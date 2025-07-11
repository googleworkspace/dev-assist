# @googleworkspace/card-dev-assist

[![npm version](https://img.shields.io/npm/v/%40googleworkspace%2Fcard-dev-assist)](https://www.npmjs.com/package/@googleworkspace/card-dev-assist)
![NPM Downloads](https://img.shields.io/npm/dm/%40googleworkspace%2Fcard-dev-assist)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/googleworkspace/dev-assist)
![GitHub last commit](https://img.shields.io/github/last-commit/googleworkspace/dev-assist)
![GitHub License](https://img.shields.io/github/license/googleworkspace/dev-assist)
[![Test](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/test.yml)
[![Release](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml/badge.svg)](https://github.com/googleworkspace/dev-assist/actions/workflows/release.yml)

A utility library for generating previews of Google card components. This package provides tools to render and visualize card cards, making it easier to develop and test Google Workspace Add-ons.

## Features

- Generate image previews of card cards
- Easy to integrate into testing and development workflows
- Helps ensure visual consistency and correctness of UI components

## Usage

The primary function `getScreenshot` allows you to convert a card card object into a PNG image.

```typescript
import { getScreenshot } from "@googleworkspace/card-dev-assist";

const card = {
  action: {
    link: {
      url: "https://www.example.com",
    },
  },
  widgets: [
    {
      text: {
        content: "Hello, world!",
      },
    },
  ],
};

const base64Data = await getScreenshot(card);
```
