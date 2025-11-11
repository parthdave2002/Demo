import React, { useEffect } from 'react';
import {  Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import Avatar from '../common/avatar/avatar';
import { FiCheck } from 'react-icons/fi';
import { FaCheck, FaUserPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { invitationUserHandler } from '../../store/slice/user/userinvite-slice';
import { unfrienduserUserHandler } from '../../store/slice/user/unfrienduser-slice';
import { invitationNotificationHandler } from '../../store/slice/user/userNotification-slice';
import { addFriendUserAction, addFriendUserHandler } from '../../store/slice/user/userfriendadd-slice';
import ToastMessage from '../common/toastMessage/ToastMessage';
import { sidebarDataHandler } from '../../store/slice/chat/getsidebar-slice';

interface AddProjectModalProps {
    isOpenInvitationModal: boolean;
    isOpenInvitationModalType ?: string;
    setIsOpenInvitationModal: (isOpen: boolean) => void;
}

const InvitationModal : React.FC<AddProjectModalProps> = ({ isOpenInvitationModal, setIsOpenInvitationModal, isOpenInvitationModalType }) => {
    const dispatch = useAppDispatch()
    const [invitedIds, setInvitedIds] = React.useState<string[]>([]);
    const unfriendState = useAppSelector((state) => state.unfriend)
    const invitationNotificationState = useAppSelector((state) => state.invitationNotification)

    useEffect(() => {
        if (unfriendState?.data) {
            setInvitedIds(unfriendState.data?.data || []);
        }
        if (invitationNotificationState?.data) {
            setInvitedIds(invitationNotificationState.data?.data || []);
        }
    }, [unfriendState, invitationNotificationState]);

    const handleSelect = (chatId: string) => {
        setInvitedIds(prev => prev.includes(chatId) ? prev.filter(id => id !== chatId) : [...prev, chatId]);
        dispatch(invitationUserHandler({ friendId: chatId }));
        setIsOpenInvitationModal(false)
    }

    useEffect(() => {
        if(isOpenInvitationModalType === "invite"){
            dispatch(unfrienduserUserHandler());
        } else if (isOpenInvitationModalType === "notification"){
            dispatch(invitationNotificationHandler());
        }
    },[])

    const handleAcceptRequest =  (data: string) =>{
        dispatch(addFriendUserHandler({ friendId : data}))
        setIsOpenInvitationModal(false)
    }

   return (
     <div>
          <Dialog open={isOpenInvitationModal} onClose={() => setIsOpenInvitationModal(false)}  className="relative z-10">
              <DialogBackdrop transition className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl data-closed:sm:translate-y-0 data-closed:sm:scale-95" >
                          <div className="bg-gray-800 ">

                              <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                  <DialogTitle className="text-[1.5rem] font-normal text-white  border-b border-gray-700 "> 
                                    <div className='flex justify-between px-4 py-2'>
                                        <div> { isOpenInvitationModalType === "invite" ? "User List"  : "Friend Request" }   </div>
                                        <div className='self-center cursor-pointer' onClick={() => setIsOpenInvitationModal(false)}> <IoClose /> </div>
                                    </div>
                                    </DialogTitle>
                                  <div className="flex">
                                    {invitedIds && invitedIds.length > 0 ? 
                                        <ul className="w-full space-y-2 overflow-auto max-h-72 pr-2" role="list">
                                            {invitedIds.map((chat : any) => {
                                                const isInvited = invitedIds.includes(chat?._id);
                                                return (
                                                    <li  key={chat?._id} aria-pressed={isInvited}   className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isInvited ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <Avatar name={chat?.username} size={44} />
                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="text-sm font-semibold text-white truncate">{chat?.username}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">

                                                            { isOpenInvitationModalType === "notification" ? 
                                                                    <button type="button" className={`p-2 rounded-full transition-colors ${isInvited ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}  aria-label={isInvited ? `Invited ${chat?.username}` : `Invite ${chat?.username}`} >    <FaCheck size={16} onClick={() => handleAcceptRequest(chat?._id)} />   </button>
                                                                :
                                                                    <button type="button" onClick={() => handleSelect(chat?._id) }  className={`p-2 rounded-full transition-colors ${isInvited ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-200 hover:bg-white/10'}`}  aria-label={isInvited ? `Invited ${chat?.username}` : `Invite ${chat?.username}`} >   {isInvited ? <FiCheck size={16} /> : <FaUserPlus size={16} />}   </button>  
                                                            }
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>

                                        : <div className="w-full text-center p-4 text-gray-400">No More Data</div>
                                    }
                                  </div>
                              </div>
                          </div>

                      </DialogPanel>
                  </div>
              </div>
          </Dialog>
          <ToastMessage />
    </div>
  )
}

export default InvitationModal