import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import DashboardLayout from "@/pages/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import EligibilityChecker from "@/pages/dashboard/EligibilityChecker";
import SalaryCalculator from "@/pages/dashboard/SalaryCalculator";
import SmartRoadmap from "@/pages/dashboard/SmartRoadmap";
import ProgressTracker from "@/pages/dashboard/ProgressTracker";
import CurrentAffairs from "@/pages/dashboard/CurrentAffairs";
import ExamAlerts from "@/pages/dashboard/ExamAlerts";
import ExamNews from "@/pages/dashboard/ExamNews";
import Lessons from "@/pages/dashboard/Lessons";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="roadmap" element={<SmartRoadmap />} />
              <Route path="progress" element={<ProgressTracker />} />
              <Route path="current-affairs" element={<CurrentAffairs />} />
              <Route path="eligibility" element={<EligibilityChecker />} />
              <Route path="salary" element={<SalaryCalculator />} />
              <Route path="alerts" element={<ExamAlerts />} />
              <Route path="news" element={<ExamNews />} />
              <Route path="lessons" element={<Lessons />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(20, 20, 42, 0.95)",
            border: "1px solid rgba(239, 159, 39, 0.25)",
            color: "#fff",
            backdropFilter: "blur(16px)",
          },
        }}
      />
    </div>
  );
}

export default App;
