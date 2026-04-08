import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaCheckCircle } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import './AdminShared.css';

const ManageArticles = () => {
    const { articles, deleteArticle, publishArticle } = useData();
    const [filterCat, setFilterCat] = useState('');

    const categoryNames = {
        politics: 'سياسة', economy: 'اقتصاد', sports: 'رياضة',
        arts: 'ثقافة وفن', accidents: 'حوادث', technology: 'تكنولوجيا'
    };

    const handleDelete = (id) => {
        if (window.confirm('🚨 تحذير: هل أنت متأكد من حذف هذا الخبر نهائياً من الموقع؟')) {
            deleteArticle(id);
        }
    };

    const handlePublish = (id) => {
        publishArticle(id);
    };

    const displayedArticles = filterCat
        ? articles.filter(a => a.category === filterCat)
        : articles;

    return (
        <div className="admin-page">
            <div className="page-header flex-between">
                <h1>إدارة الأخبار ونظام النشر</h1>
                <Link to="/admin/articles/new" className="btn btn-primary">+ أضف خبراً جديداً</Link>
            </div>

            <div className="table-card">
                <div className="table-filters">
                    <select className="filter-select" style={{ maxWidth: '300px' }} value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                        <option value="">كل الأقسام والمحتويات</option>
                        <option value="politics">سياسة فقط</option>
                        <option value="sports">رياضة فقط</option>
                        <option value="economy">اقتصاد فقط</option>
                        <option value="technology">تكنولوجيا فقط</option>
                        <option value="arts">ثقافة وفن فقط</option>
                    </select>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th># المعرف</th>
                                <th>عنوان الخبر</th>
                                <th>القسم التابع له</th>
                                <th>تاريخ الإضافة</th>
                                <th>المشاهدات</th>
                                <th>الحالة</th>
                                <th>خيارات التعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedArticles.length > 0 ? displayedArticles.map((item) => (
                                <tr key={item.id}>
                                    <td dir="ltr" style={{ textAlign: 'right' }}>{item.id}</td>
                                    <td><strong style={{ color: 'var(--dark-charcoal)' }}>{item.title}</strong></td>
                                    <td><span className="badge badge-outline">{categoryNames[item.category] || item.category}</span></td>
                                    <td><span dir="ltr">{item.date}</span></td>
                                    <td>{item.views?.toLocaleString()}</td>
                                    <td><span className={`badge ${item.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                                        {item.status === 'published' ? 'منشور' : 'مسودة المراجع'}
                                    </span></td>
                                    <td className="actions-cell">
                                        {item.status === 'published' ? (
                                            <Link to={`/article/${item.id}`} target="_blank" className="action-btn view" title="مراجعة في الموقع الحي"><FaEye /></Link>
                                        ) : (
                                            <button onClick={() => handlePublish(item.id)} className="action-btn view" style={{ color: '#2ebc69' }} title="نشر الخبر فوراً للحصول على مشاهدات"><FaCheckCircle /></button>
                                        )}
                                        <Link to={`/admin/articles/edit/${item.id}`} className="action-btn edit" title="تعديل تفاصيل الخبر"><FaEdit /></Link>
                                        <button onClick={() => handleDelete(item.id)} className="action-btn delete" title="حذف المقال"><FaTrash /></button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>لا يتوفر محتوى حالياً بهذا القسم. اضغط على أضف خبراً للبدء.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageArticles;
