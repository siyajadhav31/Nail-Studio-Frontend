// ==========================================
// NAIL MUSE - MAIN JAVASCRIPT
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

        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();

        // Remove active from every link first
        link.classList.remove("active");

        // Add active only to current page
        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    // ==========================================
    // VIRTUAL PREVIEW ELEMENTS
    // ==========================================

    const previewModal =
        document.getElementById("previewModal");

    const previewClose =
        document.getElementById("closeModal");

    const openPreviewBtn =
        document.getElementById("previewBtn");

    const openPreviewBtnBottom =
        document.getElementById("previewBtnBottom");

    const virtualBookButton =
        document.getElementById("bookVirtualLook");


    // ==========================================
    // VIRTUAL PREVIEW STATE
    // ==========================================

    let selectedService = "Gel Nails";
    let selectedShape = "Almond";
    let selectedDesign = "Classic Nude";
    let selectedShade = "Royal Gold";

    let selectedColor = "#d4af37";


    // ==========================================
    // OPEN PREVIEW MODAL
    // ==========================================

    function openPreview(event) {

        if (event) {
            event.preventDefault();
        }

        if (!previewModal) {
            console.error("previewModal not found!");
            return;
        }

        previewModal.classList.add("show");

        document.body.style.overflow = "hidden";

        updateVirtualPreview();

    }


    // HERO BUTTON
    if (openPreviewBtn) {

        openPreviewBtn.addEventListener(
            "click",
            openPreview
        );

    } else {

        console.warn(
            "previewBtn not found in HTML"
        );

    }


    // BOTTOM BUTTON
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

        if (!previewModal) return;

        previewModal.classList.remove("show");

        document.body.style.overflow = "";

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
    // VIRTUAL PREVIEW UPDATE
    // ==========================================

    function updateVirtualPreview() {

        // SERVICE
        const previewService =
            document.getElementById("previewService");

        if (previewService) {
            previewService.textContent =
                selectedService;
        }


        // SHAPE
        const previewShape =
            document.getElementById("previewShape");

        if (previewShape) {
            previewShape.textContent =
                selectedShape;
        }


        // DESIGN
        const previewDesign =
            document.getElementById("previewDesign");

        if (previewDesign) {
            previewDesign.textContent =
                selectedDesign;
        }


        // SHADE
        const previewShade =
            document.getElementById("previewShade");

        if (previewShade) {
            previewShade.textContent =
                selectedShade;
        }


        // SELECTED SHADE NAME
        const selectedShadeName =
            document.getElementById(
                "selectedShadeName"
            );

        if (selectedShadeName) {
            selectedShadeName.textContent =
                selectedShade;
        }


        // BOOKING SERVICE
        const bookingService =
            document.getElementById(
                "bookingService"
            );

        if (bookingService) {
            bookingService.textContent =
                selectedService;
        }


        // BOOKING DESIGN
        const bookingDesign =
            document.getElementById(
                "bookingDesign"
            );

        if (bookingDesign) {
            bookingDesign.textContent =
                selectedDesign;
        }


        // BOOKING SHADE
        const bookingShade =
            document.getElementById(
                "bookingShade"
            );

        if (bookingShade) {
            bookingShade.textContent =
                selectedShade;
        }


        // HIDDEN SERVICE INPUT
        const virtualService =
            document.getElementById(
                "virtualService"
            );

        if (virtualService) {
            virtualService.value =
                selectedService;
        }


        // APPLY SHADE TO NAILS
        const nails =
            document.querySelectorAll(
                ".virtual-nail"
            );

        nails.forEach(function (nail) {

            nail.style.backgroundColor =
                selectedColor;

        });

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

                updateVirtualPreview();

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

                updateNailShape();

                updateVirtualPreview();

            }
        );

    });


    // ==========================================
    // UPDATE NAIL SHAPE
    // ==========================================

    function updateNailShape() {

        const nailStage =
            document.getElementById(
                "nailPreviewStage"
            );

        if (!nailStage) return;

        nailStage.classList.remove(
            "shape-round",
            "shape-square",
            "shape-squoval",
            "shape-almond",
            "shape-coffin",
            "shape-stiletto",
            "shape-oval"
        );

        const shapeClass =
            selectedShape
                .toLowerCase()
                .replace(/\s+/g, "-");

        nailStage.classList.add(
            "shape-" + shapeClass
        );

    }


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

                updateNailDesign();

                updateVirtualPreview();

            }
        );

    });


    // ==========================================
    // UPDATE NAIL DESIGN
    // ==========================================

    function updateNailDesign() {

        const nailStage =
            document.getElementById(
                "nailPreviewStage"
            );

        if (!nailStage) return;

        nailStage.classList.remove(
            "design-classic-nude",
            "design-french",
            "design-glitter",
            "design-floral",
            "design-ombre",
            "design-chrome",
            "design-marble",
            "design-minimal"
        );

        const designClass =
            selectedDesign
                .toLowerCase()
                .replace(/\s+/g, "-");

        nailStage.classList.add(
            "design-" + designClass
        );

    }


    // ==========================================
    // SHADE OPTIONS
    // ==========================================

    const shadeOptions =
        document.querySelectorAll(
            ".shade-btn"
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

                selectedColor =
                    option.dataset.color ||
                    "#d4af37";

                updateVirtualPreview();

            }
        );

    });


    // ==========================================
    // SET DEFAULT ACTIVE OPTIONS
    // ==========================================

    function initializeVirtualPreview() {

        // SERVICE
        const defaultService =
            document.querySelector(
                '.service-option[data-service="Gel Nails"]'
            );

        if (defaultService) {

            serviceOptions.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );

            defaultService.classList.add(
                "active"
            );

        }


        // SHAPE
        const defaultShape =
            document.querySelector(
                '.shape-option[data-shape="Almond"]'
            );

        if (defaultShape) {

            shapeOptions.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );

            defaultShape.classList.add(
                "active"
            );

        }


        // DESIGN
        const defaultDesign =
            document.querySelector(
                '.design-option[data-design="Classic Nude"]'
            );

        if (defaultDesign) {

            designOptions.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );

            defaultDesign.classList.add(
                "active"
            );

        }


        // SHADE
        const defaultShade =
            document.querySelector(
                '.shade-btn[data-shade="Royal Gold"]'
            );

        if (defaultShade) {

            shadeOptions.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );

            defaultShade.classList.add(
                "active"
            );

            selectedColor =
                defaultShade.dataset.color ||
                "#d4af37";

        }


        updateNailShape();
        updateNailDesign();
        updateVirtualPreview();

    }


    initializeVirtualPreview();


    // ==========================================
    // VIRTUAL BOOKING FORM
    // ==========================================

    const virtualBookingForm =
        document.getElementById(
            "virtualBookingForm"
        );

    if (virtualBookingForm) {

        virtualBookingForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // ==========================================
                // INPUTS
                // ==========================================

                const nameInput =
                    document.getElementById(
                        "virtualName"
                    );

                const emailInput =
                    document.getElementById(
                        "virtualEmail"
                    );

                const phoneInput =
                    document.getElementById(
                        "virtualPhone"
                    );

                const dateInput =
                    document.getElementById(
                        "virtualBookingDate"
                    );

                const timeInput =
                    document.getElementById(
                        "time"
                    );


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


                // ==========================================
                // VALIDATION
                // ==========================================

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


                // ==========================================
                // EMAIL VALIDATION
                // ==========================================

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


                // ==========================================
                // BOOKING DATA
                // ==========================================

                const bookingData = {

                    name: name,

                    email: email,

                    phone: phone,

                    service: selectedService,

                    design: selectedDesign,

                    shade: selectedShade,

                    shape: selectedShape,

                    bookingDate: bookingDate,

                    bookingTime: bookingTime,

                    bookingType: "VIRTUAL"

                };


                console.log(
                    "Sending virtual booking:",
                    bookingData
                );


                // ==========================================
                // BUTTON STATE
                // ==========================================

                if (virtualBookButton) {

                    virtualBookButton.disabled =
                        true;

                    virtualBookButton.textContent =
                        "Booking...";

                }


                // ==========================================
                // SEND TO BACKEND
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


                    alert(
                        "Virtual booking submitted successfully!"
                    );


                    virtualBookingForm.reset();

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

                    if (virtualBookButton) {

                        virtualBookButton.disabled =
                            false;

                        virtualBookButton.textContent =
                            "Book This Look";

                    }

                }

            }
        );

    }


    // ==========================================
    // NORMAL BOOKING FORM
    // ==========================================

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


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
                    document.getElementById(
                        "bookingDate"
                    );

                const timeInput =
                    document.getElementById(
                        "bookingTime"
                    );


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


                // ==========================================
                // VALIDATION
                // ==========================================

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


                // ==========================================
                // EMAIL VALIDATION
                // ==========================================

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


                // ==========================================
                // BOOKING DATA
                // ==========================================

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


                // ==========================================
                // BUTTON STATE
                // ==========================================

                const submitButton =
                    bookingForm.querySelector(
                        'button[type="submit"]'
                    );

                const originalButtonText =
                    submitButton
                        ? submitButton.textContent
                        : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Booking...";

                }


                // ==========================================
                // SEND BOOKING
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

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            originalButtonText ||
                            "Confirm Appointment";

                    }

                }

            }
        );

    }


    // ==========================================
    // SERVICE SELECTION
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
    // LOAD SELECTED SERVICE
    // ==========================================

    const bookingServiceInput =
        document.getElementById(
            "service"
        );

    if (bookingServiceInput) {

        const savedService =
            localStorage.getItem(
                "selectedService"
            );

        if (savedService) {

            bookingServiceInput.value =
                savedService;

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


    // ==========================================
    // DATE MINIMUM = TODAY
    // ==========================================

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


    // VIRTUAL BOOKING DATE

    const virtualDate =
        document.getElementById(
            "virtualBookingDate"
        );

    if (virtualDate) {

        virtualDate.min =
            todayString;

    }


    // NORMAL BOOKING DATE

    const normalDate =
        document.getElementById(
            "bookingDate"
        );

    if (normalDate) {

        normalDate.min =
            todayString;

    }


    // ==========================================
    // DEBUG MESSAGE
    // ==========================================

    console.log(
        "✅ Nail Muse main.js loaded successfully"
    );

});