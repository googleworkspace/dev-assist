# Google Workspace UIKit

[![npm version](https://badge.fury.io/js/%40googleworkspace%2Fuikit-dev-assist.svg)](https://www.npmjs.com/package/@googleworkspace/uikit-dev-assist)

A utility library for generating previews of Google UIkit components. This package provides tools to render and visualize UIkit cards, making it easier to develop and test Google Workspace Add-ons.

## Features

- Generate image previews of UIkit cards
- Easy to integrate into testing and development workflows
- Helps ensure visual consistency and correctness of UI components

## Usage

The primary function `cardToPng` allows you to convert a UIkit card object into a PNG image.

```typescript
import { getScreenshot } from "@googleworkspace/uikit-dev-assist";

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
