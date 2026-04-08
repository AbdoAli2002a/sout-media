import React from 'react';
import HeroSection from '../components/home/HeroSection';
import NewsGrid from '../components/home/NewsGrid';
import Sidebar from '../components/home/Sidebar';
import { useData } from '../context/DataContext';
import './HomePage.css';

const HomePage = () => {
    const { getCategoryArticles } = useData();

    // Fetch live articles for grids (max 4 per grid to keep layout uniform)
    const politicsNews = getCategoryArticles('politics', 4);
    const sportsNews = getCategoryArticles('sports', 4);

    return (
        <div className="homepage-wrapper">
            <HeroSection />

            <div className="container" style={{ padding: "3rem 0" }}>
                <div className="home-layout">
                    <div className="main-content">
                        <NewsGrid category="politics" categoryLabel="سياسة" articles={politicsNews} />
                        <NewsGrid category="sports" categoryLabel="شؤون رياضية" articles={sportsNews} />

                        <div className="multimedia-section" style={{ marginBottom: '3rem', backgroundColor: 'var(--dark-charcoal)', color: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'var(--primary-red)' }}></div>
                            <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontFamily: 'var(--font-primary)' }}>تلفزيون صوت الميديا</h2>
                            <div style={{ height: '400px', backgroundColor: '#000', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '4rem', color: 'var(--primary-red)', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseOver={e => e.target.style.transform = 'scale(1.1)'} onMouseOut={e => e.target.style.transform = 'scale(1)'}>▶️</span>
                                <p style={{ marginTop: '1rem', color: 'var(--light-gray)' }}>تغطية حية: البث المباشر للأحداث</p>
                            </div>
                        </div>
                    </div>

                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
