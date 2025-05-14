import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Lessons from "./pages/Lessons.jsx";
import LessonDetail from "./pages/LessonDetail.jsx";
import Categories from "./pages/Categories.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Contact from "./components/contact.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import NewLesson from "./components/NewLesson.jsx"; 
import NewCategory from "./components/NewCategory.jsx";
import ForumDiscussionDetail from "./components/ForumDiscussionDetail.jsx";
import ForumNewDiscussion from "./components/ForumNewDiscussion.jsx";
import ForumTopicsList from "./components/ForumTopicsList.jsx";
import Board from "./pages/Board.jsx";
import CategoryDetail from "./pages/CategoryDetail.jsx";

export default function App() {
  return (   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id/lessons" element={<CategoryDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<Board />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/newlesson" element={<NewLesson />} /> 
        <Route path="/newcategory" element={<NewCategory />} /> 
        <Route path="/forum/:id" element={<ForumDiscussionDetail />} /> 
        <Route path="/forum-new-discussion" element={<ForumNewDiscussion />} /> 
        <Route path="/forum" element={<ForumTopicsList />} /> 
        <Route path="*" element={<ErrorPage/>} /> {/* Page 404 */}
      </Routes>

  );
}
