class Slider {
    elements;
    buttons;
    position = 0;
    positionCount;
    movePosition;
    maxPosition;
    autoplay = false;
    slidesCountDefault;

    constructor(wrapper, config) {
        this.elements = {
            main: wrapper,
            container: wrapper.querySelector(".slider-container"),
            track: wrapper.querySelector(".slider-list"),
            items: wrapper.querySelectorAll(".slider-item"),
        };

        this.buttons = {
            prev: wrapper.querySelector(".control__previous"),
            next: wrapper.querySelector(".control__next"),
        };

        const itemWidth = this.elements.container.clientWidth / config.slidesToShowCustom;
        this.movePosition = config.slidesToScroll * itemWidth + config.movePosition;
        this.maxPosition = -(this.elements.items.length * itemWidth - config.slidesToShow * itemWidth) - config.movePosition * (this.elements.items.length - 1);
        this.elements.items.forEach((item) => (item.style.minWidth = `${itemWidth}px`));
        this.positionCount = config.slidesCountDefault;
        this.slidesCountDefault = config.slidesCountDefault;
        this.setCountPosition();
        this.buttons.prev.addEventListener("click", () => this.handlePrevClick());
        this.buttons.next.addEventListener("click", () => this.handleNextClick());
        this.checkBtns();
        if (config.autoplay)
            this.autoplay = config.autoplay;
        if (this.autoplay)
            this.startAutoplay();
    }

    handlePrevClick() {
        this.position += this.movePosition;
        if (this.position > 100) {
            this.position = 0;
        } else {
            this.positionCount -= 1;
        }

        this.setPosition();
        this.checkBtns();
        this.setCountPosition();
    }

    handleNextClick() {
        this.position -= this.movePosition;
        if (this.position < this.maxPosition) {
            this.position = this.maxPosition;
        } else {
            this.positionCount += 1;
        }

        this.setPosition();
        this.checkBtns();
        this.setCountPosition();
    }

    setPosition() {
        this.elements.track.style.transform = `translateX(${this.position}px)`;
    }

    setCountPosition() {
        let count = this.elements.main.querySelector(".count");

        if (count) count.innerHTML = this.positionCount;

        let stepControlCount = this.elements.main.querySelectorAll(".step-control .box");

        if (stepControlCount.length > 0) {
            stepControlCount.forEach((box) => {
                box.classList.remove("active");
            });

            if (this.positionCount > 0) {
                stepControlCount[this.positionCount - 1].classList.add("active");
            }
        }
    }

    checkBtns() {
        if (this.position === 0) {
            this.buttons.prev.classList.add("disabled");
        } else {
            this.buttons.prev.classList.remove("disabled");
        }
        if (this.position <= this.maxPosition) {
            this.buttons.next.classList.add("disabled");
        } else {
            this.buttons.next.classList.remove("disabled");
        }
    }

    startAutoplay() {
        setInterval(() => {
            if (!this.buttons.next.classList.contains("disabled")) {
                this.handleNextClick();
            } else {
                this.position = 0;
                this.positionCount = this.slidesCountDefault;
    
                this.setPosition();
                this.checkBtns();
                this.setCountPosition();
                this.setPosition();
            }
        }, 4000);
    }
}

let sliderInstance;

let isLargeScreen = window.innerWidth > 768;

function createSlider() {
    if (sliderInstance) {
        sliderInstance.destroy();
    }

    if (isLargeScreen) {
        sliderInstance = new Slider(document.querySelector(".participants"), {
            slidesToShow: 3,
            slidesToShowCustom: 3,
            slidesCountDefault: 3,
            slidesToScroll: 1,
            movePosition: 0,
            autoplay: true
        });
    } else {
        sliderInstance = new Slider(document.querySelector(".participants"), {
            slidesToShow: 1,
            slidesToShowCustom: 6,
            slidesCountDefault: 1,
            slidesToScroll: 1,
            movePosition: 0,
            autoplay: true
        });
    }

    if (!isLargeScreen) {
        sliderInstance = new Slider(document.querySelector(".step"), {
            slidesToShow: 1,
            slidesToShowCustom: 1,
            slidesCountDefault: 1,
            slidesToScroll: 1,
            movePosition: 20
        });
    }
}

createSlider();

function handleResize() {
    const newIsLargeScreen = window.innerWidth > 768;
    if (newIsLargeScreen !== isLargeScreen) {
        isLargeScreen = newIsLargeScreen;

        createSlider();
    }
}

window.addEventListener("resize", handleResize);
