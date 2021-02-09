import { useRef, useState, useCallback, useEffect } from 'react';

export const WebSocketError = {
  ERROR: 'ERROR',
  CANNOT_PARSE_JSON: 'CANNOT_PARSE_JSON',
  WRONG_TYPE: 'WRONG_TYPE',
};

export const useWebSocket = (url, protocols) => {
  const wsRef = useRef();
  const [readyState, setReadyState] = useState(WebSocket.CONNECTING);
  const [message, setMessage] = useState();
  const sendMessage = useCallback((data) => {
    if (wsRef.current) {
      let jsonString = JSON.stringify(data);
      wsRef.current.send(jsonString);
      return true;
    } else {
      console.error('Cannot send data to WebSocket Server.');
      return false;
    }
  }, []);
  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocket(url, protocols);
      wsRef.current.onopen = () => {
        setReadyState(wsRef.current.readyState);
      };
      wsRef.current.onclose = () => {
        if (wsRef.current) setReadyState(wsRef.current.readyState);
        else setReadyState(WebSocket.CLOSED);
      };
      wsRef.current.onmessage = (event) => {
        setReadyState(wsRef.current.readyState);
        if (typeof event.data === 'string') {
          let json;
          try {
            json = JSON.parse(event.data);
          } catch {
            console.error('Cannot parse receiving message data into JSON format.');
          }
          if (json) setMessage(json);
          else setMessage({ error: WebSocketError.CANNOT_PARSE_JSON });
        } else setMessage({ error: WebSocketError.WRONG_TYPE });
      };
      wsRef.current.onerror = () => {
        setReadyState(wsRef.current.readyState);
        setMessage({ error: WebSocketError.ERROR });
      };
      return () => {
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current.onopen = null;
          wsRef.current.onclose = null;
          wsRef.current.onmessage = null;
          wsRef.current.onerror = null;
          wsRef.current = null;
        }
      };
    }
  }, [url, protocols]);
  return [message, readyState, sendMessage, wsRef];
};
