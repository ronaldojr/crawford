import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import AdminStories from './pages/admin/stories/AdminStories'
import AdminCategories from './pages/admin/categories/AdminCategories'
import Storie from './pages/storie/Storie'
import Login from './pages/login/Login'
import Categories from './pages/categories/Categories'
import NotFound from './pages/error/NotFound'

function PagesRoutes() {
    return (
        <div className="wrap-content">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/storie" element={<Storie />}>
                    <Route exact path=":id" element={<Storie />} />
                </Route>
                <Route exact path="/admin/stories" element={<AdminStories />} />
                <Route exact path="/admin/categories" element={<AdminCategories />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/categories" element={<Categories />}>
                    <Route exact path=":categorieId" element={<Categories />} >
                        <Route exact path=":categorieName" element={<Categories />} />
                    </Route>
                </Route>
                <Route element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default PagesRoutes