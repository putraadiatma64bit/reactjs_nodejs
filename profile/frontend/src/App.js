import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./home/post/List";
import Cat from "./home/post/ListCat";
import Detail from "./home/post/Detail";
import Page from "./home/page/Detail";
import Guest from "./home/guest/Detail";

import Login from "./admin/sign/Login";
import Register from "./admin/sign/Register";

import PostList from "./admin/post/List";
import PostAdd from "./admin/post/Add";
import PostEdit from "./admin/post/Edit";

import CatList from "./admin/cat/List";
import CatAdd from "./admin/cat/Add";
import CatEdit from "./admin/cat/Edit";

import PageList from "./admin/page/List";
import PageAdd from "./admin/page/Add";
import PageEdit from "./admin/page/Edit";

import UsersList from "./admin/users/List";
import UsersAdd from "./admin/users/Add";
import UsersEdit from "./admin/users/Edit";

import ProfileEdit from "./admin/profile/Edit";

import SlideList from "./admin/slide/List";
import SlideAdd from "./admin/slide/Add";
import SlideEdit from "./admin/slide/Edit";

import GuestList from "./admin/guest/List";
import GuestAdd from "./admin/guest/Add";
import GuestEdit from "./admin/guest/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*--------------------------------------------------*/}
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Home />} />
        <Route path="/cat/:id" element={<Cat />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/page/:id" element={<Page />} />
        <Route path="/guest" element={<Guest />} />
        {/*--------------------------------------------------*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*--------------------------------------------------*/}
        <Route path="/admin" element={<PostList />} />
        <Route path="/post_list" element={<PostList />} />
        <Route path="/post_add" element={<PostAdd />} />
        <Route path="/post_edit/:id" element={<PostEdit />} />
        {/*--------------------------------------------------*/}
        <Route path="/cat_list" element={<CatList />} />
        <Route path="/cat_add" element={<CatAdd />} />
        <Route path="/cat_edit/:id" element={<CatEdit />} />
        {/*--------------------------------------------------*/}
        <Route path="/page_list" element={<PageList />} />
        <Route path="/page_add" element={<PageAdd />} />
        <Route path="/page_edit/:id" element={<PageEdit />} />
        {/*--------------------------------------------------*/}
        <Route path="/users_list" element={<UsersList />} />
        <Route path="/users_add" element={<UsersAdd />} />
        <Route path="/users_edit/:id" element={<UsersEdit />} />
        {/*--------------------------------------------------*/}
        <Route path="/profile_edit" element={<ProfileEdit />} />
        {/*--------------------------------------------------*/}
        <Route path="/slide_list" element={<SlideList />} />
        <Route path="/slide_add" element={<SlideAdd />} />
        <Route path="/slide_edit/:id" element={<SlideEdit />} />
        {/*--------------------------------------------------*/}
        <Route path="/guest_list" element={<GuestList />} />
        <Route path="/guest_add" element={<GuestAdd />} />
        <Route path="/guest_edit/:id" element={<GuestEdit />} />
        {/*--------------------------------------------------*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
