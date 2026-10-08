/* ==========================================
   NAIL STUDIO - FRONTEND AUTHENTICATION
   ========================================== */

(function () {

    const LOGIN_KEY = "nailStudioLoggedIn";
    const USER_KEY = "nailStudioUser";


    /* ==========================================
       CHECK LOGIN
       ========================================== */

    function isLoggedIn() {

        return localStorage.getItem(LOGIN_KEY) === "true";

    }


    /* ==========================================
       GET CURRENT USER
       ========================================== */

    function getCurrentUser() {

        const userData =
            localStorage.getItem(USER_KEY);

        if (!userData) {
            return null;
        }

        try {

            return JSON.parse(userData);

        } catch (error) {

            console.error(
                "Unable to read user data:",
                error
            );

            return null;

        }

    }


    /* ==========================================
       LOGIN PAGE REDIRECT
       ========================================== */

    function protectPage() {

        if (!isLoggedIn()) {

            window.location.href =
                "login.html";

        }

    }


    /* ==========================================
       LOGOUT
       ========================================== */

    function logout() {

        localStorage.removeItem(LOGIN_KEY);
        localStorage.removeItem(USER_KEY);

        window.location.href =
            "login.html";

    }


    /* ==========================================
       REGISTER USER
       ========================================== */

    function registerUser(name, email, password) {

        const existingUser =
            localStorage.getItem(USER_KEY);

        if (existingUser) {

            try {

                const user =
                    JSON.parse(existingUser);

                if (
                    user.email.toLowerCase() ===
                    email.toLowerCase()
                ) {

                    return {
                        success: false,
                        message:
                            "An account with this email already exists."
                    };

                }

            } catch (error) {

                console.error(error);

            }

        }


        const user = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );


        return {

            success: true,

            message:
                "Account created successfully."

        };

    }


    /* ==========================================
       LOGIN USER
       ========================================== */

    function loginUser(email, password) {

        const userData =
            localStorage.getItem(USER_KEY);


        if (!userData) {

            return {

                success: false,

                message:
                    "Account not found. Please create an account first."

            };

        }


        let user;

        try {

            user =
                JSON.parse(userData);

        } catch (error) {

            return {

                success: false,

                message:
                    "Account data is invalid."

            };

        }


        if (
            user.email.toLowerCase() !==
            email.toLowerCase()
        ) {

            return {

                success: false,

                message:
                    "Incorrect email or password."

            };

        }


        if (
            user.password !== password
        ) {

            return {

                success: false,

                message:
                    "Incorrect email or password."

            };

        }


        localStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        return {

            success: true,

            message:
                "Login successful."

        };

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

        loginUser: loginUser

    };

})();