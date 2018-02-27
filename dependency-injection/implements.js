import { Manager } from "socket.io-client";
import { injectable } from "inversify";
import {
  WebSocketConfiguration,
  SocketFactory,
  SocketClient
} from "./interfaces";

const webSocketFactoryType: symbol = Symbol("WebSocketFactory");
const webSocketClientType: symbol = Symbol("WebSocketFactory");

export let TYPES: any = {
  WebSocketFactory: webSocketFactoryType,
  WebSocketClient: webSocketClientType
};

@injectable()
export class SocketIOFactory implements SocketFactory {
  createSocket(configuration: WebSocketConfiguration): any {
    return new Manager(configuration.uri, configuration.options);
  }
}

@injectable()
export class WebSocketClient implements SocketClient {
  private socketFactory: SocketFactory;
  private socket: any;

  public constructor(@inject(TYPES.WebSocketFactory) webSocketFactory: SocketFactory){
  	this.socketFactory = webSocketFactory;
  }

  public connect(config: WebSocketConfiguration){
  	if(!this.socket){
  		this.socket = this.socketFactory.createSocket(config);
  	}
  	return new Promise<any>((resolve, reject) => {
  		this.socket.on('connect', () => resolve());
  		this.socket.on('connect_error', (error: Error) => reject(error));
  	})
  }
  public emit(event: string, ...args: any[]): Promise:<any>{
  	return new Promise<string | Object>((resolve, reject) => {
  		if(!this.socket) return reject('No socket connection.');

  		return this.socket.emit(event, args, (response: any) => {
  			if(response.error) return reject(response.error);

  			return resolve();
  		})
  	})
  }

  public on(event: string, fn: function) Promise<any>{
  	return new Promise<any>((resolve, reject) => {
  		if(!this.socket) return reject('No socket connection.');

  		this.socket.on(event, fn);
  		resolve();
  	})
  }

  public close(): Promise<any>{
  	return new Promise<any>((resolve)=> {
  		this.socket.close(() => {
  			this.socket = null;
  			resolve();
  		})
  	})
  }
}
