import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewsGrid from '../components/home/NewsGrid';
import Sidebar from '../components/home/Sidebar';
import { useData } from '../context/DataContext';
import './CategoryPage.css';

const CategoryPage = () => {
    const { id } = useParams();
    const { getCategoryArticles } = useData();
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);

    const categoryNames = {
        politics: 'سياسة', economy: 'اقتصاد', sports: 'رياضة',
        arts: 'ثقافة وفن', accidents: 'حوادث', technology: 'تكنولوجيا', opinion: 'مقالات الرأي'
    };

    const categoryAr = categoryNames[id] || 'أخبار متنوعة';

    const allCatArticles = getCategoryArticles(id);
    const displayedArticles = allCatArticles.slice(0, limit);

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setLimit(prev => prev + 6);
        }, 1000);
    };

    return (
        <div className="category-wrapper">
            <div className="container" style={{ padding: "3rem 0" }}>
                <header className="category-header">
                    <h1>{categoryAr}</h1>
                    <div className="category-breadcrumb">
                        <Link to="/">الرئيسية</Link> / <span>{categoryAr}</span>
                    </div>
                </header>

                <div className="home-layout">
                    <div className="main-content">
                        {displayedArticles.length > 0 ? (
                            <>
                                {/* Ensure we display 1-4 elements inside dynamic grid wrapper */}
                                {displayedArticles.length >= 1 && (
                                    <NewsGrid category={id} categoryLabel={`أحدث أخبار (${categoryAr})`} articles={displayedArticles.slice(0, 4)} />
                                )}

                                {/* Leftovers go into standard list column */}
                                {displayedArticles.length > 4 && (
                                    <div className="category-list">
                                        {displayedArticles.slice(4).map(article => (
                                            <article key={article.id} className="cat-list-item">
                                                <div className="cat-img">
                                                    <Link to={`/article/${article.id}`}>
                                                        <img src={article.image} alt={article.title} />
                                                    </Link>
                                                </div>
                                                <div className="cat-content">
                                                    <h2><Link to={`/article/${article.id}`}>{article.title}</Link></h2>
                                                    <p>{article.excerpt || `${article.title} - اقرأ التفاصيل الكاملة والتحليلات الحصرية حول هذا الخبر من خلال موقع صوت الميديا.`}</p>
                                                    <span className="cat-time" dir="ltr">🕒 {article.date}</span>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}

                                {limit < allCatArticles.length && (
                                    <div className="load-more-container">
                                        <button
                                            className="load-more-btn"
                                            onClick={handleLoadMore}
                                            disabled={loading}
                                        >
                                            {loading ? 'جاري تحميل المزيد...' : 'عرض المزيد من الأخبار'}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ padding: '5rem 0', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <h2 style={{ fontFamily: 'var(--font-primary)', color: 'var(--text-muted)' }}>لا توجد أخبار منشورة في هذا القسم حالياً.</h2>
                                <p style={{ color: '#999', marginTop: '1rem' }}>يتم تغطية الأخبار فور توفرها. يرجى مراجعة الإدارة.</p>
                            </div>
                        )}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
