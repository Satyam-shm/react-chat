import { useRef, useState } from "react";
import Chat from "./Chat";

export default function Room() {
  const roomRef = useRef();
  const [room, setRoom] = useState(null);

  return room ? (
    <Chat room={room} />
  ) : (
    <div>
      <h2>Room</h2>
      <input ref={roomRef} />
      <button onClick={() => setRoom(roomRef.current.value)}>Enter chat</button>
    </div>
  );
}
