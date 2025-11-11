import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../common/avatar/avatar';
import { FiPaperclip, FiSend } from 'react-icons/fi';
import { getSocket } from '../../utils/socket';
import axios from 'axios';

interface RightSidebarProps {
  activeChatName?: string | null;
  activeChat?: string | null;
  chatRoomId?: string | null;
}

interface Message {
  _id?: string;
  senderId?: string;
  chatId?: string;
  text?: string;
  fromMe?: boolean;
  time?: string;
}

const RigthSidebarPage: React.FC<RightSidebarProps> = ({ activeChat, activeChatName, chatRoomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = getSocket();
  const loggedInUserId = localStorage.getItem("userId"); 

  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3002/api/chat/${chatRoomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const msgs = res.data.data.map((m: Message) => ({
          ...m,
          fromMe: m.senderId === loggedInUserId,
        }));
        setMessages(msgs);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };

    fetchMessages();
  }, [activeChat]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: Message) => {
      if (msg.chatId === chatRoomId) {
        setMessages(prev => [...prev, { ...msg, fromMe: msg.senderId === loggedInUserId }]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, activeChat]);


  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !socket) return;

   const messageData = {
      senderId: loggedInUserId,
      receiverId: activeChat,
      text: input.trim(),
    };

    socket.emit("sendMessage", messageData);
    setInput('');
  };

  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
  
      <div className="h-16 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 shadow-sm">
        <Avatar name={activeChatName} size={40} />
        <div className='text-xl font-bold text-[#009bfa]'>{activeChatName}</div>
      </div>

      <div ref={scrollRef} className='flex-1 overflow-auto px-4 py-4 space-y-4'>
        {messages.map((msg:any, i) => (
          <div key={i} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`} >
            <div  className={`max-w-[50%]  px-3 py-2 rounded-full break-words whitespace-pre-wrap  ${  msg.fromMe ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-300 rounded-bl-none'  }`}  > {msg.message || msg.text} </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className='bg-gray-50  px-4 py-3 flex items-center gap-2'>
        <button type='button' className='p-2 hover:bg-gray-100 rounded-md'>
          <FiPaperclip className='text-gray-500' />
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Write a message...'
          className='flex-1 rounded-full border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200'
        />
        <button type='submit' className='bg-[#009bfa] hover:bg-blue-600 text-white p-2 rounded-full'>
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default RigthSidebarPage;
