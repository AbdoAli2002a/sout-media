import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './AdminShared.css';

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const { addArticle } = useData();
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit for localstorage efficiency
                alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت.');
                e.target.value = null; // reset input
                return;
            }
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Store Base64
                setIsUploading(false);
            };
            reader.onerror = () => {
                alert("فشل في قراءة الصورة.");
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e, status = 'published') => {
        e.preventDefault();
        if (!title || !category || !content) {
            alert("الرجاء ملء كافة الحقول الأساسية (العنوان، القسم، المحتوى)");
            return;
        }

        if (!image) {
            alert("الرجاء رفع صورة للمقال");
            return;
        }

        const tagsArray = tags ? tags.split('،').map(t => t.trim()).filter(t => t) : [];

        addArticle({
            title,
            category,
            content,
            excerpt: content.substring(0, 120) + '...',
            tags: tagsArray,
            image,
            status
        });

        alert(status === 'published' ? 'تم نشر الخبر بنجاح وهو الآن متاح لزوّار الموقع!' : 'تم حفظ الخبر بنجاح في المسودات.');
        navigate('/admin/articles');
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>إضافة خبر جديد</h1>
            </div>

            <div className="form-card">
                <form onSubmit={(e) => handleSubmit(e, 'published')}>
                    <div className="form-group">
                        <label>عنوان الخبر الرئيسي</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="اكتب عنواناً يثير انتباه القارئ..."
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>القسم</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">اختر القسم التابع له الخبر...</option>
                                <option value="politics">سياسة</option>
                                <option value="economy">اقتصاد</option>
                                <option value="sports">رياضة</option>
                                <option value="arts">فن وثقافة</option>
                                <option value="accidents">حوادث</option>
                                <option value="technology">تكنولوجيا</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>الصورة البارزة (الرئيسية)</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    required={!image}
                                />
                                {isUploading && <span style={{ color: 'var(--primary-red)' }}>جاري الرفع...</span>}
                            </div>
                            {image && (
                                <div style={{ marginTop: '1rem' }}>
                                    <img src={image} alt="Preview" style={{ height: '80px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    <button type="button" onClick={() => setImage('')} style={{ display: 'block', background: 'none', color: 'red', border: 'none', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.9rem' }}>إزالة الصورة</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>محتوى المقال أو الخبر</label>
                        <div className="rich-text-toolbar">
                            <button type="button" title="عريض"><b>B</b></button>
                            <button type="button" title="مائل"><i>I</i></button>
                            <button type="button" title="مسطر"><u>U</u></button>
                            <button type="button" title="إدراج رابط">🔗</button>
                        </div>
                        <textarea
                            rows="12"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="اكتب تفاصيل الخبر وحيثياته، يمكنك إضافة فقرات متعددة بضغط زر Enter..."
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>الكلمات الدالة/ المفتاحية (Tags) - مفصولة بفاصلة عربية (،)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="مثال: اقتصاد، البنك المركزي، الدولار"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={isUploading}>نشر الخبر فوراً</button>
                        <button type="button" className="btn btn-secondary" onClick={(e) => handleSubmit(e, 'draft')} disabled={isUploading}>حفظ الخبر كمسودة</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
