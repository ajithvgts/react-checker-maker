# React Checker Maker &middot;

React checker maker is a lightweight package that can be used to manage privileges in [React Js](https://reactjs.org). This package utilizes [React Router Dom](https://reactrouter.com) and allows for the addition of specific privileges to routes and elements.

## Installation

```sh
npm i react-checker-maker
```

```sh
yarn add react-checker-maker
```

```sh
pnpm add react-checker-maker
```

## Logic

> User privileges refer to the level of permission granted to a user, which can be specific to a particular route or element. When a privilege is assigned at the route or element level, it is compared with the user's assigned privileges. If the user's privileges include the assigned privilege, then they will be granted access, otherwise they will be denied access.

## Docs

### Steps to Implement

#### Step 1: (Wrap your Routes with PrivilegeProvider)

| App Component |
| ------------- |

```sh
import { PrivilegeProvider } from "react-checker-maker"
import { useLocation } from "react-router-dom";

export default function App(){

// useLocation from react-router-dom
const { pathname } = useLocation();

return (
  <PrivilegeProvider pathname={pathname}>
    <Routes />
  </PrivilegeProvider>
)
}
```

#### Step 2: (Create Checker Maker Routes)

| Routes Component |
| ---------------- |

```sh
import { useCheckerMaker } from "react-checker-maker"

export default function Routes(){

const routes =[] //routes is list of RouteObject

const userPrivileges = [] //userPrivileges is list of privileges

const elementPrivileges = {}

return useRoutes(useCheckerMaker({routes,userPrivileges,elementPrivileges}))
}
```

#### Step 3: (Add Privilege Id to element)

```sh
<button data-priv-id="#create-user">Create User</button>

<button data-priv-id="#edit-user">Edit User</button>
```

### Types

**data-priv-id**

```sh
value must be string starts with `#`
```

**userPrivileges (Required)**

```sh
string | number | Array<string | number>
```

**routes (Required)**

```sh
Existing routes list with added **privileges** of type string | number | Array<string | number>
```

**elementPrivileges (Optional)**

```sh
 {
    `#{string}` : string | number | Array<string | number>
 }
 or
 {
    `#{string}` : {
                    key: string | number | Array<string | number>,
                    removeEL?: boolean, //default -> true
                    css?: cssProperties,
                    elementProps?: {},
                  }
 }
```

## Packages

This repository containing the following packages:

- [`react`](/packages/react)
- [`react-router-dom`](/packages/react-router-dom)
