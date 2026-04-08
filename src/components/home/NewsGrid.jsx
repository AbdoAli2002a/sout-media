import React from 'react';
import { Link } from 'react-router-dom';
import './NewsGrid.css';

const NewsGrid = ({ category, categoryLabel, articles }) => {
    return (
        <section className="news-block">
            <div className="block-header">
                <h2 className="block-title">{categoryLabel}</h2>
                <Link to={`/category/${category}`} className="block-more">المزيد</Link>
            </div>

            <div className="block-grid">
                {articles.map((article, index) => (
                    <div key={article.id} className={`grid-card ${index === 0 ? 'grid-lead' : 'grid-item'}`}>
                        <Link to={`/article/${article.id}`}>
                            <div className="grid-img-wrapper">
                                <img src={article.image} alt={article.title} />
                            </div>
                            <div className="grid-content">
                                <h3>{article.title}</h3>
                                {index === 0 && <p className="grid-excerpt">{article.excerpt}</p>}
                                <span className="grid-time">{article.time}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewsGrid;
