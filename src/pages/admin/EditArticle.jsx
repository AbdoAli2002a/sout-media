import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './AdminShared.css';

const EditArticle = () => {
    const { id } = useParams();
    const { getArticleById, updateArticle } = useData();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('published');
    const [isUploading, setIsUploading] = useState(false);

    // Load existing data
    useEffect(() => {
        const articleToEdit = getArticleById(id);
        if (articleToEdit) {
            setTitle(articleToEdit.title);
            setCategory(articleToEdit.category);
            setContent(articleToEdit.content);
            setTags(articleToEdit.tags ? articleToEdit.tags.join('، ') : '');
            setImage(articleToEdit.image || '');
            setStatus(articleToEdit.status || 'published');
        } else {
            alert("الخبر غير موجود");
            navigate('/admin/articles');
        }
    }, [id, getArticleById, navigate]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت.');
                e.target.value = null;
                return;
            }
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !category || !content) {
            alert("الرجاء ملء كافة الحقول الأساسية");
            return;
        }

        const tagsArray = tags ? tags.split('،').map(t => t.trim()).filter(t => t) : [];

        updateArticle(id, {
            title,
            category,
            content,
            excerpt: content.substring(0, 120) + '...',
            tags: tagsArray,
            image,
            status
        });

        alert('تم تحديث الخبر بنجاح!');
        navigate('/admin/articles');
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>تعديل الخبر</h1>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>حالة النشر</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: '300px' }}>
                            <option value="published">منشور للعامة</option>
                            <option value="draft">مسودة مخفية</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>عنوان الخبر الرئيسي</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>القسم</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="politics">سياسة</option>
                                <option value="economy">اقتصاد</option>
                                <option value="sports">رياضة</option>
                                <option value="arts">فن وثقافة</option>
                                <option value="accidents">حوادث</option>
                                <option value="technology">تكنولوجيا</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>الصورة البارزة (اتركها كما هي إذا لم ترغب بتغييرها)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {isUploading && <span style={{ color: 'var(--primary-red)' }}>جاري الرفع...</span>}
                            </div>
                            {image && (
                                <div style={{ marginTop: '1rem' }}>
                                    <img src={image} alt="Preview" style={{ height: '80px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>محتوى المقال أو الخبر</label>
                        <textarea
                            rows="12"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>الكلمات الدالة/ المفتاحية (Tags) - مفصولة بفاصلة عربية (،)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={isUploading}>حفظ التعديلات</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/articles')}>إلغاء والعودة</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticle;
