import Profile from "../Pages/Profile/Profile"
import Home from "../Pages/Homepage/Home"
import Message from "../Pages/Message/Message"

const privateRoutes = [
    {path: '/', page: Home},
    {path: '/profile', page: Profile},
    {path: '/profile', page: Profile},
    {path: '/profile/:id', page: Profile},
    {path: '/message', page: Message},
    
]

export {privateRoutes}