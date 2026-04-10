import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBars } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    return (
        <>
            <header className="main-header">
                <div className="container header-container">
                    <div className="header-logo">
                        <Link to="/">
                            <span className="logo-text">المنار الدولية </span>
                            <span className="logo-dot">.</span>
                        </Link>
                    </div>

                    <div className="header-ad-space">
                        {/* Banner Ad Placeholder 728x90 */}
                        <div className="ad-banner-placeholder">
                            مساحة إعلانية (728x90)
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn" aria-label="Search">
                            <FaSearch />
                        </button>
                        <button className="icon-btn" aria-label="User Profile">
                            <FaUserCircle />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mega Menu Navigation */}
            <nav className="mega-menu">
                <div className="container nav-container">
                    <ul className="nav-links">
                        <li><Link to="/">الرئيسية</Link></li>
                        <li className="has-dropdown">
                            <Link to="/category/politics">سياسة</Link>
                            <div className="dropdown-content mega-dropdown">
                                {/* Mega menu content mockup */}
                                <div className="mega-column">
                                    <h4>أهم أخبار السياسة</h4>
                                    <ul>
                                        <li><Link to="#">قرارات حكومية جديدة</Link></li>
                                        <li><Link to="#">تغطية الانتخابات</Link></li>
                                        <li><Link to="#">الشؤون الخارجية</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li><Link to="/category/economy">اقتصاد</Link></li>
                        <li><Link to="/category/sports">رياضة</Link></li>
                        <li><Link to="/category/arts">فن وثقافة</Link></li>
                        <li><Link to="/category/accidents">حوادث</Link></li>
                        <li><Link to="/category/technology">تكنولوجيا</Link></li>
                        <li><Link to="/category/opinion">مقالات الرأي</Link></li>
                    </ul>

                    <button className="mobile-menu-btn">
                        <FaBars />
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Header;
