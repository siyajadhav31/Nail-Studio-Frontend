/* =========================================================
   💅 NAIL STUDIO - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   BACKEND API
========================================================= */

const API_URL =
    "https://nail-studio-backend-k604.onrender.com/api/bookings";


/* =========================================================
   💅 VIRTUAL NAIL SHAPES
========================================================= */

const VIRTUAL_SHAPES = [

    "Almond",
    "Square",
    "Coffin",
    "Oval",
    "Stiletto",
    "Squoval",
    "Ballerina",
    "Lipstick",
    "Flare",
    "Edge",
    "Round",
    "Mountain",
    "C-Curve",
    "Trapeze",
    "Pipe",
    "Arrowhead"

];


/* =========================================================
   💅 VIRTUAL NAIL SHADES
========================================================= */

const VIRTUAL_SHADES = [

    {
        name: "Classic Nude",
        color: "#d8b08c"
    },

    {
        name: "Milky White",
        color: "#f8f5ed"
    },

    {
        name: "Soft Pink",
        color: "#f4c7c3"
    },

    {
        name: "Baby Pink",
        color: "#f7b7c2"
    },

    {
        name: "Blush",
        color: "#e8a6a6"
    },

    {
        name: "Rose Pink",
        color: "#d96c8a"
    },

    {
        name: "Hot Pink",
        color: "#ec3f91"
    },

    {
        name: "Coral",
        color: "#ff8066"
    },

    {
        name: "Peach",
        color: "#ffc19f"
    },

    {
        name: "Cherry Red",
        color: "#c21832"
    },

    {
        name: "Classic Red",
        color: "#d62828"
    },

    {
        name: "Burgundy",
        color: "#800020"
    },

    {
        name: "Wine",
        color: "#722f37"
    },

    {
        name: "Maroon",
        color: "#6d071a"
    },

    {
        name: "Chocolate",
        color: "#5c3317"
    },

    {
        name: "Caramel",
        color: "#c68b59"
    },

    {
        name: "Mocha",
        color: "#967969"
    },

    {
        name: "Black",
        color: "#171717"
    },

    {
        name: "Royal Blue",
        color: "#4169e1"
    },

    {
        name: "Sky Blue",
        color: "#87ceeb"
    },

    {
        name: "Navy",
        color: "#172554"
    },

    {
        name: "Lavender",
        color: "#b9a0dc"
    },

    {
        name: "Purple",
        color: "#800080"
    },

    {
        name: "Plum",
        color: "#8e4585"
    },

    {
        name: "Mint",
        color: "#98d8c8"
    },

    {
        name: "Emerald",
        color: "#008c6e"
    },

    {
        name: "Olive",
        color: "#808000"
    },

    {
        name: "Grey",
        color: "#808080"
    },

    {
        name: "Silver",
        color: "#c0c0c0"
    },

    {
        name: "Gold",
        color: "#d4af37"
    },

    {
        name: "Rose Gold",
        color: "#b76e79"
    },

    {
        name: "Champagne",
        color: "#f7e7ce"
    }

];


/* =========================================================
   💅 VIRTUAL SHAPE DESCRIPTIONS
========================================================= */

