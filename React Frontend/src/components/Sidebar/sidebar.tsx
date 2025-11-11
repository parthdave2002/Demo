import React, { use, useEffect, useState } from 'react'
import { FaBell, FaUsers } from 'react-icons/fa'
import { FiSearch, FiCheck } from 'react-icons/fi'
import { IoMdLogOut } from "react-icons/io";
import Avatar from '../common/avatar/avatar'
import InvitationModal from '../Modal/InvitationModal'
import { useNavigate } from 'react-router-dom';
import { loginUserAction } from '../../store/slice/Auth/login-slice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addFriendUserAction } from '../../store/slice/user/userfriendadd-slice';
import { invitationNotificationAction } from '../../store/slice/user/userNotification-slice';
import { unfrienduserUserAction } from '../../store/slice/user/unfrienduser-slice';
import { sidebarDataHandler } from '../../store/slice/chat/getsidebar-slice';

interface SidebarProps {
    onSelect?: (id: string) => void
    setActiveChat: (id: string) => void
    setChatRoomId : (id: string) => void
    setActiveChatName: (name: string) => void
    activeChat: string | null
}


const Sidebar: React.FC<SidebarProps> = ({ onSelect, setActiveChat,setActiveChatName, activeChat,setChatRoomId }) => {
   const Navigate = useNavigate();
   const dispatch =  useAppDispatch();
    const [query, setQuery] = useState('');
    const [isOpenInvitationModal, setIsOpenInvitationModal] = useState(false);
    const [isOpenInvitationModalType, setIsOpenInvitationModalType] = useState("");
    const [profileUsername, setProfileUsername] = useState("");
    const [chatUser, setChatUser] = useState([]);

      const loginState = useAppSelector((state) => state.login)
      const sidebarState = useAppSelector((state) => state.sidebar)

      useEffect(() => {
         setProfileUsername(loginState?.data?.data?.data?.username);
      }, [loginState?.data]);

      useEffect(() => {
         if(sidebarState?.data && sidebarState?.data?.data){
            setChatUser(sidebarState?.data?.data);
         }
      }, [sidebarState?.data]);

    const InviteModal = () => {
        dispatch(addFriendUserAction.addFriendSliceReset())
        dispatch(invitationNotificationAction.invitationNotificationSliceReset())
        dispatch(unfrienduserUserAction.unfrienduserSliceReset())
      setIsOpenInvitationModal(true);
      setIsOpenInvitationModalType("invite");
    }

    const handleSelect = (id: string, roomid :  string, name : string) => {
        setActiveChat(id)
        setChatRoomId(roomid)
        setActiveChatName(name)
        if (onSelect) onSelect(id)
    }

    const LogoutCall = () => {
       localStorage.removeItem("token");
       dispatch(loginUserAction.loginSliceReset());
       Navigate("/")
    }

    const NotificationCall = () => {
        dispatch(addFriendUserAction.addFriendSliceReset())
        dispatch(invitationNotificationAction.invitationNotificationSliceReset())
        dispatch(unfrienduserUserAction.unfrienduserSliceReset())
        setIsOpenInvitationModal(true);
        setIsOpenInvitationModalType("notification");
    }

    useEffect(() => {
        dispatch(sidebarDataHandler())
    }, [])

    return (
        <aside className="w-80 h-full bg-[#e9e9e9] p-4">
          
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar name={profileUsername} size={48} />
                    <div>
                        <div className="text-md font-semibold text-[#009bfa]">{profileUsername}</div>
                        {/* <div className="text-xs text-gray-400">Online</div> */}
                    </div>
                </div>
      
                <div className="  flex gap-x-3" >
                    <FaBell  size={24} className='cursor-pointer text-gray-600 hover:text-gray-800 ' onClick={NotificationCall} />
                    <IoMdLogOut  size={24} className='cursor-pointer text-gray-600 hover:text-gray-800 ' onClick={LogoutCall} />
                </div>
            </div>

            <div className="mb-4 border-b border-gray-300 pb-4 flex gap-x-3">
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><FiSearch /></span>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search Here..."
                        className="w-full pl-10 pr-3 py-2 rounded-full bg-white text-sm placeholder-gray-400 focus:outline-none"
                    />
                </div>
                <button aria-label="edit-profile" className="text-gray-100 hover:text-gray-50 bg-green-500 p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors" onClick={() => InviteModal()}>
                    <FaUsers size={20}/>
                </button>
            </div>

            <ul className="space-y-2 overflow-auto h-[calc(100%-160px)] pr-2">
                {chatUser.map((chat :any) => (
                    <li key={chat?._id} onClick={() => handleSelect(chat?._id, chat?.chatId, chat?.username)} className={`flex items-center gap-2 px-3 py-2 rounded-2xl cursor-pointer transition-colors group ${activeChat === chat._id ? 'bg-white border border-sky-100' : 'hover:bg-gray-300'}`} >
                
                        <Avatar name={chat?.username} size={40} />

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div className=' w-[18rem]'>
                                    <div className="text-sm font-semibold text-[#009bfa] truncate">{chat?.username}</div>
                                    <div className="text-xs text-gray-400 truncate">{chat?.lastMessage}</div>
                                </div>
                              
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {isOpenInvitationModal ? <InvitationModal isOpenInvitationModal={isOpenInvitationModal} setIsOpenInvitationModal={setIsOpenInvitationModal} isOpenInvitationModalType={isOpenInvitationModalType} /> : null}
        </aside>
    )
}

export default Sidebar