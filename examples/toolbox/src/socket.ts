import { io, Socket } from "socket.io-client";

export async function connectIo(
  executionId: string,
  onMessage: (data: any) => void
): Promise<void> {
  return new Promise<void>((resolve) => {
    const socket: Socket = io("https://sara.synkar.com", {
      path: "/v1/io", // when using Traefik Ingress
      reconnection: true,
      reconnectionDelay: 500,
      transports: ["websocket", "polling"],
      extraHeaders: { room: executionId },
    });
    socket.on("message", (data) => {
      if (data.issuer !== socket.id) {
        onMessage(data);
      }
    });
    socket.on("connect", () => {
      console.log("connected");
      resolve();
    });
  });
}