const SHAPE_DESCRIPTIONS = {

    "Almond": {

        title: "Almond Shape",

        description:
            "Elegant and feminine with softly tapered sides. Perfect for a classy and timeless look."

    },


    "Square": {

        title: "Square Shape",

        description:
            "Clean, straight edges with a modern finish. Perfect for a bold and neat look."

    },


    "Coffin": {

        title: "Coffin Shape",

        description:
            "Long with tapered sides and a flat tip. A stylish and glamorous choice."

    },


    "Oval": {

        title: "Oval Shape",

        description:
            "Soft and rounded with a natural appearance. Perfect for an elegant everyday look."

    },


    "Stiletto": {

        title: "Stiletto Shape",

        description:
            "Sharp and dramatic with a pointed tip. Perfect for a bold statement look."

    },


    "Squoval": {

        title: "Squoval Shape",

        description:
            "A beautiful combination of square and oval. Soft corners with a clean finish."

    },


    "Ballerina": {

        title: "Ballerina Shape",

        description:
            "Long and tapered with a flat tip. Inspired by classic ballerina nails."

    },


    "Lipstick": {

        title: "Lipstick Shape",

        description:
            "A unique angled tip inspired by the shape of a lipstick. Perfect for a creative look."

    },


    "Flare": {

        title: "Flare Shape",

        description:
            "Nails that widen towards the tip for a fun and fashionable statement."

    },


    "Edge": {

        title: "Edge Shape",

        description:
            "A sharp geometric style with an edgy pointed finish. Perfect for a unique look."

    },


    "Round": {

        title: "Round Shape",

        description:
            "A soft rounded shape that follows the natural curve of the fingertip."

    },


    "Mountain": {

        title: "Mountain Shape",

        description:
            "A dramatic pointed style with a strong centre peak for a statement look."

    },


    "C-Curve": {

        title: "C-Curve Shape",

        description:
            "A beautifully curved nail shape with an elegant rounded structure."

    },


    "Trapeze": {

        title: "Trapeze Shape",

        description:
            "A unique geometric shape that creates a fashionable tapered silhouette."

    },


    "Pipe": {

        title: "Pipe Shape",

        description:
            "A long structured shape with a smooth curved finish for a sophisticated look."

    },


    "Arrowhead": {

        title: "Arrowhead Shape",

        description:
            "A sharp angular nail shape inspired by the pointed form of an arrowhead."

    }

};


/* =========================================================
   DOM READY
========================================================= */

function initializeWebsite() {

    console.log("=================================");
    console.log("💅 NAIL STUDIO MAIN JS LOADED");
    console.log("=================================");
    console.log("Backend API:", API_URL);


    /* Mobile navbar */

    initializeMobileNavbar();


    /* Normal booking */

    const bookingForm =
        document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            handleBookingSubmit
        );

    }


    /* Virtual booking */

    const virtualBookingForm =
        document.getElementById("virtualBookingForm");

    if (virtualBookingForm) {

        virtualBookingForm.addEventListener(
            "submit",
            handleVirtualBookingSubmit
        );

    }


    /* Contact */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            handleContactSubmit
        );

    }


    /* Dates */

    setMinimumDate();

    initializeDateRestrictions();


    /* Service */

    loadSelectedService();


    /* Virtual preview */

    initializeVirtualPreview();


    /* Gallery */

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

            navLinks.classList.toggle(
                "active"
            );

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
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


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
   DATE RESTRICTIONS
   - Past dates disabled
   - Sunday closed
========================================================= */

