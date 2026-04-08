import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/home/Sidebar';
import { FaFacebook, FaTwitter, FaWhatsapp, FaTelegram, FaPrint, FaFont, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useData } from '../context/DataContext';
import './ArticlePage.css';

const ArticlePage = () => {
    const { id } = useParams();
    const { getArticleById, incrementViews } = useData();
    const [fontSize, setFontSize] = useState(18);

    const article = getArticleById(id);

    // Automatically increment views on page load
    useEffect(() => {
        if (article) {
            incrementViews(id);
        }
    }, [id]);

    if (!article) {
        return (
            <div className="container" style={{ padding: '5rem 0', textAlign: 'center', minHeight: '60vh' }}>
                <FaExclamationTriangle style={{ fontSize: '4rem', color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h2 style={{ fontFamily: 'var(--font-primary)' }}>عذراً، هذا الخبر غير موجود أو تم حذفه من الموقع.</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>العودة للصفحة الرئيسية</Link>
            </div>
        );
    }

    // Segment robust chunks from arbitrary linebreaks
    const contentParagraphs = article.content?.split('\n').filter(p => p.trim() !== '') || [];

    const handlePrint = () => window.print();

    const changeFontSize = (increment) => {
        if (increment && fontSize < 26) setFontSize(fontSize + 2);
        if (!increment && fontSize > 14) setFontSize(fontSize - 2);
    };

    const categoryNames = {
        politics: 'سياسة', economy: 'اقتصاد', sports: 'رياضة',
        arts: 'ثقافة وفن', accidents: 'حوادث', technology: 'تكنولوجيا'
    };

    const categoryAr = categoryNames[article.category] || article.category;

    return (
        <div className="article-wrapper">
            <div className="container" style={{ padding: "3rem 0" }}>
                <div className="home-layout">
                    <article className="article-main">
                        <div className="breadcrumb">
                            <Link to="/">الرئيسية</Link> / <Link to={`/category/${article.category}`}>{categoryAr}</Link> / <span>{article.title.substring(0, 40)}...</span>
                        </div>

                        <header className="article-header">
                            <h1 className="article-title">{article.title}</h1>
                            {article.subtitle && <h3 className="article-subtitle">{article.subtitle}</h3>}

                            <div className="article-meta">
                                <div className="meta-info">
                                    <span className="author"><FaCheckCircle color="#1da1f2" /> بقلم: فريق التحرير</span>
                                    <span className="datetime">نشر في: <span dir="ltr">{article.date}</span> - <span dir="ltr">{article.time}</span> | 👁️ {(article.views + 1)?.toLocaleString()} مشاهدة</span>
                                </div>

                                <div className="reading-tools hide-on-print">
                                    <button onClick={() => changeFontSize(true)} title="تكبير الخط"><FaFont />+</button>
                                    <button onClick={() => changeFontSize(false)} title="تصغير الخط"><FaFont />-</button>
                                    <button onClick={handlePrint} title="طباعة الصفحة"><FaPrint /></button>
                                </div>
                            </div>
                        </header>

                        <div className="article-featured-img">
                            <img src={article.image} alt={article.title} />
                            <div className="img-caption">صورة متعلقة بالحدث</div>
                        </div>

                        <div className="article-share hide-on-print">
                            <span>شارك الخبر سريعاً:</span>
                            <button className="share-btn fb"><FaFacebook /> فيسبوك</button>
                            <button className="share-btn tw"><FaTwitter /> إكس</button>
                            <button className="share-btn wa"><FaWhatsapp /> واتساب</button>
                            <button className="share-btn tg"><FaTelegram /> تيليجرام</button>
                        </div>

                        <div className="article-body" style={{ fontSize: `${fontSize}px` }}>
                            {contentParagraphs.length > 0 ? contentParagraphs.map((par, idx) => (
                                <React.Fragment key={idx}>
                                    <p>{par}</p>
                                    {/* Simulate dynamic ad injection after 2nd paragraph */}
                                    {idx === 1 && (
                                        <div className="in-article-ad hide-on-print">مساحة إعلانية لتسييل المحتوى داخل المقال</div>
                                    )}
                                    {/* Contextual linkage simulation */}
                                    {idx === 2 && (
                                        <div className="related-inline hide-on-print">
                                            <strong>طالع أيضاً أهم الأخبار:</strong> <Link to={`/category/${article.category}`}>استعرض المزيد من تحليلات وقضايا قسم ({categoryAr})</Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            )) : (
                                <p>محتوى الخبر غير متاح حالياً.</p>
                            )}
                        </div>

                        {article.tags && article.tags.length > 0 && (
                            <div className="article-tags hide-on-print">
                                <span className="tags-label">الكلمات المفتاحية:</span>
                                {article.tags.map(tag => <Link key={tag} to={`/search?q=${tag}`} className="tag">{tag}</Link>)}
                            </div>
                        )}

                        <div className="comments-section hide-on-print">
                            <h3>تعليقات القراء</h3>
                            <div className="comments-placeholder">
                                <p>يجب تسجيل الدخول أو ربط حساب فيسبوك لإضافة تعليق والتفاعل مع الخبر.</p>
                                <button className="login-btn">تسجيل الدخول للنظام</button>
                            </div>
                        </div>
                    </article>

                    <div className="hide-on-print">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
