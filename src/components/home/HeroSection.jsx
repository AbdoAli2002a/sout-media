import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './HeroSection.css';

const categoryNames = {
    politics: 'سياسة', economy: 'اقتصاد', sports: 'رياضة',
    arts: 'ثقافة وفن', accidents: 'حوادث', technology: 'تكنولوجيا'
};

const HeroSection = () => {
    const { publishedArticles } = useData();

    // Get latest 4 articles for Hero
    const heroArticles = publishedArticles.slice(0, 4);

    if (heroArticles.length === 0) {
        return <section className="hero-section"><div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>لا توجد أخبار منشورة حالياً لتغطية المانشيت.</div></section>;
    }

    const mainArticle = heroArticles[0];
    const sideArticles = heroArticles.slice(1);

    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-grid">
                    {mainArticle && (
                        <div className="hero-main">
                            <Link to={`/article/${mainArticle.id}`} className="hero-card">
                                <div className="hero-img-wrapper">
                                    <img src={mainArticle.image} alt="Main News" />
                                    <div className="hero-overlay"></div>
                                </div>
                                <div className="hero-content">
                                    <span className="category-badge">{categoryNames[mainArticle.category] || mainArticle.category}</span>
                                    <h2>{mainArticle.title}</h2>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div className="hero-side">
                        {sideArticles.map((article) => (
                            <Link to={`/article/${article.id}`} key={article.id} className="hero-card small-card">
                                <div className="hero-img-wrapper">
                                    <img src={article.image} alt={article.title} />
                                    <div className="hero-overlay"></div>
                                </div>
                                <div className="hero-content">
                                    <span className="category-badge">{categoryNames[article.category] || article.category}</span>
                                    <h3>{article.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
