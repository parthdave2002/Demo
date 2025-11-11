import react from 'react'
import SigninPage from './Pages/Auth/signin'
import SignupPage from './Pages/Auth/signup'
import ChatPage from './Pages/Chat/chat';
import { BrowserRouter as Router , Route, Routes, } from 'react-router-dom'; 
import ToastMessage from './components/common/toastMessage/ToastMessage';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
       <Route path="/" element={<SigninPage />} />
       <Route path="/signup" element={<SignupPage />} />
       <Route path="/chat" element={<ChatPage />} />
    </Routes>
    </Router>


     <ToastMessage />
    </>
  )
}

export default App