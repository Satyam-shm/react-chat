import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Firebase";
import "./Chat.css";

export default function Chat(props) {
  const { room } = props;
  const [messages, setMessages] = useState("");
  const messageRef = collection(db, "messages");
  const [arr, setArr] = useState([]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt") // Add orderBy clause to sort messages by createdAt
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesData = [];

      snapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setArr(messagesData);
      setIsloading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [arr]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    if (messages.trim() === "") {
      alert("Message can't be empty");
      setIsloading(false);
      return;
    }

    try {
      await addDoc(messageRef, {
        text: messages,
        createdAt: serverTimestamp(),
        name: auth.currentUser.displayName,
        room,
      });
      setMessages("");
    } catch (error) {
      console.log("Message submit error", error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">{room}</h2>
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mb-4 overflow-y-auto h-64 custom-scrollbar">
        {isLoading ? (
          <h1 className="text-lg font-bold text-center">Loading</h1>
        ) : (
          arr.map((value) => (
            <div key={value.id} className="mb-2 flex">
              <h1 className="text-lg font-bold mr-5">{value.name}</h1>
              <h2 className="text-lg font-light">{value.text}</h2>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={isLoading ? "sending" : messages}
            onChange={(e) => setMessages(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
