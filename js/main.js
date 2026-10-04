/* =========================================================
   NAIL STUDIO - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
    "https://nail-studio-backend-k604.onrender.com/api/bookings";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Main JS Loaded");
    console.log("Backend API:", API_URL);


    /* =====================================================
       MOBILE NAVBAR
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ===================================================== */

    if (navLinks) {

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

            });

        });

    }


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    const bookingForm =
        document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            handleBookingSubmit
        );

    }


    /* =====================================================
       VIRTUAL BOOKING FORM
    ===================================================== */

    const virtualBookingForm =
        document.getElementById("virtualBookingForm");

    if (virtualBookingForm) {

        virtualBookingForm.addEventListener(
            "submit",
            handleVirtualBookingSubmit
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            handleContactSubmit
        );

    }


    /* =====================================================
       DATE MINIMUM
    ===================================================== */

    setMinimumDate();


    /* =====================================================
       LOAD SELECTED SERVICE
    ===================================================== */

    loadSelectedService();


    /* =====================================================
       VIRTUAL NAIL PREVIEW
    ===================================================== */

    initializeVirtualPreview();


    /* =====================================================
       GALLERY
    ===================================================== */

    initializeGallery();

});


/* =========================================================
   SET MINIMUM BOOKING DATE
========================================================= */

function setMinimumDate() {

    const dateInputs =
        document.querySelectorAll(
            'input[type="date"]'
        );

    if (!dateInputs.length) {
        return;
    }

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    dateInputs.forEach(function (input) {

        input.min = todayString;

    });

}


/* =========================================================
   LOAD SELECTED SERVICE
========================================================= */

function loadSelectedService() {

    const serviceSelect =
        document.getElementById("service");

    if (!serviceSelect) {
        return;
    }

    const selectedService =
        localStorage.getItem(
            "selectedService"
        );

    if (!selectedService) {
        return;
    }

    const options =
        serviceSelect.querySelectorAll("option");

    options.forEach(function (option) {

        if (
            option.value === selectedService ||
            option.textContent.trim() === selectedService
        ) {

            option.selected = true;

        }

    });

}


/* =========================================================
   BOOKING SUBMIT
========================================================= */

async function handleBookingSubmit(event) {

    event.preventDefault();

    const form =
        event.target;

    const name =
        getInputValue(form, "name");

    const email =
        getInputValue(form, "email");

    const phone =
        getInputValue(form, "phone");

    const service =
        getInputValue(form, "service");

    const date =
        getInputValue(form, "date");

    const time =
        getInputValue(form, "time");

    const notes =
        getInputValue(form, "notes");


    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!name) {

        showMessage(
            "Please enter your name.",
            "error"
        );

        return;

    }


    if (!validateEmail(email)) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!phone) {

        showMessage(
            "Please enter your phone number.",
            "error"
        );

        return;

    }


    if (!service) {

        showMessage(
            "Please select a service.",
            "error"
        );

        return;

    }


    if (!date) {

        showMessage(
            "Please select a date.",
            "error"
        );

        return;

    }


    if (!time) {

        showMessage(
            "Please select a time.",
            "error"
        );

        return;

    }


    /* -----------------------------------------------------
       BOOKING DATA
    ----------------------------------------------------- */

    const bookingData = {

        name: name,

        email: email,

        phone: phone,

        service: service,

        date: date,

        time: time,

        notes: notes

    };


    console.log(
        "Sending booking:",
        bookingData
    );


    try {

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            bookingData
                        )
                }
            );


        console.log(
            "Booking status:",
            response.status
        );


        const responseText =
            await response.text();

        console.log(
            "Booking response:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Booking failed"
            );

        }


        /* -------------------------------------------------
           SUCCESS
        ------------------------------------------------- */

        showMessage(
            "Your appointment has been booked successfully!",
            "success"
        );


        form.reset();


        localStorage.removeItem(
            "selectedService"
        );


    } catch (error) {

        console.error(
            "Booking error:",
            error
        );


        showMessage(
            "Unable to book appointment. Please try again.",
            "error"
        );

    }

}


/* =========================================================
   VIRTUAL BOOKING SUBMIT
========================================================= */

async function handleVirtualBookingSubmit(event) {

    event.preventDefault();

    const form =
        event.target;


    const name =
        getInputValue(form, "name");

    const email =
        getInputValue(form, "email");

    const phone =
        getInputValue(form, "phone");

    const service =
        getInputValue(form, "service");

    const date =
        getInputValue(form, "date");

    const time =
        getInputValue(form, "time");

    const notes =
        getInputValue(form, "notes");


    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!name) {

        showMessage(
            "Please enter your name.",
            "error"
        );

        return;

    }


    if (!validateEmail(email)) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!phone) {

        showMessage(
            "Please enter your phone number.",
            "error"
        );

        return;

    }


    if (!service) {

        showMessage(
            "Please select a service.",
            "error"
        );

        return;

    }


    if (!date) {

        showMessage(
            "Please select a date.",
            "error"
        );

        return;

    }


    if (!time) {

        showMessage(
            "Please select a time.",
            "error"
        );

        return;

    }


    /* -----------------------------------------------------
       DATA
    ----------------------------------------------------- */

    const bookingData = {

        name: name,

        email: email,

        phone: phone,

        service: service,

        date: date,

        time: time,

        notes: notes

    };


    console.log(
        "Sending virtual booking:",
        bookingData
    );


    try {

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            bookingData
                        )
                }
            );


        const responseText =
            await response.text();


        console.log(
            "Virtual booking response:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Virtual booking failed"
            );

        }


        showMessage(
            "Your virtual appointment has been booked successfully!",
            "success"
        );


        form.reset();


    } catch (error) {

        console.error(
            "Virtual booking error:",
            error
        );


        showMessage(
            "Unable to book appointment. Please try again.",
            "error"
        );

    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

async function handleContactSubmit(event) {

    event.preventDefault();

    const form =
        event.target;


    const name =
        getInputValue(form, "name");

    const email =
        getInputValue(form, "email");

    const message =
        getInputValue(form, "message");


    if (!name) {

        showMessage(
            "Please enter your name.",
            "error"
        );

        return;

    }


    if (!validateEmail(email)) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!message) {

        showMessage(
            "Please enter your message.",
            "error"
        );

        return;

    }


    console.log(
        "Contact form:",
        {
            name,
            email,
            message
        }
    );


    /*
       Contact endpoint can be connected here
       if your backend has one.

       For now this gives a successful UI response.
    */


    showMessage(
        "Thank you! Your message has been sent.",
        "success"
    );


    form.reset();

}


