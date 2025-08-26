import { useState } from "react";
import { Router, Route, Switch } from "wouter";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { EnhancedNavigation } from "@/components/enhanced/EnhancedNavigation";
import { AuthModal } from "@/components/AuthModal";
import { CodingLabModal } from "@/components/CodingLabModal";
import { NotificationToast } from "@/components/NotificationToast";
import { HomePage } from "@/pages/HomePage";
import { StudentDashboard } from "@/pages/StudentDashboard";
import { TeacherDashboard } from "@/pages/TeacherDashboard";
import { ParentDashboard } from "@/pages/ParentDashboard";
import { SchoolAdminDashboard } from "@/components/SchoolAdminDashboard";
import { PricingPage } from "@/pages/PricingPage";
import { AdminPage } from "@/pages/AdminPage";
import { TeacherTrainingPage } from "@/pages/TeacherTrainingPage";
import { ContactPage } from "@/pages/ContactPage";
import { CurriculumPage } from "@/pages/CurriculumPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { CertificationPage } from "@/pages/CertificationPage";
import { CoursesPage } from "@/pages/CoursesPage";
import { LessonsPage } from "@/pages/LessonsPage";
import { StudyMaterialsPage } from "@/pages/StudyMaterialsPage";
import { CompetitionsPage } from "@/pages/CompetitionsPage";
import { LearningDashboardPage } from "@/pages/LearningDashboardPage";
import { Footer } from "@/components/Footer";

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard'>('dashboard');
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'signin' | 'signup';
    role?: string;
    ageGroup?: string;
  }>({
    isOpen: false,
    mode: 'signin'
  });
  const [codingLabOpen, setCodingLabOpen] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info'
  });

  const openAuthModal = (mode: 'signin' | 'signup', role?: string, ageGroup?: string) => {
    setAuthModal({ isOpen: true, mode, role, ageGroup });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CodewiseHub...</p>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    return (
      <Switch>
        <Route path="/pricing">
          <PricingPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/teacher-training">
          <TeacherTrainingPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/curriculum">
          <CurriculumPage />
        </Route>
        <Route path="/analytics">
          <AnalyticsPage />
        </Route>
        <Route path="/certification">
          <CertificationPage />
        </Route>
        <Route path="/courses/:ageGroup">
          {({ ageGroup }) => (
            <CoursesPage ageGroup={ageGroup as '6-11' | '12-17'} />
          )}
        </Route>
        <Route path="/lessons/:ageGroup">
          {({ ageGroup }) => (
            <LessonsPage ageGroup={ageGroup as '6-11' | '12-17'} />
          )}
        </Route>
        <Route path="/study-materials/:ageGroup">
          {({ ageGroup }) => (
            <StudyMaterialsPage ageGroup={ageGroup as '6-11' | '12-17'} />
          )}
        </Route>
        <Route path="/competitions/:ageGroup">
          {({ ageGroup }) => (
            <CompetitionsPage ageGroup={ageGroup as '6-11' | '12-17'} />
          )}
        </Route>
        <Route path="/learning/:ageGroup">
          {({ ageGroup }) => (
            <LearningDashboardPage ageGroup={ageGroup as '6-11' | '12-17'} />
          )}
        </Route>
        <Route path="/">
          {user ? renderDashboard() : <HomePage onAuthModalOpen={openAuthModal} />}
        </Route>
      </Switch>
    );
  };

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard onCodingLabOpen={() => setCodingLabOpen(true)} />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'school_admin':
        return <SchoolAdminDashboard user={user} />;
      default:
        return <HomePage onAuthModalOpen={openAuthModal} />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-poppins">
        {/* External Font Awesome and Scripts */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" 
        />
        
        <EnhancedNavigation onAuthModalOpen={openAuthModal} />
        
        {renderMainContent()}

        <AuthModal
          isOpen={authModal.isOpen}
          mode={authModal.mode}
          initialRole={authModal.role}
          initialAgeGroup={authModal.ageGroup}
          onClose={closeAuthModal}
          onSuccess={showNotification}
        />

        <CodingLabModal
          isOpen={codingLabOpen}
          onClose={() => setCodingLabOpen(false)}
        />

        <NotificationToast
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />

        <Toaster />
        
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
