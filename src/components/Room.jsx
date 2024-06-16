import { useRef, useState } from "react";
import Chat from "./Chat";

export default function Room() {
  const roomRef = useRef();
  const [room, setRoom] = useState(null);

  return room ? (
    <Chat room={room} />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Enter a Chat Room</h2>
      <input
        ref={roomRef}
        className="bg-white border-2 border-gray-300 rounded w-full max-w-xs py-2 px-4 text-gray-700 mb-4 focus:outline-none focus:border-purple-500"
        placeholder="Room name"
      />
      <button
        onClick={() => setRoom(roomRef.current.value)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enter chat
      </button>
    </div>
  );
}
