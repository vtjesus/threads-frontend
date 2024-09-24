import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUp from "./pages/SignUp"
import Layout from "./layout/Layout"
import SearchPage from "./pages/SearchPage"
import ActivityPage from "./pages/ActivityPage"
import ProfilePage from "./pages/ProfilePage"
import { useGetUser } from "./api/userApi"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SaveUser } from "./Redux/feature/authSlice"
import { Loader } from "lucide-react"
import ProtectedRoutes from "./ProtectedRoutes"
import { RootState } from "./Redux/store"
import PostDetails from "./pages/PostDetails"


function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.user.auth)
  const { GetUser, isLoading } = useGetUser()
  useEffect(() => {
    dispatch(SaveUser(GetUser))
  }, [GetUser, dispatch])
  if (isLoading) {
    return (
      <div className="bg-primary-primarybackground w-full min-h-screen flex justify-center items-center">
        <Loader className=" animate-spin w-7 h-7 text-primary-primaryText" />
      </div>
    )
  }
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout>
          <HomePage />
        </Layout>} />
        <Route path="/search" element={
          <Layout>
            <SearchPage />
          </Layout>} />
        <Route path="/like" element={
          <Layout>
            <ActivityPage />
          </Layout>} />
        <Route path="/profile/:username" element={
          <Layout>
            <ProfilePage />
          </Layout>} />
        <Route path="/postdetail/:id" element={
          <Layout>
            <PostDetails />
          </Layout>
        } />
      </Route>
      <Route path="/login" element={!auth ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!auth ? <SignUp /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App
