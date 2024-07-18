import React from "react";

export const getRetry = (retry: number | boolean) => {
  if (typeof retry === "number") {
    return retry;
  }

  return retry ? 1 : 0;
};

export const useEvent = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return
): ((...args: Params) => Return) => {
  const callbackRef = React.useRef<typeof callback>(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return React.useCallback((...args) => {
    const fn = callbackRef.current;
    return fn(...args);
  }, []);
};

export type UseWebSocketUrl = string | (() => string);

export interface UseWebSocketOptions {
  onConnected?: (webSocket: WebSocket) => void;
  onDisconnected?: (event: CloseEvent, webSocket: WebSocket) => void;
  onError?: (event: Event, webSocket: WebSocket) => void;
  onMessage?: (event: MessageEvent, webSocket: WebSocket) => void;
  retry?: boolean | number;
  protocols?: Array<"soap" | "wasm">;
}

export type UseWebSocketStatus = "connecting" | "failed" | "connected" | "disconnected";

export interface UseWebSocketReturn {
  status: UseWebSocketStatus;
  close: WebSocket["close"];
  send: WebSocket["send"];
  open: () => void;
  client?: WebSocket;
}

export const useWebSocket = (
  url: UseWebSocketUrl,
  options?: UseWebSocketOptions
): UseWebSocketReturn => {
  const webSocketRef = React.useRef<WebSocket>();
  const retryCountRef = React.useRef(options?.retry ? getRetry(options.retry) : 0);
  const explicityCloseRef = React.useRef(false);

  const [status, setStatus] = React.useState<UseWebSocketStatus>("connecting");

  const send = (data: string | Blob | ArrayBufferLike | ArrayBufferView) =>
    webSocketRef.current?.send(data);

  const close = () => {
    explicityCloseRef.current = true;
    webSocketRef.current?.close();
  };

  const init = useEvent(() => {
    webSocketRef.current = new WebSocket(
      typeof url === "function" ? url() : url,
      options?.protocols
    );
    setStatus("connecting");

    const webSocket = webSocketRef.current;
    if (!webSocket) return;

    webSocket.onopen = () => {
      setStatus("connected");
      options?.onConnected?.(webSocket);
    };

    webSocket.onerror = (event) => {
      setStatus("failed");
      options?.onError?.(event, webSocket);
    };

    webSocket.onmessage = (event) => options?.onMessage?.(event, webSocket);

    webSocket.onclose = (event) => {
      setStatus("disconnected");
      options?.onDisconnected?.(event, webSocket);
      if (explicityCloseRef.current) return;

      if (retryCountRef.current > 0) {
        retryCountRef.current -= 1;
        return init();
      }
      retryCountRef.current = options?.retry ? getRetry(options.retry) : 0;
    };
  });

  React.useEffect(() => {
    init();

    return () => {
      if (!webSocketRef.current) return;
      webSocketRef.current.close();
      webSocketRef.current = undefined;
    };
  }, [url]);

  const open = () => {
    explicityCloseRef.current = false;
    init();
  };

  return { client: webSocketRef.current, close, open, send, status };
};
