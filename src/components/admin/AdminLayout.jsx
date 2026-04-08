import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaNewspaper, FaTags, FaSignOutAlt, FaPlusSquare } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>صوت الميديا<span>.</span></h2>
                    <p>لوحة التحكم</p>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' || location.pathname === '/admin/' || location.pathname === '/admin' ? 'active' : ''}>
                        <FaTachometerAlt /> <span>الرئيسية</span>
                    </Link>
                    <Link to="/admin/articles/new" className={location.pathname === '/admin/articles/new' ? 'active' : ''}>
                        <FaPlusSquare /> <span>إضافة خبر</span>
                    </Link>
                    <Link to="/admin/articles" className={location.pathname === '/admin/articles' ? 'active' : ''}>
                        <FaNewspaper /> <span>إدارة الأخبار</span>
                    </Link>
                    <Link to="/admin/categories" className={location.pathname === '/admin/categories' ? 'active' : ''}>
                        <FaTags /> <span>إدارة الأقسام</span>
                    </Link>
                </nav>

                <div className="admin-sidebar-bottom">
                    <button onClick={handleLogout} className="logout-btn">
                        <FaSignOutAlt /> <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-welcome">
                        مرحباً، <strong>{user.name || user.username}</strong>
                    </div>
                    <div className="topbar-actions">
                        <Link to="/" target="_blank" className="view-site-btn">معاينة الموقع</Link>
                    </div>
                </header>

                <main className="admin-content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
