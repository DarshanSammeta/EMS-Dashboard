import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { LayoutDashboard, Users, BarChart3, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    { icon: Users, text: 'Manage Employees' },
    { icon: BarChart3, text: 'Track Analytics' },
    { icon: Shield, text: 'Secure Access' },
  ];

  return (
    <div className="min-h-screen bg-background flex">

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="p-2 rounded-lg bg-primary">
              <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">EMS Dashboard</h1>
          </div>

          <div className="bg-card rounded-2xl card-shadow-lg p-8 animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to access your dashboard
              </p>
            </div>

            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            © 2026 EMS Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
