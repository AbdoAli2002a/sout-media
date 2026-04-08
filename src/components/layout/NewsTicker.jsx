import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './NewsTicker.css';

const NewsTicker = () => {
    const { publishedArticles } = useData();
    const [currentDate, setCurrentDate] = useState('');

    const breakingNews = publishedArticles.slice(0, 8);

    useEffect(() => {
        const d = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(d.toLocaleDateString('ar-EG', options));
    }, []);

    return (
        <div className="news-ticker-wrapper">
            <div className="ticker-container">
                <div className="ticker-label">
                    <span>أخبار عاجلة</span>
                </div>

                <div className="ticker-content">
                    <div className="ticker-text-scroll">
                        {breakingNews.length > 0 ? breakingNews.map((news) => (
                            <span key={news.id} className="ticker-item">
                                <Link to={`/article/${news.id}`}>{news.title}</Link>
                                <span className="ticker-separator">|</span>
                            </span>
                        )) : (
                            <span className="ticker-item">لا توجد أخبار عاجلة حالياً</span>
                        )}

                        {breakingNews.length > 0 && breakingNews.map((news) => (
                            <span key={news.id + '-dup'} className="ticker-item">
                                <Link to={`/article/${news.id}`}>{news.title}</Link>
                                <span className="ticker-separator">|</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ padding: '0 15px', color: '#ffb3b3', fontSize: '0.85rem', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                    {currentDate}
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
