import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
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
