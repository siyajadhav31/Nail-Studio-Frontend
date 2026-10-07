/* =========================================================
   💅 NAIL STUDIO - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
    "https://nail-studio-backend-k604.onrender.com/api/bookings";


/* =========================================================
   DOM READY
========================================================= */

function initializeWebsite() {

    console.log("=================================");
    console.log("💅 NAIL STUDIO MAIN JS LOADED");
    console.log("=================================");
    console.log("Backend API:", API_URL);


    /* =====================================================
       MOBILE NAVBAR
    ===================================================== */

    initializeMobileNavbar();


    /* =====================================================
       NORMAL BOOKING
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
       VIRTUAL BOOKING
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
       DATE
    ===================================================== */

    setMinimumDate();


    /* =====================================================
       SERVICE
    ===================================================== */

    loadSelectedService();


    /* =====================================================
       💅 VIRTUAL NAIL PREVIEW
    ===================================================== */

    initializeVirtualPreview();


    /* =====================================================
       GALLERY
    ===================================================== */

    initializeGallery();


    console.log(
        "💅 All Nail Studio functions initialized."
    );

}


/* =========================================================
   START WEBSITE
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

} else {

    initializeWebsite();

}


/* =========================================================
   MOBILE NAVBAR
========================================================= */

function initializeMobileNavbar() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (!menuToggle || !navLinks) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );


    const links =
        navLinks.querySelectorAll("a");


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   SET MINIMUM DATE
========================================================= */

function setMinimumDate() {

    const dateInputs =
        document.querySelectorAll(
            'input[type="date"]'
        );


    if (!dateInputs.length) {
        return;
    }


    const today =
        new Date();


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


    dateInputs.forEach(
        function (input) {

            input.min =
                todayString;

        }
    );

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


    const priceBox =
        document.getElementById("priceBox");


    const selectedServiceName =
        document.getElementById(
            "selectedServiceName"
        );


    const selectedServicePrice =
        document.getElementById(
            "selectedServicePrice"
        );


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const serviceFromURL =
        urlParams.get("service");


    const serviceFromStorage =
        localStorage.getItem(
            "selectedService"
        );


    const serviceToSelect =
        serviceFromURL ||
        serviceFromStorage;


    if (!serviceToSelect) {
        return;
    }


    const options =
        serviceSelect.querySelectorAll(
            "option"
        );


    let foundOption =
        null;


    options.forEach(
        function (option) {

            if (
                option.value ===
                serviceToSelect
            ) {

                foundOption =
                    option;

            }

        }
    );


    if (foundOption) {

        foundOption.selected =
            true;


        const price =
            foundOption.getAttribute(
                "data-price"
            );


        if (selectedServiceName) {

            selectedServiceName.textContent =
                foundOption.value;

        }


        if (selectedServicePrice) {

            selectedServicePrice.textContent =
                "₹" +
                Number(
                    price || 0
                ).toLocaleString(
                    "en-IN"
                );

        }


        if (priceBox) {

            priceBox.style.display =
                "block";

        }


        localStorage.setItem(
            "selectedService",
            foundOption.value
        );

    }

}


/* =========================================================
   NORMAL BOOKING
========================================================= */

