# Facet

This facet module is designed to provide an abstraction for performing operations on a Prisma client, including querying, filtering, sorting, and error handling, with the added functionality of performance measurement and event emission. It appears to be used throughout the application for interacting with the database.

## Features

- Automatic connection management: The Facet class handles connecting to and disconnecting from the Prisma client. It ensures that the client is connected when needed and disconnected when no operations are in progress.

- Performance measurement: The `measureQuery` function measures the time taken for a Prisma operation and logs the duration. It also supports retrying operations in case of errors.

- Error handling: The `handlePrismaError` function handles known Prisma errors and logs relevant information. It provides basic error handling for common scenarios, such as unique constraint violations.

- Logging: The logger module provides logging functionality for different log levels, including error, warn, info, and debug. It logs messages to the console and can also send webhook notifications.

- Event emitting: The `Facet` class includes an `EventEmitter` instance that can be used to emit events for different Prisma operations, such as create, delete, and realtime search.

## Usage

Here's how you can use the Facet module:

### Import the Facet class:

```typescript
import Facet from './lib/facet';
```

### Perform database operations using the Facet class:

``` postgresql
// Find a unique record
const user = await Facet.one('User', { id: 1 });

// Create a record
const newUser = await Facet.create('User', { name: 'John', email: 'john@example.com' });

// Update a record
const updatedUser = await Facet.update('User', { id: 1 }, { name: 'John Doe' });

// Delete a record
const deletedUser = await Facet.delete('User', { id: 1 });
```
## Events

### Listen to events emitted by the Facet class:

GitHub Copilot: Sure! Here's an updated version of the README.md file that includes information about the `EventEmitter` class:

```typescript
// Listen to the create event
Facet.emitter.on('create', (model: string, data: any) => {
  console.log(`Created a new ${model} record: ${JSON.stringify(data)}`);
});
```

In this example, we are using the `on` method to listen to the `create` event emitted by the `Facet` class. The `on` method takes two arguments: the name of the event and a callback function that is called when the event is emitted. The callback function takes two arguments: the name of the model and the data emitted with the event.

You can use the same approach to listen to other events emitted by the `Facet` class, such as the `delete` and `realtimeSearch` events.

### How can I emit custom events in the Facet class?

To emit custom events in the `Facet` class, you can use the `emit` method of the `EventEmitter` instance. Here's an example of how you can emit a custom event:

```typescript
Facet.emitter.emit('customEvent', 'some data');
```

In this example, we are using the `emit` method to emit a custom event called `customEvent`. The `emit` method takes two arguments: the name of the event and the data to be emitted.

You can listen to this event using the `on` method of the `EventEmitter` instance:

```typescript
Facet.emitter.on('customEvent', (data: any) => {
  console.log(`Received custom event with data: ${data}`);
});
```

In this example, we are using the `on` method to listen to the `customEvent` event emitted by the `Facet` class. The `on` method takes two arguments: the name of the event and a callback function that is called when the event is emitted. The callback function takes one argument: the data emitted with the event.

You can use this approach to emit and listen to any custom events in the `Facet` class.

## Performance Measurement

The `measureQuery` function measures the time taken for a Prisma operation and logs the duration. It also supports retrying operations in case of errors.

### Measure the time taken for a Prisma operation:

```typescript
const user = await Facet.measureQuery('User', { id: 1 });
```

In this example, we are using the `measureQuery` function to measure the time taken for a Prisma operation. The `measureQuery` function takes two arguments: the name of the model and the query parameters.

### Retry operations in case of errors:

```typescript
const user = await Facet.measureQuery('User', { id: 1 }, { retries: 3 });
```

In this example, we are using the `measureQuery` function to measure the time taken for a Prisma operation. The `measureQuery` function takes three arguments: the name of the model, the query parameters, and an options object. The options object can be used to specify the number of retries.

### How can I measure the time taken for multiple Prisma operations?

To measure the time taken for multiple Prisma operations, you can use the `measureQueries` function. Here's an example of how you can use the `measureQueries` function:

```typescript
const users = await Facet.measureQueries('User', [{ id: 1 }, { id: 2 }]);
```

In this example, we are using the `measureQueries` function to measure the time taken for multiple Prisma operations. The `measureQueries` function takes two arguments: the name of the model and an array of query parameters.

### How can I measure the time taken for a Prisma operation and emit an event?

To measure the time taken for a Prisma operation and emit an event, you can use the `measureQueryAndEmit` function. Here's an example of how you can use the `measureQueryAndEmit` function:

```typescript
const user = await Facet.measureQueryAndEmit('User', { id: 1 }, 'create');
```
In this example, we are using the `measureQueryAndEmit` function to measure the time taken for a Prisma operation and emit an event. The `measureQueryAndEmit` function takes three arguments: the name of the model, the query parameters, and the name of the event to emit.

## Error Handling

The `Facet` class includes basic error handling for common scenarios, such as unique constraint violations. However, you may want to handle errors in a more specific way for your application. 

To handle errors emitted by the `Facet` class, you can listen to the `error` event emitted by the `EventEmitter` instance. Here's an example of how you can listen to the `error` event:

```typescript
Facet.emitter.on('error', (error: Error) => {
  console.error(`An error occurred: ${error.message}`);
});
```

In this example, we are using the `on` method to listen to the `error` event emitted by the `Facet` class. The `on` method takes two arguments: the name of the event and a callback function that is called when the event is emitted. The callback function takes one argument: the error object.

## Logging

The Facet module uses the logger module for logging. You can configure the logger to log messages to the console and send webhook notifications if desired. The logger supports different log levels: error, warn, info, and debug.

## Future Improvements

- **Connection Pooling**: Consider implementing connection pooling to improve performance by reusing connections instead of establishing a new connection for each operation.

- **Advanced Error Handling**: Enhance error handling by logging additional error details and implementing strategies like exponential backoff for retries.

- **Transaction Support**: Add support for transactions to ensure atomicity and consistency when performing multiple database operations.

- **Pagination Helper**: Include a utility method for handling pagination, making it easier to paginate through large result sets.

- **Input Validation**: Implement input validation to ensure that the parameters passed to each method are valid and reduce the risk of runtime errors.

- **Type Safety**: Make the class more type-safe by associating model types with model names, enabling better type checking at compile-time.

- **Extensibility**: Consider creating specific classes for each model that extends the Facet class. This can provide a more intuitive and type-safe API for interacting with individual models.

## Contributing

Contributions to the Facet module are welcome! If you have any ideas, bug reports, or feature requests, please open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).