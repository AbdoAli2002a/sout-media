import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-header">
                    <h2>صوت الميديا<span>.</span></h2>
                    <p>لوحة تحكم الإدارة</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    {error && <div className="error-msg">{error}</div>}

                    <div className="form-group">
                        <label>اسم المستخدم</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="admin2002"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login">تسجيل الدخول</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