async function handleBookingSubmit(event) {

    event.preventDefault();


    const form =
        event.target;


    const name =
        getInputValue(
            form,
            "name"
        );


    const email =
        getInputValue(
            form,
            "email"
        );


    const phone =
        getInputValue(
            form,
            "phone"
        );


    const service =
        getInputValue(
            form,
            "service"
        );


    const date =
        getInputValue(
            form,
            "date"
        );


    const time =
        getInputValue(
            form,
            "time"
        );


    const notes =
        getInputValue(
            form,
            "notes"
        );


    /* =====================================================
       VALIDATION
    ===================================================== */

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


    if (
        !phone ||
        !/^[0-9]{10}$/.test(phone)
    ) {

        showMessage(
            "Please enter a valid 10-digit phone number.",
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


    /* =====================================================
       💅 NORMAL BOOKING DATA
    ===================================================== */

    const bookingData = {

        name:
            name,

        email:
            email,

        phone:
            phone,

        service:
            service,

        bookingDate:
            date,

        bookingTime:
            time,

        date:
            date,

        time:
            time,

        bookingType:
            "SERVICE",

        notes:
            notes

    };


    console.log(
        "================================="
    );

    console.log(
        "💅 SENDING NORMAL SERVICE BOOKING"
    );

    console.log(
        bookingData
    );

    console.log(
        "================================="
    );


    try {

        const response =
            await fetch(
                API_URL,
                {
                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
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
            "Booking status:",
            response.status
        );


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


        showMessage(
            "💅 Your appointment has been booked successfully!",
            "success"
        );


        form.reset();


        localStorage.removeItem(
            "selectedService"
        );


    } catch (error) {

        console.error(
            "❌ Booking error:",
            error
        );


        showMessage(
            "Unable to book appointment. Please try again.",
            "error"
        );

    }

}


/* =========================================================
   💅 VIRTUAL BOOKING
========================================================= */

async function handleVirtualBookingSubmit(event) {

    event.preventDefault();


    const form =
        event.target;


    /* =====================================================
       BASIC DETAILS
    ===================================================== */

    const name =
        getInputValue(
            form,
            "name"
        );


    const email =
        getInputValue(
            form,
            "email"
        );


    const phone =
        getInputValue(
            form,
            "phone"
        );


    /* =====================================================
       VIRTUAL SERVICE
    ===================================================== */

    const service =
        getInputValue(
            form,
            "service"
        ) ||
        "Virtual Nail Shape";


    /* =====================================================
       DATE
    ===================================================== */

    const dateInput =
        form.querySelector(
            '[name="bookingDate"]'
        );


    const date =
        dateInput
            ? dateInput.value.trim()
            : "";


    /* =====================================================
       TIME
    ===================================================== */

    const timeInput =
        form.querySelector(
            '[name="time"]'
        );


    const time =
        timeInput
            ? timeInput.value.trim()
            : "";


    /* =====================================================
       SHAPE
    ===================================================== */

    const virtualShapeInput =
        document.getElementById(
            "virtualShape"
        );


    const bookingShapeElement =
        document.getElementById(
            "bookingShape"
        );


    const previewShapeElement =
        document.getElementById(
            "previewShape"
        );


    let shape =
        "Almond";


    if (
        virtualShapeInput &&
        virtualShapeInput.value
    ) {

        shape =
            virtualShapeInput.value;

    } else if (
        bookingShapeElement &&
        bookingShapeElement.textContent
    ) {

        shape =
            bookingShapeElement.textContent.trim();

    } else if (
        previewShapeElement &&
        previewShapeElement.textContent
    ) {

        shape =
            previewShapeElement.textContent.trim();

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

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


    if (
        !phone ||
        !/^[0-9]{10}$/.test(phone)
    ) {

        showMessage(
            "Please enter a valid 10-digit phone number.",
            "error"
        );

        return;

    }


    if (!date) {

        showMessage(
            "Please select a booking date.",
            "error"
        );

        return;

    }


    if (!time) {

        showMessage(
            "Please select an appointment time.",
            "error"
        );

        return;

    }


    /* =====================================================
       💅 VIRTUAL BOOKING DATA
    ===================================================== */

    const bookingData = {

        name:
            name,

        email:
            email,

        phone:
            phone,

        service:
            service,

        bookingType:
            "VIRTUAL",

        bookingDate:
            date,

        bookingTime:
            time,

        date:
            date,

        time:
            time,

        shape:
            shape,

        design:
            shape,

        shade:
            "",

        notes:
            `Virtual Nail Shape Booking | Shape: ${shape}`

    };


    console.log(
        "================================="
    );

    console.log(
        "💅 SENDING VIRTUAL NAIL SHAPE BOOKING"
    );

    console.log(
        "================================="
    );

    console.log(
        "Name:",
        bookingData.name
    );

    console.log(
        "Email:",
        bookingData.email
    );

    console.log(
        "Phone:",
        bookingData.phone
    );

    console.log(
        "Service:",
        bookingData.service
    );

    console.log(
        "Booking Type:",
        bookingData.bookingType
    );

    console.log(
        "Booking Date:",
        bookingData.bookingDate
    );

    console.log(
        "Booking Time:",
        bookingData.bookingTime
    );

    console.log(
        "Selected Shape:",
        bookingData.shape
    );

    console.log(
        "Complete Data:",
        bookingData
    );

    console.log(
        "================================="
    );


    /* =====================================================
       SEND TO BACKEND
    ===================================================== */

    try {

        const response =
            await fetch(
                API_URL,
                {
                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
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
            "Virtual booking status:",
            response.status
        );


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
            "✨ Your virtual nail shape appointment has been booked successfully!",
            "success"
        );


        form.reset();


        /* =================================================
           RESET SHAPE
        ================================================= */

        const virtualShape =
            document.getElementById(
                "virtualShape"
            );


        if (virtualShape) {

            virtualShape.value =
                "Almond";

        }


        const previewShape =
            document.getElementById(
                "previewShape"
            );


        if (previewShape) {

            previewShape.textContent =
                "Almond";

        }


        const bookingShape =
            document.getElementById(
                "bookingShape"
            );


        if (bookingShape) {

            bookingShape.textContent =
                "Almond";

        }


        const selectedShapeTitle =
            document.getElementById(
                "selectedShapeTitle"
            );


        if (selectedShapeTitle) {

            selectedShapeTitle.textContent =
                "Almond Shape";

        }


        const selectedShapeDescription =
            document.getElementById(
                "selectedShapeDescription"
            );


        if (selectedShapeDescription) {

            selectedShapeDescription.textContent =
                "Elegant and feminine with softly tapered sides. Perfect for a classy and timeless look.";

        }


        /* =================================================
           RESET NAIL SHAPE
        ================================================= */

        const nailStage =
            document.getElementById(
                "nailPreviewStage"
            );


        if (nailStage) {

            nailStage.classList.remove(
                "shape-almond",
                "shape-square",
                "shape-coffin",
                "shape-oval",
                "shape-stiletto",
                "shape-squoval",
                "shape-ballerina",
                "shape-lipstick",
                "shape-flare",
                "shape-edge"
            );


            nailStage.classList.add(
                "shape-almond"
            );

        }


        /* =================================================
           RESET ACTIVE BUTTON
        ================================================= */

        document
            .querySelectorAll(
                ".shape-option"
            )
            .forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                    if (
                        button.dataset.shape ===
                        "Almond"
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


        closeVirtualPreview();


    } catch (error) {

        console.error(
            "❌ Virtual booking error:",
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
        getInputValue(
            form,
            "name"
        );


    const email =
        getInputValue(
            form,
            "email"
        );


    const message =
        getInputValue(
            form,
            "message"
        );


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
            name:
                name,

            email:
                email,

            message:
                message

        }
    );


    showMessage(
        "Thank you! Your message has been sent.",
        "success"
    );


    form.reset();

}


/* =========================================================
   GET INPUT VALUE
========================================================= */

function getInputValue(
    form,
    name
) {

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


    return emailPattern.test(email);

}


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(
    message,
    type = "success"
) {

    let messageBox =
        document.getElementById(
            "formMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );


        messageBox.id =
            "formMessage";


        messageBox.style.position =
            "fixed";


        messageBox.style.top =
            "20px";


        messageBox.style.right =
            "20px";


        messageBox.style.zIndex =
            "9999999";


        messageBox.style.maxWidth =
            "400px";


        messageBox.style.padding =
            "15px 20px";


        messageBox.style.borderRadius =
            "10px";


        messageBox.style.fontSize =
            "14px";


        messageBox.style.fontFamily =
            "Arial, sans-serif";


        messageBox.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.15)";


        document.body.appendChild(
            messageBox
        );

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


    setTimeout(
        function () {

            if (messageBox) {

                messageBox.style.display =
                    "none";

            }

        },
        5000
    );

}


/* =========================================================
   💅 VIRTUAL NAIL PREVIEW
========================================================= */

function initializeVirtualPreview() {

    console.log(
        "💅 Initializing Virtual Nail Shape Studio..."
    );


    const previewModal =
        document.getElementById(
            "previewModal"
        );


    const closeModal =
        document.getElementById(
            "closeModal"
        );


    const nailStage =
        document.getElementById(
            "nailPreviewStage"
        );


    if (!previewModal) {

        console.log(
            "Virtual Preview not available on this page."
        );

        return;

    }


    /* =====================================================
       OPEN PREVIEW
    ===================================================== */

    function openVirtualPreview() {

        previewModal.classList.add(
            "open"
        );


        previewModal.classList.add(
            "show"
        );


        previewModal.style.setProperty(
            "display",
            "flex",
            "important"
        );


        previewModal.style.setProperty(
            "visibility",
            "visible",
            "important"
        );


        previewModal.style.setProperty(
            "opacity",
            "1",
            "important"
        );


        previewModal.style.setProperty(
            "pointer-events",
            "auto",
            "important"
        );


        previewModal.style.setProperty(
            "z-index",
            "999999",
            "important"
        );


        document.body.style.overflow =
            "hidden";


        updateVirtualPreview();


        console.log(
            "💅 Virtual Nail Shape Studio OPENED"
        );

    }


    /* =====================================================
       PREVIEW BUTTON
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "#previewBtn, #previewBtnBottom"
                );


            if (!button) {
                return;
            }


            event.preventDefault();


            event.stopPropagation();


            openVirtualPreview();

        },
        true
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeVirtualPreview();

            }
        );

    }


    /* =====================================================
       CLOSE BACKDROP
    ===================================================== */

    previewModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                previewModal
            ) {

                closeVirtualPreview();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                previewModal.classList.contains("open")
            ) {

                closeVirtualPreview();

            }

        }
    );


    /* =====================================================
       💅 SHAPE OPTIONS - 10 SHAPES
    ===================================================== */

    const shapeButtons =
        document.querySelectorAll(
            ".shape-option"
        );


    const allShapeClasses = [

        "shape-almond",

        "shape-square",

        "shape-coffin",

        "shape-oval",

        "shape-stiletto",

        "shape-squoval",

        "shape-ballerina",

        "shape-lipstick",

        "shape-flare",

        "shape-edge"

    ];


    const shapeDescriptions = {

        "Almond": {

            title:
                "Almond Shape",

            description:
                "Elegant and feminine with softly tapered sides. Perfect for a classy and timeless look."

        },


        "Square": {

            title:
                "Square Shape",

            description:
                "Clean, straight edges with a modern finish. Perfect for a bold and neat look."

        },


        "Coffin": {

            title:
                "Coffin Shape",

            description:
                "Long with tapered sides and a flat tip. A stylish and glamorous choice."

        },


        "Oval": {

            title:
                "Oval Shape",

            description:
                "Soft and rounded with a natural appearance. Perfect for an elegant everyday look."

        },


        "Stiletto": {

            title:
                "Stiletto Shape",

            description:
                "Sharp and dramatic with a pointed tip. Perfect for a bold statement look."

        },


        "Squoval": {

            title:
                "Squoval Shape",

            description:
                "A beautiful combination of square and oval. Soft corners with a clean finish."

        },


        "Ballerina": {

            title:
                "Ballerina Shape",

            description:
                "Long and tapered with a flat tip. Inspired by classic ballerina nails."

        },


        "Lipstick": {

            title:
                "Lipstick Shape",

            description:
                "A unique angled tip inspired by the shape of a lipstick. Perfect for a creative look."

        },


        "Flare": {

            title:
                "Flare Shape",

            description:
                "Nails that widen towards the tip for a fun and fashionable statement."

        },


        "Edge": {

            title:
                "Edge Shape",

            description:
                "A sharp geometric style with an edgy pointed finish. Perfect for a unique look."

        }

    };


    /* =====================================================
       SHAPE CLICK
    ===================================================== */

    shapeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    /* Remove active */
                    shapeButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Add active */
                    button.classList.add(
                        "active"
                    );


                    const shape =
                        button.dataset.shape;


                    if (!shape) {
                        return;
                    }


                    /* =====================================
                       CHANGE ACTUAL NAIL SHAPE
                    ===================================== */

                    if (nailStage) {

                        nailStage.classList.remove(
                            ...allShapeClasses
                        );


                        const shapeClass =
                            "shape-" +
                            shape
                                .toLowerCase()
                                .replace(
                                    /\s+/g,
                                    "-"
                                );


                        nailStage.classList.add(
                            shapeClass
                        );

                    }


                    /* =====================================
                       SELECTED SHAPE
                    ===================================== */

                    const previewShape =
                        document.getElementById(
                            "previewShape"
                        );


                    const bookingShape =
                        document.getElementById(
                            "bookingShape"
                        );


                    const virtualShape =
                        document.getElementById(
                            "virtualShape"
                        );


                    if (previewShape) {

                        previewShape.textContent =
                            shape;

                    }


                    if (bookingShape) {

                        bookingShape.textContent =
                            shape;

                    }


                    if (virtualShape) {

                        virtualShape.value =
                            shape;

                    }


                    /* =====================================
                       SHAPE INFORMATION
                    ===================================== */

                    const selectedShapeTitle =
                        document.getElementById(
                            "selectedShapeTitle"
                        );


                    const selectedShapeDescription =
                        document.getElementById(
                            "selectedShapeDescription"
                        );


                    const info =
                        shapeDescriptions[
                            shape
                        ];


                    if (info) {

                        if (selectedShapeTitle) {

                            selectedShapeTitle.textContent =
                                info.title;

                        }


                        if (selectedShapeDescription) {

                            selectedShapeDescription.textContent =
                                info.description;

                        }

                    }


                    console.log(
                        "💅 Selected Shape:",
                        shape
                    );

                }
            );

        }
    );


    /* =====================================================
       DEFAULT SHAPE
    ===================================================== */

    const defaultShape =
        document.querySelector(
            ".shape-option.active"
        );


    if (
        defaultShape &&
        nailStage
    ) {

        const defaultShapeValue =
            defaultShape.dataset.shape;


        if (defaultShapeValue) {

            nailStage.classList.remove(
                ...allShapeClasses
            );


            const defaultShapeClass =
                "shape-" +
                defaultShapeValue
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );


            nailStage.classList.add(
                defaultShapeClass
            );


            const previewShape =
                document.getElementById(
                    "previewShape"
                );


            const bookingShape =
                document.getElementById(
                    "bookingShape"
                );


            const virtualShape =
                document.getElementById(
                    "virtualShape"
                );


            if (previewShape) {

                previewShape.textContent =
                    defaultShapeValue;

            }


            if (bookingShape) {

                bookingShape.textContent =
                    defaultShapeValue;

            }


            if (virtualShape) {

                virtualShape.value =
                    defaultShapeValue;

            }


            const info =
                shapeDescriptions[
                    defaultShapeValue
                ];


            if (info) {

                const selectedShapeTitle =
                    document.getElementById(
                        "selectedShapeTitle"
                    );


                const selectedShapeDescription =
                    document.getElementById(
                        "selectedShapeDescription"
                    );


                if (selectedShapeTitle) {

                    selectedShapeTitle.textContent =
                        info.title;

                }


                if (selectedShapeDescription) {

                    selectedShapeDescription.textContent =
                        info.description;

                }

            }

        }

    }


    console.log(
        "💅 10 Nail Shapes initialized successfully."
    );

}


