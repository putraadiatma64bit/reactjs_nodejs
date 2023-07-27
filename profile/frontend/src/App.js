import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./home/post/List";
import Cat from "./home/post/ListCat";
import Detail from "./home/post/Detail";
import Page from "./home/page/Detail";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*--------------------------------------------------*/}
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Home />} />
        <Route path="/cat/:id" element={<Cat />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/page" element={<Page />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