/* =========================================================
   GET INPUT VALUE
========================================================= */

function getInputValue(form, name) {

    if (!form) {
        return "";
    }


    const input =
        form.querySelector(
            `[name="${name}"]`
        );


    if (!input) {
        return "";
    }


    return input.value.trim();

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(
        email
    );

}


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(
    message,
    type = "success"
) {

    /*
       Try existing message container first.
    */

    let messageBox =
        document.getElementById(
            "formMessage"
        );


    /*
       If it doesn't exist,
       create one automatically.
    */

    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.id =
            "formMessage";

        messageBox.style.marginTop =
            "15px";

        messageBox.style.padding =
            "12px 15px";

        messageBox.style.borderRadius =
            "8px";

        messageBox.style.fontSize =
            "14px";

        const form =
            document.querySelector(
                "form"
            );

        if (form) {

            form.appendChild(
                messageBox
            );

        } else {

            document.body.appendChild(
                messageBox
            );

        }

    }


    messageBox.textContent =
        message;


    if (type === "error") {

        messageBox.style.background =
            "#ffe5e5";

        messageBox.style.color =
            "#b42318";

        messageBox.style.border =
            "1px solid #f5b5b5";

    } else {

        messageBox.style.background =
            "#e8f7ed";

        messageBox.style.color =
            "#18794e";

        messageBox.style.border =
            "1px solid #b7e4c7";

    }


    messageBox.style.display =
        "block";


    /*
       Automatically hide after 5 seconds.
    */

    setTimeout(function () {

        if (messageBox) {

            messageBox.style.display =
                "none";

        }

    }, 5000);

}


/* =========================================================
   VIRTUAL NAIL PREVIEW
========================================================= */

function initializeVirtualPreview() {

    const preview =
        document.getElementById(
            "nailPreview"
        );


    if (!preview) {
        return;
    }


    const colorButtons =
        document.querySelectorAll(
            "[data-color]"
        );


    const shapeButtons =
        document.querySelectorAll(
            "[data-shape]"
        );


    const lengthButtons =
        document.querySelectorAll(
            "[data-length]"
        );


    /* -----------------------------------------------------
       COLOR
    ----------------------------------------------------- */

    colorButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const color =
                        button.dataset.color;

                    if (color) {

                        preview.style.setProperty(
                            "--nail-color",
                            color
                        );

                    }


                    colorButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* -----------------------------------------------------
       SHAPE
    ----------------------------------------------------- */

    shapeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const shape =
                        button.dataset.shape;


                    preview.dataset.shape =
                        shape;


                    shapeButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    /* -----------------------------------------------------
       LENGTH
    ----------------------------------------------------- */

    lengthButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const length =
                        button.dataset.length;


                    preview.dataset.length =
                        length;


                    lengthButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   GALLERY
========================================================= */

function initializeGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (!galleryItems.length) {
        return;
    }


    galleryItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const image =
                        item.querySelector(
                            "img"
                        );


                    if (!image) {
                        return;
                    }


                    openImageViewer(
                        image.src,
                        image.alt
                    );

                }
            );

        }
    );

}


/* =========================================================
   IMAGE VIEWER
========================================================= */

function openImageViewer(
    imageSrc,
    imageAlt = ""
) {

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "image-viewer-overlay";


    overlay.innerHTML = `

        <div class="image-viewer-content">

            <button
                class="image-viewer-close"
                aria-label="Close"
            >
                &times;
            </button>

            <img
                src="${imageSrc}"
                alt="${imageAlt}"
                class="image-viewer-image"
            >

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    const closeButton =
        overlay.querySelector(
            ".image-viewer-close"
        );


    closeButton.addEventListener(
        "click",
        function () {

            overlay.remove();

        }
    );


    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === overlay
            ) {

                overlay.remove();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function escapeHandler(event) {

            if (
                event.key === "Escape"
            ) {

                overlay.remove();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        }
    );

}


/* =========================================================
   SERVICE SELECTION
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const serviceButton =
            event.target.closest(
                "[data-service]"
            );


        if (!serviceButton) {
            return;
        }


        const service =
            serviceButton.dataset.service;


        if (!service) {
            return;
        }


        localStorage.setItem(
            "selectedService",
            service
        );


        console.log(
            "Selected service:",
            service
        );

    }
);


/* =========================================================
   BOOK NOW BUTTONS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const bookButton =
            event.target.closest(
                ".book-now"
            );


        if (!bookButton) {
            return;
        }


        const service =
            bookButton.dataset.service;


        if (service) {

            localStorage.setItem(
                "selectedService",
                service
            );

        }

    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {
            return;
        }


        const targetId =
            link.getAttribute(
                "href"
            );


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(
                targetId
            );


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   CONSOLE INFORMATION
========================================================= */

console.log(
    "Nail Studio main.js initialized successfully."
);

console.log(
    "API URL:",
    API_URL
);