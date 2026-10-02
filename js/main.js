


// ==========================================
// DOM CONTENT LOADED
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // API URL
    // ==========================================

    const API_URL =
        "http://127.0.0.1:8080/api/bookings";


    // ==========================================
    // VIRTUAL PREVIEW ELEMENTS
    // ==========================================

    const previewModal =
        document.getElementById("previewModal");

    const closeModal =
        document.getElementById("closeModal");

    const previewButtons =
        document.querySelectorAll(
            "#previewBtn, #virtualPreviewBtn, .virtual-preview-btn"
        );


    // ==========================================
    // OPEN VIRTUAL PREVIEW
    // ==========================================

    previewButtons.forEach(function (button) {

        button.addEventListener("click", function (e) {

            e.preventDefault();

            if (previewModal) {

                previewModal.style.display = "flex";

                document.body.style.overflow = "hidden";

            }

        });

    });


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    if (closeModal) {

        closeModal.addEventListener("click", function () {

            if (previewModal) {

                previewModal.style.display = "none";

                document.body.style.overflow = "";

            }

        });

    }


    // ==========================================
    // OUTSIDE CLICK
    // ==========================================

    if (previewModal) {

        previewModal.addEventListener("click", function (e) {

            if (e.target === previewModal) {

                previewModal.style.display = "none";

                document.body.style.overflow = "";

            }

        });

    }


    // ==========================================
    // ESCAPE KEY
    // ==========================================

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            if (
                previewModal &&
                previewModal.style.display === "flex"
            ) {

                previewModal.style.display = "none";

                document.body.style.overflow = "";

            }

        }

    });


    // ==========================================
    // VIRTUAL BOOKING VARIABLES
    // ==========================================

    let selectedService = "Gel Nails";

    let selectedShape = "Almond";

    let selectedDesign = "Classic Nude";

    let selectedShade = "Royal Gold";

    let selectedColor = "#c89b3c";


    // ==========================================
    // PREVIEW ELEMENTS
    // ==========================================

    const nailPreviewStage =
        document.getElementById(
            "nailPreviewStage"
        );

    const previewService =
        document.getElementById(
            "previewService"
        );

    const previewShape =
        document.getElementById(
            "previewShape"
        );

    const previewDesign =
        document.getElementById(
            "previewDesign"
        );

    const previewShade =
        document.getElementById(
            "previewShade"
        );

    const selectedShadeName =
        document.getElementById(
            "selectedShadeName"
        );

    const virtualNails =
        document.querySelectorAll(
            ".nail-preview-stage .virtual-nail"
        );


    // ==========================================
    // VIRTUAL BOOKING ELEMENTS
    // ==========================================

    const virtualBookingForm =
        document.getElementById(
            "virtualBookingForm"
        );

    const virtualName =
        document.getElementById(
            "virtualName"
        );

    const virtualEmail =
        document.getElementById(
            "virtualEmail"
        );

    const virtualPhone =
        document.getElementById(
            "virtualPhone"
        );

    const virtualBookingDate =
        document.getElementById(
            "virtualBookingDate"
        );

    const virtualBookingTime =
        document.getElementById(
            "time"
        );

    const virtualService =
        document.getElementById(
            "virtualService"
        );

    const bookingService =
        document.getElementById(
            "bookingService"
        );

    const bookingDesign =
        document.getElementById(
            "bookingDesign"
        );

    const bookingShade =
        document.getElementById(
            "bookingShade"
        );


    // ==========================================
    // MAKE CLASS NAME
    // ==========================================

    function makeClassName(value) {

        return value
            .toLowerCase()
            .replace(/\s+/g, "-");

    }


    // ==========================================
    // UPDATE NAIL COLOR
    // ==========================================

    function updateNailColor() {

        virtualNails.forEach(function (nail) {

            nail.style.background =
                selectedColor;

        });

    }


    // ==========================================
    // CREATE VISUAL DESIGN
    // ==========================================

    function createDesignVisual(nail) {

        const designLayer =
            nail.querySelector(".nail-design");

        if (!designLayer) {

            return;

        }

        // Clear previous design

        designLayer.innerHTML = "";

        designLayer.className =
            "nail-design";


        // ==========================================
        // CLASSIC NUDE
        // ==========================================

        if (selectedDesign === "Classic Nude") {

            const shine =
                document.createElement("span");

            shine.className =
                "design-shine";

            designLayer.appendChild(
                shine
            );

        }


        // ==========================================
        // FRENCH TIPS
        // ==========================================

        else if (selectedDesign === "French Tips") {

            const tip =
                document.createElement("span");

            tip.className =
                "french-tip";

            designLayer.appendChild(
                tip
            );

        }


        // ==========================================
        // CHROME
        // ==========================================

        else if (selectedDesign === "Chrome") {

            const shine =
                document.createElement("span");

            shine.className =
                "chrome-shine";

            designLayer.appendChild(
                shine
            );

        }


        // ==========================================
        // CAT EYE
        // ==========================================

        else if (selectedDesign === "Cat Eye") {

            const eye =
                document.createElement("span");

            eye.className =
                "cat-eye-line";

            designLayer.appendChild(
                eye
            );

        }


        // ==========================================
        // GLITTER
        // ==========================================

        else if (selectedDesign === "Glitter") {

            const glitterSymbols =
                ["✦", "✧", "•", "✦", "✧"];

            glitterSymbols.forEach(
                function (symbol, index) {

                    const glitter =
                        document.createElement("span");

                    glitter.className =
                        "glitter-particle glitter-" +
                        index;

                    glitter.textContent =
                        symbol;

                    designLayer.appendChild(
                        glitter
                    );

                }
            );

        }


        // ==========================================
        // FLORAL
        // ==========================================

        else if (selectedDesign === "Floral") {

            const flower =
                document.createElement("span");

            flower.className =
                "floral-design";

            flower.textContent =
                "🌸";

            designLayer.appendChild(
                flower
            );

        }

    }


    // ==========================================
    // UPDATE SHAPE
    // ==========================================

    function updateShape() {

        if (!nailPreviewStage) {

            return;

        }

        nailPreviewStage.classList.remove(
            "shape-almond",
            "shape-square",
            "shape-coffin",
            "shape-oval",
            "shape-stiletto"
        );

        const shapeClass =
            "shape-" +
            makeClassName(selectedShape);

        nailPreviewStage.classList.add(
            shapeClass
        );

        if (previewShape) {

            previewShape.textContent =
                selectedShape;

        }

    }


    // ==========================================
    // UPDATE DESIGN
    // ==========================================

    function updateDesign() {

        if (!nailPreviewStage) {

            return;

        }

        nailPreviewStage.classList.remove(
            "design-classic-nude",
            "design-french-tips",
            "design-chrome",
            "design-cat-eye",
            "design-glitter",
            "design-floral"
        );

        const designClass =
            "design-" +
            makeClassName(selectedDesign);

        nailPreviewStage.classList.add(
            designClass
        );


        virtualNails.forEach(
            function (nail) {

                createDesignVisual(nail);

            }
        );


        if (previewDesign) {

            previewDesign.textContent =
                selectedDesign;

        }

        updateNailColor();

    }


    // ==========================================
    // UPDATE SERVICE
    // ==========================================

    function updateService() {

        if (previewService) {

            previewService.textContent =
                selectedService;

        }

        if (virtualService) {

            virtualService.value =
                selectedService;

        }

        if (bookingService) {

            bookingService.textContent =
                selectedService;

        }

    }


    // ==========================================
    // UPDATE SHADE
    // ==========================================

    function updateShade() {

        if (selectedShadeName) {

            selectedShadeName.textContent =
                selectedShade;

        }

        if (previewShade) {

            previewShade.textContent =
                selectedShade;

        }

        if (bookingShade) {

            bookingShade.textContent =
                selectedShade;

        }

        updateNailColor();

    }


    // ==========================================
    // UPDATE BOOKING DESIGN
    // ==========================================

    function updateBookingDesign() {

        if (bookingDesign) {

            bookingDesign.textContent =
                selectedDesign;

        }

    }


    // ==========================================
    // SERVICE OPTIONS
    // ==========================================

    const serviceOptions =
        document.querySelectorAll(
            ".service-option"
        );

    serviceOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                serviceOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                selectedService =
                    button.getAttribute(
                        "data-service"
                    );

                updateService();

            }
        );

    });


    // ==========================================
    // SHAPE OPTIONS
    // ==========================================

    const shapeOptions =
        document.querySelectorAll(
            ".shape-option"
        );

    shapeOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                shapeOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                selectedShape =
                    button.getAttribute(
                        "data-shape"
                    );

                updateShape();

            }
        );

    });


    // ==========================================
    // DESIGN OPTIONS
    // ==========================================

    const designOptions =
        document.querySelectorAll(
            ".design-option"
        );

    designOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                designOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                selectedDesign =
                    button.getAttribute(
                        "data-design"
                    );

                updateDesign();

                updateBookingDesign();

            }
        );

    });


    // ==========================================
    // SHADE OPTIONS
    // ==========================================

    const shadeButtons =
        document.querySelectorAll(
            ".shade-btn"
        );

    shadeButtons.forEach(function (button) {

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

                selectedShade =
                    button.getAttribute(
                        "data-shade"
                    );

                selectedColor =
                    button.getAttribute(
                        "data-color"
                    );

                updateShade();

            }
        );

    });


    // ==========================================
    // DEFAULT PREVIEW
    // ==========================================

    if (nailPreviewStage) {

        nailPreviewStage.classList.add(
            "shape-almond"
        );

    }

    updateService();

    updateShape();

    updateDesign();

    updateShade();

    updateBookingDesign();


    // ==========================================
    // VIRTUAL BOOKING
    // ==========================================

    if (virtualBookingForm) {

        virtualBookingForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();

                e.stopPropagation();


                const name =
                    virtualName
                        ? virtualName.value.trim()
                        : "";


                const email =
                    virtualEmail
                        ? virtualEmail.value.trim()
                        : "";


                const phone =
                    virtualPhone
                        ? virtualPhone.value.trim()
                        : "";


                const bookingDate =
                    virtualBookingDate
                        ? virtualBookingDate.value
                        : "";


                const bookingTime =
                    virtualBookingTime
                        ? virtualBookingTime.value
                        : "";


                // ==================================
                // VALIDATION
                // ==================================

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !bookingDate ||
                    !bookingTime
                ) {

                    alert(
                        "Please fill all booking details."
                    );

                    return;

                }


                // ==================================
                // EMAIL VALIDATION
                // ==================================

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(email)
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                // ==================================
                // PHONE VALIDATION
                // ==================================

                const phonePattern =
                    /^[0-9]{10}$/;

                if (
                    !phonePattern.test(phone)
                ) {

                    alert(
                        "Please enter a valid 10-digit phone number."
                    );

                    return;

                }


                // ==================================
                // DATE VALIDATION
                // ==================================

                const today =
                    new Date()
                        .toISOString()
                        .split("T")[0];

                if (bookingDate < today) {

                    alert(
                        "Please select today or a future date."
                    );

                    return;

                }


                // ==================================
                // VIRTUAL BOOKING DATA
                // ==================================

                const bookingData = {

                    name: name,

                    email: email,

                    phone: phone,

                    service: selectedService,

                    bookingDate: bookingDate,

                    bookingTime: bookingTime,

                    bookingType: "VIRTUAL"

                };


                console.log(
                    "Virtual Booking Data:",
                    bookingData
                );


                const bookButton =
                    document.getElementById(
                        "bookVirtualLook"
                    );


                if (bookButton) {

                    bookButton.disabled = true;

                    bookButton.textContent =
                        "Booking...";

                }


                // ==================================
                // SEND TO BACKEND
                // ==================================

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


                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        console.error(
                            "Server Error:",
                            errorText
                        );

                        throw new Error(
                            "Booking failed"
                        );

                    }


                    const savedBooking =
                        await response.json();


                    console.log(
                        "Virtual booking saved:",
                        savedBooking
                    );


                    // ==================================
                    // SAVE PREVIEW INFORMATION
                    // ==================================

                    const virtualBooking = {

                        service:
                            selectedService,

                        shape:
                            selectedShape,

                        design:
                            selectedDesign,

                        shade:
                            selectedShade,

                        color:
                            selectedColor

                    };


                    localStorage.setItem(
                        "virtualBooking",
                        JSON.stringify(
                            virtualBooking
                        )
                    );


                    alert(
                        "✨ Appointment Booked Successfully!"
                    );


                    // ==================================
                    // RESET FORM
                    // ==================================

                    if (virtualName) {

                        virtualName.value = "";

                    }

                    if (virtualEmail) {

                        virtualEmail.value = "";

                    }

                    if (virtualPhone) {

                        virtualPhone.value = "";

                    }

                    if (virtualBookingDate) {

                        virtualBookingDate.value = "";

                    }

                    if (virtualBookingTime) {

                        virtualBookingTime.value = "";

                    }


                    updateService();

                    updateShape();

                    updateDesign();

                    updateShade();

                }

                catch (error) {

                    console.error(
                        "Virtual Booking Error:",
                        error
                    );

                    alert(
                        "Unable to book appointment. Please make sure Spring Boot is running."
                    );

                }


                if (bookButton) {

                    bookButton.disabled = false;

                    bookButton.textContent =
                        "💅 Book This Look";

                }

            }
        );

    }


    // ==========================================
    // NORMAL BOOKING PAGE
    // ==========================================

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );


    if (bookingForm) {

        // ==========================================
        // NORMAL BOOKING SUBMIT
        // ==========================================

        bookingForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();

                e.stopPropagation();


                // ==========================================
                // GET FORM VALUES
                // ==========================================

                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();


                const service =
                    document.getElementById(
                        "service"
                    ).value;


                // IMPORTANT:
                // Correct ID from booking.html

                const date =
                    document.getElementById(
                        "bookingDate"
                    ).value;


                // IMPORTANT:
                // Correct ID from booking.html

                const time =
                    document.getElementById(
                        "bookingTime"
                    ).value;


                const design =
                    document.getElementById(
                        "design"
                    ).value;


                const message =
                    document.getElementById(
                        "bookingMessage"
                    );


                // ==========================================
                // REQUIRED FIELD VALIDATION
                // ==========================================

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !date ||
                    !time
                ) {

                    if (message) {

                        message.className =
                            "booking-message error";

                        message.innerHTML =
                            "<strong>Missing Information</strong><br>" +
                            "Please fill all required fields.";

                    }

                    return;

                }


                // ==========================================
                // EMAIL VALIDATION
                // ==========================================

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    if (message) {

                        message.className =
                            "booking-message error";

                        message.innerHTML =
                            "<strong>Invalid Email</strong><br>" +
                            "Please enter a valid email address.";

                    }

                    return;

                }


                // ==========================================
                // PHONE VALIDATION
                // ==========================================

                const phonePattern =
                    /^[0-9]{10}$/;


                if (
                    !phonePattern.test(phone)
                ) {

                    if (message) {

                        message.className =
                            "booking-message error";

                        message.innerHTML =
                            "<strong>Invalid Phone Number</strong><br>" +
                            "Please enter a valid 10-digit phone number.";

                    }

                    return;

                }


                // ==========================================
                // DATE VALIDATION
                // ==========================================

                const today =
                    new Date()
                        .toISOString()
                        .split("T")[0];


                if (date < today) {

                    if (message) {

                        message.className =
                            "booking-message error";

                        message.innerHTML =
                            "<strong>Invalid Date</strong><br>" +
                            "Please select today or a future date.";

                    }

                    return;

                }


                // ==========================================
                // SUNDAY VALIDATION
                // ==========================================

                const selectedDate =
                    new Date(
                        date + "T00:00:00"
                    );


                if (
                    selectedDate.getDay() === 0
                ) {

                    if (message) {

                        message.className =
                            "booking-message error";

                        message.innerHTML =
                            "<strong>Sunday Closed</strong><br>" +
                            "Please select another date.";

                    }

                    return;

                }


                // ==========================================
                // SHOW LOADING MESSAGE
                // ==========================================

                if (message) {

                    message.className =
                        "booking-message loading";

                    message.innerHTML =
                        "Booking your appointment...";

                }


                // ==========================================
                // NORMAL BOOKING DATA
                // ==========================================

                const bookingData = {

                    name: name,

                    email: email,

                    phone: phone,

                    service: service || "Appointment",

                    design: design || "Not Selected",

                    bookingDate: date,

                    bookingTime: time,

                    bookingType: "SERVICE"

                };


                console.log(
                    "Normal Booking Data:",
                    bookingData
                );


                // ==========================================
                // SEND BOOKING TO SPRING BOOT
                // ==========================================

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


                    // ==========================================
                    // SERVER ERROR
                    // ==========================================

                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        console.error(
                            "Server Error:",
                            errorText
                        );

                        throw new Error(
                            "Booking failed"
                        );

                    }


                    // ==========================================
                    // GET SAVED BOOKING
                    // ==========================================

                    const savedBooking =
                        await response.json();


                    console.log(
                        "Normal booking saved:",
                        savedBooking
                    );


                    // ==========================================
                    // SUCCESS MESSAGE
                    // ==========================================

                    if (message) {

                        message.className =
                            "booking-message success";

                        message.innerHTML = `
                            <div class="success-icon">
                                ✓
                            </div>

                            <strong>
                                Appointment Booked Successfully!
                            </strong>

                            <span>
                                Thank you, ${name}.<br>
                                Your appointment is booked for
                                ${date} at ${time}.
                            </span>
                        `;

                    }


                    // ==========================================
                    // RESET FORM
                    // ==========================================

                    bookingForm.reset();

                }


                catch (error) {

                    console.error(
                        "Booking Error:",
                        error
                    );


                    if (message) {

                        message.className =
                            "booking-message error";

                        message.innerHTML = `
                            <strong>
                                Booking Failed
                            </strong>

                            <span>
                                Unable to connect to the server.
                                Please make sure Spring Boot is running.
                            </span>
                        `;

                    }

                }

            }
        );

    }


    // ==========================================
    // SERVICES PAGE BOOK BUTTONS
    // ==========================================

    document.querySelectorAll(
        ".card .gold-btn, .service-menu-book"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedServiceName =
                    button.getAttribute(
                        "data-service"
                    );


                if (selectedServiceName) {

                    localStorage.setItem(
                        "selectedService",
                        selectedServiceName
                    );

                }

            }
        );

    });


    // ==========================================
    // SELECTED SERVICE
    // ==========================================

    const selectedServiceFromStorage =
        localStorage.getItem(
            "selectedService"
        );


    const bookingServiceField =
        document.getElementById(
            "service"
        );


    if (
        selectedServiceFromStorage &&
        bookingServiceField
    ) {

        // If service is a SELECT
        if (
            bookingServiceField.tagName ===
            "SELECT"
        ) {

            const options =
                Array.from(
                    bookingServiceField.options
                );


            const matchingOption =
                options.find(
                    function (option) {

                        return option.value ===
                            selectedServiceFromStorage;

                    }
                );


            if (matchingOption) {

                bookingServiceField.value =
                    selectedServiceFromStorage;

            }

        }

        // If service is hidden input
        else {

            bookingServiceField.value =
                selectedServiceFromStorage;

        }

    }


    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                alert(
                    "Thank you! Your message has been sent successfully."
                );

                contactForm.reset();

            }
        );

    }


    // ==========================================
    // GALLERY
    // ==========================================

    document.querySelectorAll(
        ".gallery-card img"
    ).forEach(function (image) {

        image.addEventListener(
            "click",
            function () {

                console.log(
                    "Gallery image selected:",
                    image.alt
                );

            }

        );

    });


    // ==========================================
    // PAGE LOAD
    // ==========================================

    console.log(
        "Nail Studio JavaScript loaded successfully."
    );

});