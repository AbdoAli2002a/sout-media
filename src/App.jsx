import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Header from './components/layout/Header';
import NewsTicker from './components/layout/NewsTicker';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';

import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddArticle from './pages/admin/AddArticle';
import EditArticle from './pages/admin/EditArticle';
import ManageArticles from './pages/admin/ManageArticles';

const PublicLayout = ({ children }) => (
  <>
    <NewsTicker />
    <Header />
    <main style={{ minHeight: '60vh' }}>
      {children}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/article/:id" element={<PublicLayout><ArticlePage /></PublicLayout>} />
            <Route path="/category/:id" element={<PublicLayout><CategoryPage /></PublicLayout>} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="articles/new" element={<AddArticle />} />
              <Route path="articles/edit/:id" element={<EditArticle />} />
              <Route path="articles" element={<ManageArticles />} />
              <Route path="categories" element={
                <div className="admin-page" style={{ padding: '2rem' }}>
                  <div className="page-header flex-between">
                    <h1>إدارة الأقسام والتصنيفات</h1>
                    <button className="btn btn-primary">+ إضافة قسم رئيسي</button>
                  </div>
                  <div className="table-card">
                    <p style={{ color: 'var(--text-muted)' }}>إدارة الأقسام - سيتم تفعيلها برمجياً لاحقاً.</p>
                  </div>
                </div>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
