import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Production from "./pages/Production";
import Expenses from "./pages/Expenses";
import Menu from "./pages/Menu";
import Register from "./pages/Register";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <Inventory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/menu"
                    element={
                        <ProtectedRoute>
                            <Menu />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sales"
                    element={
                        <ProtectedRoute>
                            <Sales />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/production"
                    element={
                        <ProtectedRoute>
                            <Production />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/expenses"
                    element={
                        <ProtectedRoute>
                            <Expenses />
                        </ProtectedRoute>
                    }
                />

              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <Dashboard />
                      </ProtectedRoute>
                  }
              />

            </Routes>

        </BrowserRouter>
    );
}

export default App;