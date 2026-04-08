import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h1 style={{ fontFamily: 'var(--font-primary)', marginBottom: '2rem', color: 'var(--dark-charcoal)' }}>الرئيسية (نظرة عامة)</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderBottom: '4px solid #1877f2' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.8rem' }}>إجمالي الأخبار المنشورة</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark-charcoal)' }}>1,245</p>
                </div>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderBottom: '4px solid #25d366' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.8rem' }}>الزيارات هذا اليوم</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark-charcoal)' }}>48.5K</p>
                </div>
                <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderBottom: '4px solid var(--primary-red)' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.8rem' }}>إجمالي الأقسام النشطة</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark-charcoal)' }}>8</p>
                </div>
            </div>

            <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontFamily: 'var(--font-primary)', marginBottom: '1rem', color: 'var(--primary-red)' }}>مرحباً بك في لوحة تحكم صوت الميديا</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                    من هنا يمكنك التحكم الكامل في المحتوى الخاص بالموقع. بفضل هذه الواجهة يمكنك:
                    <br />- <strong>إضافة أخبار سريعة</strong> ومقالات متعمقة مع الصور وتحديد الأقسام.
                    <br />- <strong>إدارة وتعديل الأخبار السابقة</strong> بكل سهولة.
                    <br />- <strong>التحكم في الأقسام</strong> وإدارتها.
                    <br /><br />
                    استخدم القائمة الجانبية للتنقل بين أدوات النظام.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
