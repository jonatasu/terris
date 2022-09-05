# Contribution Guide

> **ATENTION:** Do not make code changes without having read this document

## Architectural standards

### Folder structure

├── dist
├── docs ... (*Documentation*)
├── node_modules
├── public
│   ├── img
├── src
│   ├── assets
│   │   ├── icons
│   │   ├── logo
│   ├── components ... (*Components at a global level*)
│   ├── plugins ... (*Vue Plugins, such as Vuetify*)
│   ├── router ... (*Vue Router*)
│   ├── service ... (*API Requests*)
│   ├── store ... (*Vuex*)
│   ├── views
│   │   ├── View
│   │   │   ├── components ... (*Components at a View level*)

### Vuex

To learn more about Vuex, see the [official documentation](https://vuex.vuejs.org/).

Using Vuex is intended to share global state in an organized way and should only be done when necessary.

## Style guide

See the [Vue Style Guide](https://v2.vuejs.org/v2/style-guide/index.html) for more information.

## Nomenclature

### General guidance

- Maintain consistent naming across the project. For JS files, use the format `my-feature.type.js`.

*Why?* Consistent naming decreases cognitive load on first contact with the project.

*Why?* `my-feature` snake-case is just a convention, with no advantages and disadvantages (but it must be followed for consistency). `type` refers to what that file represents. Examples below:

- banking-account.service.js
- tracking.service.js
- routes.config.js
- storage.constants.js

### Component names

- Use the format MyComponent.vue

*Why?* The convention for JS files can be strange if applied to VUE files. It is common in front-end projects to work with the PascalCase.vue or .jsx pattern for components.

- Names with more than one word

See the [Style Guide](https://v2.vuejs.org/v2/style-guide/index.html?redirect=true#Multi-word-component-names-essential) pfor more information.

## VS Code

Extension suggestion for VS Code:

- Vetur: <https://marketplace.visualstudio.com/items?itemName=octref.vetur>
- ESlint: <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>

## Scripts

Generally speaking, the scripts in package.json are intuitive.
