export interface WebSocketConfiguration {
  uri: string;
  options?: Object;
}

export interface SocketFactory {
  createSocket(configuration: WebSocketConfiguration): any;
}

export interface SocketClient {
  connect(configuration: WebSocketConfiguration): Promise<any>;
  close(): Promise<any>;
  emit(event: string, ...args: any[]): Promise<any>;
  on(event: string, fn: Function): Promise<any>;
}
