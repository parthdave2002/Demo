import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/sidebar'
import RigthSidebarPage from '../../components/Sidebar/rigthSidebar'
import { connectSocket } from '../../utils/socket'

const ChatPage = () => {

    const [activeChat, setActiveChat] = useState<string | null>(null)
    const [chatRoomId, setChatRoomId] = useState<string | null>(null)
    const [activeChatName, setActiveChatName] = useState<string | null>("")

    const loggedInUserId = localStorage.getItem("userId");
  
    useEffect(() => {
      if (loggedInUserId) {
        connectSocket(loggedInUserId);
      }
    }, [loggedInUserId]);

  return (
    <div className='flex h-screen'>
        <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} setActiveChatName={setActiveChatName} setChatRoomId={setChatRoomId} />
        
        {activeChatName && activeChatName.length > 0 &&
            <RigthSidebarPage  activeChat={activeChat} activeChatName ={activeChatName} chatRoomId={chatRoomId}/>
        }
    </div>
  )
}

export default ChatPage