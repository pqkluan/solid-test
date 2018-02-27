import { Container } from "inversify";
import "reflect-metadata";
import { SocketClient, SocketFactory } from "./interfaces";
import { TYPES, SocketIOFactory, WebSocketClient } from "./implements";

const provider = new Container({ defaultScope: "Singleton" });

//Binding
provider.bind < SocketClient > TYPES.WebSocketClient.to(WebSocketClient);
provider.bind < SocketFactory > TYPES.WebSocketFactory.to(SocketIOFactory);

// var socketClient = provider.get < SocketClient > TYPES.WebSocketClient;

/* Exercises
 * 
 * Find what other libraries exist that provide a Dependency Inversion Container.
 * In the examples, I did instantiate the container using ‘Singleton’ Scope. What would happen If I didn’t specify that? What another way can I do that using Inversify?
 * Look over your own projects or websites and think of ways you can utilize Dependency Inversion on your services. Example API calls, promises, etc.
 * Extra Credits: Implement your own DI container library. Have a class or a data-structure that accepts keys and values. For keys, you specify a name and for values you specify the instance resolved. Try to add methods for specifying the scope like as a singleton or as a factory.
*/

export default provider;