function initializeDateRestrictions() {

    const dateInputs =
        document.querySelectorAll(
            'input[type="date"]'
        );


    dateInputs.forEach(
        function (input) {

            input.addEventListener(
                "change",
                function () {

                    if (!this.value) {

                        return;

                    }


                    const selectedDate =
                        new Date(
                            this.value +
                            "T00:00:00"
                        );


                    if (
                        selectedDate.getDay() === 0
                    ) {

                        this.value = "";


                        showMessage(
                            "Sunday is closed. Please select another date.",
                            "error"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   LOAD SELECTED SERVICE
========================================================= */

function loadSelectedService() {

    const serviceSelect =
        document.getElementById(
            "service"
        );


    if (!serviceSelect) {

        return;

    }


    const priceBox =
        document.getElementById(
            "priceBox"
        );


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
        urlParams.get(
            "service"
        );


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


    /* Sunday */

    if (
        isSunday(date)
    ) {

        showMessage(
            "Sunday is closed. Please select another date.",
            "error"
        );

        return;

    }


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
        ) ||
        "Virtual Nail Shape";


    const dateInput =
        form.querySelector(
            '[name="bookingDate"]'
        );


    const date =
        dateInput
            ? dateInput.value.trim()
            : "";


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


    const shape =
        virtualShapeInput &&
        virtualShapeInput.value
            ? virtualShapeInput.value
            : "Almond";


    /* =====================================================
       SHADE
    ===================================================== */

    const virtualShadeInput =
        document.getElementById(
            "virtualShade"
        );


    const shade =
        virtualShadeInput &&
        virtualShadeInput.value
            ? virtualShadeInput.value
            : "Classic Nude";


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


    if (isSunday(date)) {

        showMessage(
            "Sunday is closed. Please select another date.",
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
       VIRTUAL BOOKING DATA
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
            shade,

        notes:
            `Virtual Nail Shape Booking | Shape: ${shape} | Shade: ${shade}`

    };


    console.log(
        "================================="
    );

    console.log(
        "💅 SENDING VIRTUAL NAIL BOOKING"
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
        "Date:",
        bookingData.bookingDate
    );

    console.log(
        "Time:",
        bookingData.bookingTime
    );

    console.log(
        "Shape:",
        bookingData.shape
    );

    console.log(
        "Shade:",
        bookingData.shade
    );

    console.log(
        "Complete Data:",
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
            "✨ Your virtual nail appointment has been booked successfully!",
            "success"
        );


        form.reset();


        resetVirtualPreview();


        setTimeout(
            function () {

                closeVirtualPreview();

            },
            700
        );


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
   RESET VIRTUAL PREVIEW
========================================================= */

function resetVirtualPreview() {

    const defaultShape =
        "Almond";


    const defaultShade =
        "Classic Nude";


    /* Shape input */

    const virtualShape =
        document.getElementById(
            "virtualShape"
        );


    if (virtualShape) {

        virtualShape.value =
            defaultShape;

    }


    /* Shade input */

    const virtualShade =
        document.getElementById(
            "virtualShade"
        );


    if (virtualShade) {

        virtualShade.value =
            defaultShade;

    }


    /* Preview shape */

    const previewShape =
        document.getElementById(
            "previewShape"
        );


    if (previewShape) {

        previewShape.textContent =
            defaultShape;

    }


    /* Booking shape */

    const bookingShape =
        document.getElementById(
            "bookingShape"
        );


    if (bookingShape) {

        bookingShape.textContent =
            defaultShape;

    }


    /* Preview shade */

    const previewShade =
        document.getElementById(
            "previewShade"
        );


    if (previewShade) {

        previewShade.textContent =
            defaultShade;

    }


    /* Booking shade */

    const bookingShade =
        document.getElementById(
            "bookingShade"
        );


    if (bookingShade) {

        bookingShade.textContent =
            defaultShade;

    }


    /* Selected shape title */

    const selectedShapeTitle =
        document.getElementById(
            "selectedShapeTitle"
        );


    if (selectedShapeTitle) {

        selectedShapeTitle.textContent =
            "Almond Shape";

    }


    /* Selected shape description */

    const selectedShapeDescription =
        document.getElementById(
            "selectedShapeDescription"
        );


    if (selectedShapeDescription) {

        selectedShapeDescription.textContent =
            SHAPE_DESCRIPTIONS.Almond.description;

    }


    /* Nail stage */

    const nailStage =
        document.getElementById(
            "nailPreviewStage"
        );


    if (nailStage) {

        removeAllShapeClasses(
            nailStage
        );


        nailStage.classList.add(
            "shape-almond"
        );


        applyShadeToNails(
            defaultShade
        );

    }


    /* Shape buttons */

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
                    defaultShape
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );


    /* Shade buttons */

    document
        .querySelectorAll(
            ".shade-btn"
        )
        .forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );


                if (
                    button.dataset.shade ===
                    defaultShade
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );

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


    return emailPattern.test(
        email
    );

}


/* =========================================================
   SUNDAY CHECK
========================================================= */

function isSunday(dateString) {

    if (!dateString) {

        return false;

    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.getDay() === 0;

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
       PREVIEW BUTTONS
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
                previewModal.classList.contains(
                    "open"
                )
            ) {

                closeVirtualPreview();

            }

        }
    );


    /* =====================================================
       SHAPE BUTTONS
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

                    const shape =
                        button.dataset.shape;


                    if (!shape) {

                        return;

                    }


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


                    applySelectedShape(
                        shape
                    );


                    console.log(
                        "💅 Selected Shape:",
                        shape
                    );

                }
            );

        }
    );


    /* =====================================================
       SHADE BUTTONS
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

                    const shade =
                        button.dataset.shade;


                    if (!shade) {

                        return;

                    }


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


                    applySelectedShade(
                        shade
                    );


                    console.log(
                        "💅 Selected Shade:",
                        shade
                    );

                }
            );

        }
    );


    /* =====================================================
       DEFAULT SHAPE
    ===================================================== */

    let defaultShapeButton =
        document.querySelector(
            ".shape-option.active"
        );


    if (!defaultShapeButton) {

        defaultShapeButton =
            document.querySelector(
                '.shape-option[data-shape="Almond"]'
            );

    }


    if (
        defaultShapeButton
    ) {

        shapeButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        defaultShapeButton.classList.add(
            "active"
        );


        applySelectedShape(
            defaultShapeButton.dataset.shape ||
            "Almond"
        );

    }


    /* =====================================================
       DEFAULT SHADE
    ===================================================== */

    let defaultShadeButton =
        document.querySelector(
            ".shade-btn.active"
        );


    if (!defaultShadeButton) {

        defaultShadeButton =
            document.querySelector(
                '.shade-btn[data-shade="Classic Nude"]'
            );

    }


    if (
        defaultShadeButton
    ) {

        shadeButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        defaultShadeButton.classList.add(
            "active"
        );


        applySelectedShade(
            defaultShadeButton.dataset.shade ||
            "Classic Nude"
        );

    }


    console.log(
        "💅 Virtual Nail Studio initialized."
    );

}


/* =========================================================
   APPLY SELECTED SHAPE
========================================================= */

function applySelectedShape(shape) {

    const nailStage =
        document.getElementById(
            "nailPreviewStage"
        );


    if (nailStage) {

        removeAllShapeClasses(
            nailStage
        );


        const shapeClass =
            getShapeClass(
                shape
            );


        nailStage.classList.add(
            shapeClass
        );

    }


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


    const selectedShapeTitle =
        document.getElementById(
            "selectedShapeTitle"
        );


    const selectedShapeDescription =
        document.getElementById(
            "selectedShapeDescription"
        );


    const info =
        SHAPE_DESCRIPTIONS[
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

}


/* =========================================================
   APPLY SELECTED SHADE
========================================================= */

function applySelectedShade(shade) {

    const virtualShade =
        document.getElementById(
            "virtualShade"
        );


    if (virtualShade) {

        virtualShade.value =
            shade;

    }


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


    applyShadeToNails(
        shade
    );

}


/* =========================================================
   APPLY SHADE TO NAILS
========================================================= */

function applyShadeToNails(shade) {

    const shadeObject =
        VIRTUAL_SHADES.find(
            function (item) {

                return item.name === shade;

            }
        );


    if (!shadeObject) {

        return;

    }


    const nailElements =
        document.querySelectorAll(
            ".virtual-nail"
        );


    nailElements.forEach(
        function (nail) {

            nail.style.background =
                shadeObject.color;


            nail.style.backgroundImage =
                "none";


            nail.style.setProperty(
                "--nail-shade",
                shadeObject.color
            );

        }
    );


    const nailStage =
        document.getElementById(
            "nailPreviewStage"
        );


    if (nailStage) {

        nailStage.style.setProperty(
            "--nail-shade",
            shadeObject.color
        );

    }

}


/* =========================================================
   GET SHAPE CSS CLASS
========================================================= */

function getShapeClass(shape) {

    return (
        "shape-" +
        String(shape)
            .toLowerCase()
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-|-$/g,
                ""
            )
    );

}


/* =========================================================
   REMOVE ALL SHAPE CLASSES
========================================================= */

function removeAllShapeClasses(
    element
) {

    if (!element) {

        return;

    }


    VIRTUAL_SHAPES.forEach(
        function (shape) {

            element.classList.remove(
                getShapeClass(
                    shape
                )
            );

        }
    );

}


/* =========================================================
   UPDATE VIRTUAL PREVIEW
========================================================= */

function updateVirtualPreview() {

    const activeShape =
        document.querySelector(
            ".shape-option.active"
        );


    const activeShade =
        document.querySelector(
            ".shade-btn.active"
        );


    if (activeShape) {

        applySelectedShape(
            activeShape.dataset.shape ||
            "Almond"
        );

    }


    if (activeShade) {

        applySelectedShade(
            activeShade.dataset.shade ||
            "Classic Nude"
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