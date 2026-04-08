import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './Sidebar.css';

const Sidebar = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('ar-EG'));
    const { trendingArticles } = useData();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString('ar-EG')), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <aside className="home-sidebar">
            <div className="widget services-widget">
                <h3 className="widget-title">خدمات يومية</h3>
                <div className="service-item">
                    <span className="service-icon">🌤️</span>
                    <div className="service-details">
                        <span className="service-name">الطقس (القاهرة)</span>
                        <span className="service-value" dir="ltr">32°C / 22°C</span>
                    </div>
                </div>
                <div className="service-item">
                    <span className="service-icon">💰</span>
                    <div className="service-details">
                        <span className="service-name">الدولار الأمريكي</span>
                        <span className="service-value">49.20 ج.م</span>
                    </div>
                </div>
                <div className="service-item">
                    <span className="service-icon">🕌</span>
                    <div className="service-details">
                        <span className="service-name">صلاة العشاء</span>
                        <span className="service-value">08:45 م</span>
                    </div>
                </div>
                <div className="service-time">
                    الوقت الآن: <span dir="ltr">{time}</span>
                </div>
            </div>

            <div className="widget ad-widget">
                <div className="ad-placeholder-sidebar">
                    مساحة إعلانية <br /> (300x250)
                </div>
            </div>

            <div className="widget trending-widget">
                <h3 className="widget-title">الأكثر قراءة الآن</h3>
                <ol className="trending-list">
                    {trendingArticles.length > 0 ? trendingArticles.map((news, index) => (
                        <li key={news.id} className="trending-item">
                            <span className="trending-number">{index + 1}</span>
                            <div className="trending-content">
                                <Link to={`/article/${news.id}`}>{news.title}</Link>
                                <div className="trending-stats">👁️ {news.views?.toLocaleString()} قراءة</div>
                            </div>
                        </li>
                    )) : <li style={{ color: 'var(--text-muted)', padding: '1rem' }}>لا توجد أخبار مقروءة حالياً</li>}
                </ol>
            </div>
        </aside>
    );
};

export default Sidebar;
