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


    const selectedService =
        localStorage.getItem(
            "selectedService"
        );


    if (!selectedService) {
        return;
    }


    const options =
        serviceSelect.querySelectorAll(
            "option"
        );


    options.forEach(
        function (option) {

            if (
                option.value === selectedService ||
                option.textContent.trim() === selectedService
            ) {

                option.selected =
                    true;

            }

        }
    );

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
       BOOKING DATA
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

        date:
            date,

        time:
            time,

        bookingDate:
            date,

        bookingTime:
            time,

        bookingType:
            "SERVICE",

        notes:
            notes

    };


    console.log(
        "💅 Sending normal booking:",
        bookingData
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
            "bookingDate"
        );


    const time =
        getInputValue(
            form,
            "time"
        );


    /* =====================================================
       SELECTED DESIGN
    ===================================================== */

    const bookingDesignElement =
        document.getElementById(
            "bookingDesign"
        );


    const design =
        bookingDesignElement
            ? bookingDesignElement.textContent.trim()
            : "Classic Nude";


    /* =====================================================
       SELECTED SHADE
    ===================================================== */

    const bookingShadeElement =
        document.getElementById(
            "bookingShade"
        );


    const shade =
        bookingShadeElement
            ? bookingShadeElement.textContent.trim()
            : "Royal Gold";


    /* =====================================================
       SELECTED SHAPE
    ===================================================== */

    const previewShapeElement =
        document.getElementById(
            "previewShape"
        );


    const shape =
        previewShapeElement
            ? previewShapeElement.textContent.trim()
            : "Almond";


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

        /* Backend-compatible fields */
        bookingDate:
            date,

        bookingTime:
            time,

        /* Keep old fields too */
        date:
            date,

        time:
            time,

        /* VERY IMPORTANT */
        bookingType:
            "VIRTUAL",

        notes:
            `Virtual Preview | Shape: ${shape} | Design: ${design} | Shade: ${shade}`

    };


    console.log(
        "================================="
    );

    console.log(
        "💅 SENDING VIRTUAL BOOKING"
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
            "✨ Your virtual appointment has been booked successfully!",
            "success"
        );


        form.reset();


        localStorage.removeItem(
            "selectedService"
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
        "💅 Initializing Virtual Preview..."
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


    console.log(
        "Preview Modal:",
        previewModal
    );


    console.log(
        "Close Button:",
        closeModal
    );


    console.log(
        "Nail Preview Stage:",
        nailStage
    );


    /* =====================================================
       OPEN PREVIEW FUNCTION
    ===================================================== */

    function openVirtualPreview() {

        console.log(
            "================================="
        );

        console.log(
            "✨ TRY VIRTUAL PREVIEW CLICKED"
        );

        console.log(
            "================================="
        );


        if (!previewModal) {

            console.error(
                "❌ #previewModal NOT FOUND"
            );

            alert(
                "Virtual Preview modal not found."
            );

            return;

        }


        previewModal.classList.add(
            "open"
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
            "💅 Virtual Preview OPENED"
        );

    }


    /* =====================================================
       PREVIEW BUTTON
       Works with both IDs
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

    if (
        closeModal &&
        previewModal
    ) {

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

    if (previewModal) {

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

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                previewModal &&
                previewModal.classList.contains("open")
            ) {

                closeVirtualPreview();

            }

        }
    );


    /* =====================================================
       SERVICE OPTIONS
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            ".service-option"
        );


    serviceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    serviceButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const service =
                        button.dataset.service;


                    const previewService =
                        document.getElementById(
                            "previewService"
                        );


                    const bookingService =
                        document.getElementById(
                            "bookingService"
                        );


                    const virtualService =
                        document.getElementById(
                            "virtualService"
                        );


                    if (previewService) {

                        previewService.textContent =
                            service;

                    }


                    if (bookingService) {

                        bookingService.textContent =
                            service;

                    }


                    if (virtualService) {

                        virtualService.value =
                            service;

                    }


                    console.log(
                        "Selected service:",
                        service
                    );

                }
            );

        }
    );


    /* =====================================================
       SHAPE OPTIONS
    ===================================================== */

    const shapeButtons =
        document.querySelectorAll(
            ".shape-option"
        );


    shapeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

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


                    const shape =
                        button.dataset.shape;


                    const previewShape =
                        document.getElementById(
                            "previewShape"
                        );


                    if (previewShape) {

                        previewShape.textContent =
                            shape;

                    }


                    if (nailStage) {

                        nailStage.classList.remove(
                            "shape-almond",
                            "shape-square",
                            "shape-coffin",
                            "shape-oval",
                            "shape-stiletto"
                        );


                        const shapeClass =
                            "shape-" +
                            shape
                                .toLowerCase()
                                .replace(/\s+/g, "-");


                        nailStage.classList.add(
                            shapeClass
                        );

                    }


                    console.log(
                        "Selected shape:",
                        shape
                    );

                }
            );

        }
    );


    /* =====================================================
       DESIGN OPTIONS
    ===================================================== */

    const designButtons =
        document.querySelectorAll(
            ".design-option"
        );


    designButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    designButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const design =
                        button.dataset.design;


                    const previewDesign =
                        document.getElementById(
                            "previewDesign"
                        );


                    const bookingDesign =
                        document.getElementById(
                            "bookingDesign"
                        );


                    if (previewDesign) {

                        previewDesign.textContent =
                            design;

                    }


                    if (bookingDesign) {

                        bookingDesign.textContent =
                            design;

                    }


                    if (nailStage) {

                        nailStage.classList.remove(
                            "design-classic-nude",
                            "design-french-tips",
                            "design-chrome",
                            "design-cat-eye",
                            "design-glitter",
                            "design-floral"
                        );


                        const designClasses = {

                            "Classic Nude":
                                "design-classic-nude",

                            "French Tips":
                                "design-french-tips",

                            "Chrome":
                                "design-chrome",

                            "Cat Eye":
                                "design-cat-eye",

                            "Glitter":
                                "design-glitter",

                            "Floral":
                                "design-floral"

                        };


                        const designClass =
                            designClasses[
                                design
                            ];


                        if (designClass) {

                            nailStage.classList.add(
                                designClass
                            );

                        }

                    }


                    console.log(
                        "Selected design:",
                        design
                    );

                }
            );

        }
    );


    /* =====================================================
       SHADE OPTIONS
    ===================================================== */

    const shadeButtons =
        document.querySelectorAll(
            ".shade-btn"
        );


    shadeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    shadeButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const shade =
                        button.dataset.shade;


                    const color =
                        button.dataset.color;


                    const previewShade =
                        document.getElementById(
                            "previewShade"
                        );


                    const bookingShade =
                        document.getElementById(
                            "bookingShade"
                        );


                    if (previewShade) {

                        previewShade.textContent =
                            shade;

                    }


                    if (bookingShade) {

                        bookingShade.textContent =
                            shade;

                    }


                    const nails =
                        document.querySelectorAll(
                            ".virtual-nail"
                        );


                    nails.forEach(
                        function (nail) {

                            nail.style.backgroundColor =
                                color;

                        }
                    );


                    if (nailStage) {

                        nailStage.style.setProperty(
                            "--nail-color",
                            color
                        );

                    }


                    console.log(
                        "Selected shade:",
                        shade,
                        color
                    );

                }
            );

        }
    );


    /* =====================================================
       DEFAULT SHADE
    ===================================================== */

    const defaultShade =
        document.querySelector(
            ".shade-btn.active"
        );


    if (defaultShade) {

        const defaultColor =
            defaultShade.dataset.color;


        if (defaultColor) {

            document
                .querySelectorAll(
                    ".virtual-nail"
                )
                .forEach(
                    function (nail) {

                        nail.style.backgroundColor =
                            defaultColor;

                    }
                );


            if (nailStage) {

                nailStage.style.setProperty(
                    "--nail-color",
                    defaultColor
                );

            }

        }

    }


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

            const shapeClass =
                "shape-" +
                defaultShapeValue
                    .toLowerCase()
                    .replace(/\s+/g, "-");


            nailStage.classList.add(
                shapeClass
            );

        }

    }


    /* =====================================================
       DEFAULT DESIGN
    ===================================================== */

    const defaultDesign =
        document.querySelector(
            ".design-option.active"
        );


    if (
        defaultDesign &&
        nailStage
    ) {

        const defaultDesignValue =
            defaultDesign.dataset.design;


        const defaultDesignClasses = {

            "Classic Nude":
                "design-classic-nude",

            "French Tips":
                "design-french-tips",

            "Chrome":
                "design-chrome",

            "Cat Eye":
                "design-cat-eye",

            "Glitter":
                "design-glitter",

            "Floral":
                "design-floral"

        };


        const defaultDesignClass =
            defaultDesignClasses[
                defaultDesignValue
            ];


        if (defaultDesignClass) {

            nailStage.classList.add(
                defaultDesignClass
            );

        }

    }


    console.log(
        "💅 Virtual Preview initialized successfully."
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


    /* =====================================================
       SHADE
    ===================================================== */

    const activeShade =
        document.querySelector(
            ".shade-btn.active"
        );


    if (activeShade) {

        const color =
            activeShade.dataset.color;


        if (color) {

            nailStage.style.setProperty(
                "--nail-color",
                color
            );


            document
                .querySelectorAll(
                    ".virtual-nail"
                )
                .forEach(
                    function (nail) {

                        nail.style.backgroundColor =
                            color;

                    }
                );

        }

    }


    /* =====================================================
       SHAPE
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
                "shape-almond",
                "shape-square",
                "shape-coffin",
                "shape-oval",
                "shape-stiletto"
            );


            const shapeClass =
                "shape-" +
                shape
                    .toLowerCase()
                    .replace(/\s+/g, "-");


            nailStage.classList.add(
                shapeClass
            );

        }

    }


    /* =====================================================
       DESIGN
    ===================================================== */

    const activeDesign =
        document.querySelector(
            ".design-option.active"
        );


    if (activeDesign) {

        const design =
            activeDesign.dataset.design;


        const designClasses = {

            "Classic Nude":
                "design-classic-nude",

            "French Tips":
                "design-french-tips",

            "Chrome":
                "design-chrome",

            "Cat Eye":
                "design-cat-eye",

            "Glitter":
                "design-glitter",

            "Floral":
                "design-floral"

        };


        nailStage.classList.remove(
            "design-classic-nude",
            "design-french-tips",
            "design-chrome",
            "design-cat-eye",
            "design-glitter",
            "design-floral"
        );


        if (designClasses[design]) {

            nailStage.classList.add(
                designClasses[design]
            );

        }

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


        /* ================================================
           IMPORTANT:
           VIRTUAL PREVIEW BUTTON KO TOUCH NAHI KARNA
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