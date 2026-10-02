// ==========================================
// DOM CONTENT LOADED
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // API URL
    // ==========================================

    const API_URL =
        "https://nail-studio-backend-k604.onrender.com/api/bookings";


    // ==========================================
    // VIRTUAL PREVIEW ELEMENTS
    // ==========================================

    const previewModal =
        document.getElementById("previewModal");

    const previewClose =
        document.getElementById("previewClose");

    const openPreviewBtn =
        document.getElementById("openPreview");

    const virtualBookingForm =
        document.getElementById("virtualBookingForm");


    // ==========================================
    // VIRTUAL PREVIEW STATE
    // ==========================================

    let selectedService = "Classic Manicure";
    let selectedShape = "Round";
    let selectedDesign = "Minimal";
    let selectedShade = "Nude";
    let selectedColor = "#e8cfc4";


    // ==========================================
    // OPEN PREVIEW MODAL
    // ==========================================

    if (openPreviewBtn && previewModal) {

        openPreviewBtn.addEventListener(
            "click",
            function () {

                previewModal.style.display = "flex";

            }
        );

    }


    // ==========================================
    // CLOSE PREVIEW MODAL
    // ==========================================

    if (previewClose && previewModal) {

        previewClose.addEventListener(
            "click",
            function () {

                previewModal.style.display = "none";

            }
        );

    }


    // ==========================================
    // CLOSE MODAL WHEN CLICKING OUTSIDE
    // ==========================================

    if (previewModal) {

        previewModal.addEventListener(
            "click",
            function (event) {

                if (event.target === previewModal) {

                    previewModal.style.display = "none";

                }

            }
        );

    }


    // ==========================================
    // ESCAPE KEY CLOSE
    // ==========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                previewModal
            ) {

                previewModal.style.display = "none";

            }

        }
    );


    // ==========================================
    // PREVIEW UPDATE FUNCTION
    // ==========================================

    function updatePreview() {

        const serviceText =
            document.getElementById("previewService");

        const shapeText =
            document.getElementById("previewShape");

        const designText =
            document.getElementById("previewDesign");

        const shadeText =
            document.getElementById("previewShade");

        const nailPreview =
            document.getElementById("nailPreview");


        if (serviceText) {
            serviceText.textContent =
                selectedService;
        }


        if (shapeText) {
            shapeText.textContent =
                selectedShape;
        }


        if (designText) {
            designText.textContent =
                selectedDesign;
        }


        if (shadeText) {
            shadeText.textContent =
                selectedShade;
        }


        // Change nail preview colour
        if (nailPreview) {

            nailPreview.style.background =
                selectedColor;

        }

    }


    // ==========================================
    // SERVICE OPTIONS
    // ==========================================

    const serviceOptions =
        document.querySelectorAll(
            ".service-option"
        );

    serviceOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    serviceOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );

                    option.classList.add(
                        "selected"
                    );


                    selectedService =
                        option.dataset.service ||
                        option.textContent.trim();


                    updatePreview();

                }
            );

        }
    );


    // ==========================================
    // SHAPE OPTIONS
    // ==========================================

    const shapeOptions =
        document.querySelectorAll(
            ".shape-option"
        );

    shapeOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    shapeOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );

                    option.classList.add(
                        "selected"
                    );


                    selectedShape =
                        option.dataset.shape ||
                        option.textContent.trim();


                    updatePreview();

                }
            );

        }
    );


    // ==========================================
    // DESIGN OPTIONS
    // ==========================================

    const designOptions =
        document.querySelectorAll(
            ".design-option"
        );

    designOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    designOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );

                    option.classList.add(
                        "selected"
                    );


                    selectedDesign =
                        option.dataset.design ||
                        option.textContent.trim();


                    updatePreview();

                }
            );

        }
    );


    // ==========================================
    // SHADE OPTIONS
    // ==========================================

    const shadeOptions =
        document.querySelectorAll(
            ".shade-option"
        );

    shadeOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    shadeOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );

                    option.classList.add(
                        "selected"
                    );


                    selectedShade =
                        option.dataset.shade ||
                        option.textContent.trim();


                    selectedColor =
                        option.dataset.color ||
                        selectedColor;


                    updatePreview();

                }
            );

        }
    );


    // ==========================================
    // DEFAULT PREVIEW
    // ==========================================

    updatePreview();


    // ==========================================
    // VIRTUAL BOOKING
    // ==========================================

    if (virtualBookingForm) {

        virtualBookingForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // ------------------------------------------
                // GET FORM VALUES
                // ------------------------------------------

                const nameInput =
                    document.getElementById("virtualName");

                const emailInput =
                    document.getElementById("virtualEmail");

                const phoneInput =
                    document.getElementById("virtualPhone");

                const dateInput =
                    document.getElementById("virtualDate");

                const timeInput =
                    document.getElementById("virtualTime");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const bookingDate =
                    dateInput
                        ? dateInput.value
                        : "";

                const bookingTime =
                    timeInput
                        ? timeInput.value
                        : "";


                // ------------------------------------------
                // VALIDATION
                // ------------------------------------------

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !bookingDate ||
                    !bookingTime
                ) {

                    alert(
                        "Please fill all required fields."
                    );

                    return;

                }


                // FIXED EMAIL REGEX
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                // ------------------------------------------
                // BOOKING DATA
                // ------------------------------------------

                const bookingData = {

                    name: name,

                    email: email,

                    phone: phone,

                    service:
                        selectedService,

                    design:
                        selectedDesign,

                    bookingDate:
                        bookingDate,

                    bookingTime:
                        bookingTime,

                    bookingType:
                        "VIRTUAL"

                };


                // ------------------------------------------
                // SUBMIT TO BACKEND
                // ------------------------------------------

                const submitButton =
                    virtualBookingForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Booking...";

                }


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


                    // ------------------------------------------
                    // RESPONSE CHECK
                    // ------------------------------------------

                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        console.error(
                            "Virtual booking error:",
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


                    alert(
                        "Virtual booking submitted successfully!"
                    );


                    // ------------------------------------------
                    // RESET FORM
                    // ------------------------------------------

                    virtualBookingForm.reset();


                    // ------------------------------------------
                    // CLOSE MODAL
                    // ------------------------------------------

                    if (previewModal) {

                        previewModal.style.display =
                            "none";

                    }


                } catch (error) {

                    console.error(
                        "Virtual booking error:",
                        error
                    );


                    alert(
                        "Unable to submit booking. Please try again."
                    );


                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Book Virtual Appointment";

                    }

                }

            }
        );

    }


    // ==========================================
    // NORMAL BOOKING FORM
    // ==========================================

    const bookingForm =
        document.getElementById("bookingForm");


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // ------------------------------------------
                // GET VALUES
                // ------------------------------------------

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const phoneInput =
                    document.getElementById("phone");

                const serviceInput =
                    document.getElementById("service");

                const designInput =
                    document.getElementById("design");

                const dateInput =
                    document.getElementById("bookingDate");

                const timeInput =
                    document.getElementById("bookingTime");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const service =
                    serviceInput
                        ? serviceInput.value.trim()
                        : "";

                const design =
                    designInput
                        ? designInput.value.trim()
                        : "";

                const date =
                    dateInput
                        ? dateInput.value
                        : "";

                const time =
                    timeInput
                        ? timeInput.value
                        : "";


                // ------------------------------------------
                // VALIDATION
                // ------------------------------------------

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !date ||
                    !time
                ) {

                    alert(
                        "Please fill all required fields."
                    );

                    return;

                }


                // FIXED EMAIL REGEX
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;

                }


                // ------------------------------------------
                // BOOKING DATA
                // ------------------------------------------

                const bookingData = {

                    name: name,

                    email: email,

                    phone: phone,

                    service:
                        service ||
                        "Appointment",

                    design:
                        design ||
                        "Not Selected",

                    bookingDate:
                        date,

                    bookingTime:
                        time,

                    bookingType:
                        "SERVICE"

                };


                console.log(
                    "Sending booking:",
                    bookingData
                );


                // ------------------------------------------
                // SUBMIT BUTTON
                // ------------------------------------------

                const submitButton =
                    bookingForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Booking...";

                }


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


                    // ------------------------------------------
                    // RESPONSE CHECK
                    // ------------------------------------------

                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        console.error(
                            "Booking error:",
                            errorText
                        );

                        throw new Error(
                            "Booking failed"
                        );

                    }


                    const savedBooking =
                        await response.json();


                    console.log(
                        "Booking saved:",
                        savedBooking
                    );


                    alert(
                        "Booking submitted successfully!"
                    );


                    // ------------------------------------------
                    // RESET FORM
                    // ------------------------------------------

                    bookingForm.reset();


                } catch (error) {

                    console.error(
                        "Booking error:",
                        error
                    );


                    alert(
                        "Unable to submit booking. Please try again."
                    );


                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Book Appointment";

                    }

                }

            }
        );

    }


    // ==========================================
    // SERVICE SELECTION → BOOKING PAGE
    // ==========================================

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );


    serviceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const service =
                        button.dataset.service;


                    if (service) {

                        localStorage.setItem(
                            "selectedService",
                            service
                        );

                    }

                }
            );

        }
    );


    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                alert(
                    "Thank you! Your message has been submitted."
                );


                contactForm.reset();

            }
        );

    }


    // ==========================================
    // GALLERY
    // ==========================================

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    console.log(
                        "Gallery item clicked"
                    );

                }
            );

        }
    );


});