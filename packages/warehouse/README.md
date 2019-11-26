# @crumb/warehouse

> Simple and unified API for accessing browser storage. Supports sessionStorage, localStorage, and cookies.

## Description

Warehouse is a simple and unified API used for accessing browser storage. Due to it's synchronous nature, Warehouse does not support asynchronous browser storage types such as IndexedDB or WebSQL. While this does prevent the use of other storage mechanisms, it greatly simplifies Warehouse for basic applications where synchronous storage mechanisms are sufficient.

## Installation

```sh
# Yarn
yarn add @crumb/warehouse

# npm
npm install @crumb/warehouse
```

## Basic Usage

To start, create a new `Warehouse` instance using the storage type you wish to use (i.e. sessionStorage, cookie).

```js
import { createWarehouse } from '@crumb/warehouse'

const warehouse = createWarehouse('sessionStorage')
```

After the warehouse is created, you can store, retrieve, and delete items from the warehouse.

```js
warehouse.put('foo', 'bar')
warehouse.get('foo') // 'bar'
warehouse.remove('foo')
```

## Data Types

Unlike the native browser APIs, Warehouse supports more than just string data by using `JSON.stringify` and `JSON.parse` when storing and retrieving items. For example, the code block below shows storing and retrieving an object.

_If using TypeScript, you will notice that the example below shows how the `get` method accepts a type argument which will be used as the return type._

```ts
interface User {
  firstName: string
  lastName: string
}

warehouse.put('foo', {
  firstName: 'bar',
  lastName: 'baz',
})

warehouse.get<User>('foo') // { firstName: 'bar', lastName: 'baz' }
```

## Cookie Expiration

To set a cookie expiration when creating cookies, simply add the `expireDays` option when calling the `put` method. If not provided, an expiration will not be added to the cookie and thus will use the browser's default expiration of "Session".

```js
warehouse.put('foo', 'bar', { expireDays: 7 })
```

## Key Prefixing

One useful feature of Warehouse is the ability to define a key prefix to be added to all items that are stored. This is especially helpful for organizing items if you have multiple applications storing items on the same domain.

```js
const warehouse = createWarehouse('sessionStorage', {
  prefix: 'my-app-name-',
})
```

## Multiple Warehouses

While some applications may only use a single type of storage, your application may require storing items in multiple browser storage types. To do so, simply create a separate `Warehouse` instance for each storage type you need.

The approach we recommend is to create a file to house all your instantiated warehouses (i.e. `warehouses.js`) so individual files or components can import and use the warehouses as they have need.

```js
// warehouses.js
export const localStorageWarehouse = createWarehouse('localStorage')
export const cookieWarehouse = createWarehouse('cookie')
```

```js
// app.js
import { localStorageWarehouse } from './warehouses'

console.log(localStorageWarehouse.get('foo'))
```