/* =========================================================
   UPDATE VIRTUAL PREVIEW
========================================================= */

function updateVirtualPreview() {

    const nailStage =
        document.getElementById(
            "nailPreviewStage"
        );


    if (!nailStage) {
        return;
    }


    const shapeButtons =
        document.querySelectorAll(
            ".shape-option"
        );


    const allShapeClasses = [

        "shape-almond",

        "shape-square",

        "shape-coffin",

        "shape-oval",

        "shape-stiletto",

        "shape-squoval",

        "shape-ballerina",

        "shape-lipstick",

        "shape-flare",

        "shape-edge"

    ];


    /* =====================================================
       ACTIVE SHAPE
    ===================================================== */

    const activeShape =
        document.querySelector(
            ".shape-option.active"
        );


    if (activeShape) {

        const shape =
            activeShape.dataset.shape;


        if (shape) {

            nailStage.classList.remove(
                ...allShapeClasses
            );


            const shapeClass =
                "shape-" +
                shape
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );


            nailStage.classList.add(
                shapeClass
            );


            const previewShape =
                document.getElementById(
                    "previewShape"
                );


            const bookingShape =
                document.getElementById(
                    "bookingShape"
                );


            const virtualShape =
                document.getElementById(
                    "virtualShape"
                );


            if (previewShape) {

                previewShape.textContent =
                    shape;

            }


            if (bookingShape) {

                bookingShape.textContent =
                    shape;

            }


            if (virtualShape) {

                virtualShape.value =
                    shape;

            }

        }

    }


    /* =====================================================
       ENSURE ONLY ONE SHAPE IS ACTIVE
    ===================================================== */

    if (
        shapeButtons.length &&
        !document.querySelector(
            ".shape-option.active"
        )
    ) {

        shapeButtons[0].classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLOSE VIRTUAL PREVIEW
========================================================= */

function closeVirtualPreview() {

    const previewModal =
        document.getElementById(
            "previewModal"
        );


    if (!previewModal) {
        return;
    }


    previewModal.classList.remove(
        "open"
    );


    previewModal.classList.remove(
        "show"
    );


    previewModal.style.setProperty(
        "display",
        "none",
        "important"
    );


    previewModal.style.setProperty(
        "visibility",
        "hidden",
        "important"
    );


    previewModal.style.setProperty(
        "opacity",
        "0",
        "important"
    );


    previewModal.style.setProperty(
        "pointer-events",
        "none",
        "important"
    );


    document.body.style.overflow =
        "";


    console.log(
        "💅 Virtual Preview closed."
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
                type="button"
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


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                overlay.remove();

            }
        );

    }


    overlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                overlay
            ) {

                overlay.remove();

            }

        }
    );


    function escapeHandler(event) {

        if (
            event.key ===
            "Escape"
        ) {

            overlay.remove();


            document.removeEventListener(
                "keydown",
                escapeHandler
            );

        }

    }


    document.addEventListener(
        "keydown",
        escapeHandler
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


        /* =================================================
           💅 DO NOT TOUCH VIRTUAL PREVIEW
        ================================================= */

        if (
            link.id === "previewBtn" ||
            link.id === "previewBtnBottom"
        ) {

            event.preventDefault();

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

            event.preventDefault();

            return;

        }


        let target =
            null;


        try {

            target =
                document.querySelector(
                    targetId
                );

        } catch (error) {

            console.warn(
                "Invalid smooth-scroll target:",
                targetId
            );

            return;

        }


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }
);


/* =========================================================
   FINAL LOG
========================================================= */

console.log(
    "💅 Nail Studio main.js file loaded successfully."
);