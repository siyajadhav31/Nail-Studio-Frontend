
/* ==========================================
   NAIL STUDIO - FRONTEND AUTHENTICATION
   Spring Boot Backend Session Authentication
   ========================================== */

(function () {
    const LOGIN_KEY = "nailStudioLoggedIn";
    const USER_KEY = "nailStudioUser";

    const API_URL =
        "https://nail-studio-backend-k604.onrender.com/api/users";

    /* ==========================================
       CHECK FRONTEND LOGIN
       ========================================== */

    function isLoggedIn() {
        return localStorage.getItem(LOGIN_KEY) === "true";
    }

    /* ==========================================
       GET CURRENT USER
       ========================================== */

    function getCurrentUser() {
        const userData = localStorage.getItem(USER_KEY);

        if (!userData) {
            return null;
        }

        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error("Unable to read user data:", error);
            return null;
        }
    }

    /* ==========================================
       PROTECT PAGE
       ========================================== */

    function protectPage() {
        if (!isLoggedIn()) {
            window.location.href = "login.html";
        }
    }

    /* ==========================================
       REGISTER USER
       Backend: POST /api/users/register
       ========================================== */

    async function registerUser(name, email, password) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: result.message || "Registration failed."
                };
            }

            return {
                success: true,
                message: result.message || "Registration successful."
            };
        } catch (error) {
            console.error("Registration error:", error);

            return {
                success: false,
                message: "Unable to connect to the server. Please try again."
            };
        }
    }

    /* ==========================================
       LOGIN USER
       Backend: POST /api/users/login
       ========================================== */

    async function loginUser(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: result.message || "Incorrect email or password."
                };
            }

            // Store frontend display information only.
            // Password is NOT stored in localStorage.
            const user = {
                name: result.name,
                email: result.email
            };

            localStorage.setItem(LOGIN_KEY, "true");
            localStorage.setItem(USER_KEY, JSON.stringify(user));

            return {
                success: true,
                message: result.message || "Login successful.",
                user: user
            };
        } catch (error) {
            console.error("Login error:", error);

            return {
                success: false,
                message: "Unable to connect to the server. Please try again."
            };
        }
    }

    /* ==========================================
       CHECK BACKEND SESSION
       Backend: GET /api/users/session
       ========================================== */

    async function checkBackendSession() {
        try {
            const response = await fetch(`${API_URL}/session`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                return {
                    success: false,
                    loggedIn: false
                };
            }

            const result = await response.json();

            if (result.loggedIn) {
                localStorage.setItem(LOGIN_KEY, "true");

                localStorage.setItem(
                    USER_KEY,
                    JSON.stringify({
                        name: result.name,
                        email: result.email
                    })
                );

                return {
                    success: true,
                    loggedIn: true,
                    user: result
                };
            }

            return {
                success: false,
                loggedIn: false
            };
        } catch (error) {
            console.error("Session check error:", error);

            return {
                success: false,
                loggedIn: false
            };
        }
    }

    /* ==========================================
       LOGOUT
       Clear frontend state and invalidate
       the backend session.
       ========================================== */

    async function logout() {
        try {
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include"
            });
        } catch (error) {
            console.error("Backend logout error:", error);
        }

        localStorage.removeItem(LOGIN_KEY);
        localStorage.removeItem(USER_KEY);

        window.location.href = "login.html";
    }

    /* ==========================================
       MAKE FUNCTIONS AVAILABLE
       ========================================== */

    window.NailStudioAuth = {
        isLoggedIn: isLoggedIn,
        getCurrentUser: getCurrentUser,
        protectPage: protectPage,
        logout: logout,
        registerUser: registerUser,
        loginUser: loginUser,
        checkBackendSession: checkBackendSession
    };
})();
