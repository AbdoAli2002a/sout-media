import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Initial Seed Data
const defaultArticles = [
    {
        id: "101",
        title: "مجلس الوزراء يقر الموازنة العامة الجديدة بشفافية غير مسبوقة",
        category: "politics",
        excerpt: "في جلسة تاريخية، أقر مجلس الوزراء الموازنة الجديدة مع التركيز على قطاعات الصحة والتعليم.",
        content: "قرر مجلس الوزراء في جلسته المنعقدة اليوم إقرار مشروع الموازنة العامة للدولة للعام المالي الجديد، والتي تعد الأضخم في تاريخ البلاد من حيث حجم الإنفاق الموجه للخدمات الاجتماعية.\n\nوشهدت الجلسة مناقشات مطولة استمرت لأكثر من 6 ساعات، تم خلالها استعراض كافة بنود الموازنة والتأكد من توافقها مع خطة التنمية المستدامة.",
        image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=800&q=80",
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG'),
        views: 1250,
        tags: ["سياسة", "موازنة", "حكومة"],
        status: "published"
    },
    {
        id: "102",
        title: "البطل الأولمبي يعود متوجاً بالذهب وسط استقبال أسطوري",
        category: "sports",
        excerpt: "شهد مطار العاصمة استقبالاً أسطورياً للبطل الأولمبي بعد تحقيقه المركز الأول.",
        content: "عاد البطل الأولمبي إلى أرض الوطن محملاً بالميدالية الذهبية الأولى للبلاد في هذه الدورة الأولمبية وسط فرحة عارمة. احتشد الآلاف في انتظار وصول طائرته الخاصة للاحتفال به في مسيرة جابت العاصمة.",
        image: "https://images.unsplash.com/photo-1606990494576-9cf5d0b284db?w=800&q=80",
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG'),
        views: 4500,
        tags: ["رياضة", "أولمبياد", "أبطال"],
        status: "published"
    },
    {
        id: "103",
        title: "إطلاق المبادرة الوطنية لدعم الصناعات التكنولوجية الناشئة",
        category: "technology",
        excerpt: "مبادرة حكومية ضخمة لدعم وحاضنات الأعمال التقنية في المنطقة الذكية.",
        content: "في خطوة لتعزيز التحول الرقمي، تم إطلاق أكبر صندوق استثماري حكومي لدعم المشاريع والشركات التكنولوجية الناشئة. يهدف الصندوق إلى توفير بيئة خصبة لرواد الأعمال.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG'),
        views: 3200,
        tags: ["تكنولوجيا", "استثمار", "ريادة أعمال"],
        status: "published"
    },
    {
        id: "104",
        title: "اكتشاف أثري جديد يعيد كتابة تاريخ المنطقة ويذهل العلماء",
        category: "arts",
        excerpt: "بعثة أثرية تكتشف مقبرة ملكية تعود لآلاف السنين بحالة ممتازة.",
        content: "أسفرت عمليات الحفر الممتدة لشهور عن اكتشاف واحد من أهم المعالم الأثرية، مقبرة ملكية كاملة النقوش والمقتنيات لم تمس من قبل. هذا الاكتشاف سيسلط الضوء على فترات تاريخية غامضة.",
        image: "https://images.unsplash.com/photo-1599908852335-512aa6531393?w=800&q=80",
        date: new Date().toLocaleDateString('ar-EG'),
        time: new Date().toLocaleTimeString('ar-EG'),
        views: 5600,
        tags: ["ثقافة", "آثار", "تاريخ"],
        status: "published"
    }
];

export const DataProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);

    // Load from local storage or use defaults
    useEffect(() => {
        const saved = localStorage.getItem('soutmedia_articles');
        if (saved) {
            setArticles(JSON.parse(saved));
        } else {
            setArticles(defaultArticles);
            localStorage.setItem('soutmedia_articles', JSON.stringify(defaultArticles));
        }
    }, []);

    // Save to local storage whenever articles change
    useEffect(() => {
        if (articles.length > 0) {
            localStorage.setItem('soutmedia_articles', JSON.stringify(articles));
        }
    }, [articles]);

    const addArticle = (articleData) => {
        const newArticle = {
            ...articleData,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('ar-EG'),
            time: new Date().toLocaleTimeString('ar-EG'),
            views: 0,
        };
        setArticles([newArticle, ...articles]);
        return newArticle.id;
    };

    const updateArticle = (id, updatedData) => {
        setArticles(articles.map(art => art.id === id ? { ...art, ...updatedData } : art));
    };

    const deleteArticle = (id) => {
        setArticles(articles.filter(art => art.id !== id));
    };

    const publishArticle = (id) => {
        updateArticle(id, { status: 'published' });
    };

    const getArticleById = (id) => {
        return articles.find(art => art.id === id);
    };

    const incrementViews = (id) => {
        setArticles(prevArticles => prevArticles.map(art =>
            art.id === id ? { ...art, views: (art.views || 0) + 1 } : art
        ));
    };

    // Helper selectors
    const publishedArticles = [...articles].filter(a => a.status === 'published');
    // Sort descending by ID/Date
    publishedArticles.sort((a, b) => parseInt(b.id) - parseInt(a.id));

    const trendingArticles = [...publishedArticles].sort((a, b) => b.views - a.views).slice(0, 5);

    const getCategoryArticles = (catId, limit = null) => {
        const filtered = publishedArticles.filter(a => a.category === catId);
        return limit ? filtered.slice(0, limit) : filtered;
    };

    return (
        <DataContext.Provider value={{
            articles,
            publishedArticles,
            trendingArticles,
            addArticle,
            updateArticle,
            deleteArticle,
            publishArticle,
            getArticleById,
            getCategoryArticles,
            incrementViews
        }}>
            {children}
        </DataContext.Provider>
    );
};
