import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <h2 className="footer-logo">المنار الدولية <span>.</span></h2>
                        <p className="footer-desc">
                            موقع إخباري شامل ومستقل يعمل على مدار الساعة. نقدم لك التغطية الأسرع والأكثر مصداقية للأحداث المحلية والعالمية بمهنية وموضوعية.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3>أقسام الموقع</h3>
                        <ul>
                            <li><Link to="/category/politics">سياسة</Link></li>
                            <li><Link to="/category/economy">اقتصاد</Link></li>
                            <li><Link to="/category/sports">رياضة</Link></li>
                            <li><Link to="/category/arts">فن وثقافة</Link></li>
                            <li><Link to="/category/accidents">حوادث</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h3>معلومات تهمك</h3>
                        <ul>
                            <li><Link to="#">من نحن</Link></li>
                            <li><Link to="#">سياسة الخصوصية</Link></li>
                            <li><Link to="#">شروط الاستخدام</Link></li>
                            <li><Link to="#">اتصل بنا</Link></li>
                            <li><Link to="#">أعلن معنا</Link></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h3>النشرة البريدية</h3>
                        <p>اشترك ليصلك أهم الأخبار يومياً على بريدك.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="البريد الإلكتروني" required />
                            <button type="submit">اشترك الآن</button>
                        </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} مؤسسة صوت الميديا للصحافة والنشر. كافة الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
