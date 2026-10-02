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
    // ACTIVE NAVBAR LINK
    // ==========================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    const navLinks =
        document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {
            link.classList.add("active");
        }

    });


    // ==========================================
    // VIRTUAL PREVIEW ELEMENTS
    // ==========================================

    const previewModal =
        document.getElementById("previewModal");

    const previewClose =
        document.getElementById("closePreviewBtn");

    const openPreviewBtn =
        document.getElementById("openPreviewBtn");

    const openPreviewBtnBottom =
        document.getElementById("openPreviewBtnBottom");

    const virtualBookButton =
        document.getElementById("bookVirtualLook");


    // ==========================================
    // VIRTUAL PREVIEW STATE
    // ==========================================

    let selectedService = "Gel Nails";
    let selectedShape = "Almond";
    let selectedDesign = "Classic Nude";
    let selectedShade = "Royal Gold";


    // ==========================================
    // OPEN PREVIEW MODAL
    // ==========================================

    function openPreview() {

        if (previewModal) {

            previewModal.classList.add("show");

            document.body.style.overflow = "hidden";

        }

    }


    if (openPreviewBtn) {

        openPreviewBtn.addEventListener(
            "click",
            openPreview
        );

    }


    if (openPreviewBtnBottom) {

        openPreviewBtnBottom.addEventListener(
            "click",
            openPreview
        );

    }


    // ==========================================
    // CLOSE PREVIEW MODAL
    // ==========================================

    function closePreview() {

        if (previewModal) {

            previewModal.classList.remove("show");

            document.body.style.overflow = "";

        }

    }


    if (previewClose) {

        previewClose.addEventListener(
            "click",
            closePreview
        );

    }


    // ==========================================
    // CLOSE WHEN CLICKING OUTSIDE
    // ==========================================

    if (previewModal) {

        previewModal.addEventListener(
            "click",
            function (event) {

                if (event.target === previewModal) {

                    closePreview();

                }

            }
        );

    }


    // ==========================================
    // ESCAPE KEY
    // ==========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closePreview();

            }

        }
    );


    // ==========================================
    // UPDATE VIRTUAL BOOKING SUMMARY
    // ==========================================

    function updateVirtualSummary() {

        const summaryService =
            document.getElementById("summaryService");

        const summaryShape =
            document.getElementById("summaryShape");

        const summaryDesign =
            document.getElementById("summaryDesign");

        const summaryShade =
            document.getElementById("summaryShade");

        const virtualService =
            document.getElementById("virtualService");


        if (summaryService) {

            summaryService.textContent =
                selectedService;

        }


        if (summaryShape) {

            summaryShape.textContent =
                selectedShape;

        }


        if (summaryDesign) {

            summaryDesign.textContent =
                selectedDesign;

        }


        if (summaryShade) {

            summaryShade.textContent =
                selectedShade;

        }


        if (virtualService) {

            virtualService.value =
                selectedService;

        }

    }


    // ==========================================
    // SERVICE OPTIONS
    // ==========================================

    const serviceOptions =
        document.querySelectorAll(
            ".service-option"
        );


    serviceOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                serviceOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                option.classList.add("active");


                selectedService =
                    option.dataset.service ||
                    option.textContent.trim();


                updateVirtualSummary();

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


    shapeOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                shapeOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                option.classList.add("active");


                selectedShape =
                    option.dataset.shape ||
                    option.textContent.trim();


                updateVirtualSummary();

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


    designOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                designOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                option.classList.add("active");


                selectedDesign =
                    option.dataset.design ||
                    option.textContent.trim();


                updateVirtualSummary();

            }
        );

    });


    // ==========================================
    // SHADE OPTIONS
    // ==========================================

    const shadeOptions =
        document.querySelectorAll(
            ".shade-option"
        );


    shadeOptions.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                shadeOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                option.classList.add("active");


                selectedShade =
                    option.dataset.shade ||
                    option.textContent.trim();


                updateVirtualSummary();

            }
        );

    });


    // ==========================================
    // INITIAL VIRTUAL SUMMARY
    // ==========================================

    updateVirtualSummary();


    // ==========================================
    // VIRTUAL BOOKING
    // ==========================================

    if (virtualBookButton) {

        virtualBookButton.addEventListener(
            "click",
            async function () {


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


                // ------------------------------------------
                // EMAIL VALIDATION
                // ------------------------------------------

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

                    service: selectedService,

                    design: selectedDesign,

                    bookingDate: bookingDate,

                    bookingTime: bookingTime,

                    bookingType: "VIRTUAL"

                };


                console.log(
                    "Sending virtual booking:",
                    bookingData
                );


                // ------------------------------------------
                // BUTTON STATE
                // ------------------------------------------

                virtualBookButton.disabled = true;

                virtualBookButton.textContent =
                    "Booking...";


                // ------------------------------------------
                // SEND TO BACKEND
                // ------------------------------------------

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
                            "Virtual booking failed"
                        );

                    }


                    const savedBooking =
                        await response.json();


                    console.log(
                        "Virtual booking saved:",
                        savedBooking
                    );


                    // ------------------------------------------
                    // SUCCESS
                    // ------------------------------------------

                    alert(
                        "Virtual booking submitted successfully!"
                    );


                    // ------------------------------------------
                    // RESET FORM
                    // ------------------------------------------

                    if (nameInput) {
                        nameInput.value = "";
                    }

                    if (emailInput) {
                        emailInput.value = "";
                    }

                    if (phoneInput) {
                        phoneInput.value = "";
                    }

                    if (dateInput) {
                        dateInput.value = "";
                    }

                    if (timeInput) {
                        timeInput.value = "";
                    }


                    // ------------------------------------------
                    // CLOSE MODAL
                    // ------------------------------------------

                    closePreview();

                }


                catch (error) {

                    console.error(
                        "Virtual booking error:",
                        error
                    );


                    alert(
                        "Unable to submit booking. Please try again."
                    );

                }


                finally {

                    virtualBookButton.disabled = false;

                    virtualBookButton.textContent =
                        "Book This Look";

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


                // ------------------------------------------
                // EMAIL VALIDATION
                // ------------------------------------------

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


                // ------------------------------------------
                // SEND TO BACKEND
                // ------------------------------------------

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


                    // ------------------------------------------
                    // SUCCESS
                    // ------------------------------------------

                    alert(
                        "Booking submitted successfully!"
                    );


                    // ------------------------------------------
                    // RESET
                    // ------------------------------------------

                    bookingForm.reset();

                }


                catch (error) {

                    console.error(
                        "Booking error:",
                        error
                    );


                    alert(
                        "Unable to submit booking. Please try again."
                    );

                }


                finally {

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
    // LOAD SELECTED SERVICE ON BOOKING PAGE
    // ==========================================

    const bookingServiceInput =
        document.getElementById("service");


    if (bookingServiceInput) {

        const savedService =
            localStorage.getItem(
                "selectedService"
            );


        if (
            savedService &&
            !bookingServiceInput.value
        ) {

            bookingServiceInput.value =
                savedService;

        }

    }


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