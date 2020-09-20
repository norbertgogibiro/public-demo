const openDropdownClass = 'dropdown-state-open';
const dropdownOpenerClass = 'dropdown-opener';
const emailLinkClass = 'link-email';
const currentYearContainerClass = 'current-year';
const starClass = 'star';
const starShapeClass = 'star-shape';
const eyeClass = 'eye';
const grownStarClass = 'is-grown';
const cursorFollowerEyeClass = 'eye-ball-cursor-follower';
const cursorFollowingEyeClass = 'is-following';
const trippingEyeClass = 'is-tripping';
const clickEvents = ['click', 'touchstart'];
let isEyeballFollowingLoop = true;

const getRandomAmount = function (min, max) {
    return Math.random() * (max - min) + min;
}

const setEyeBallPosition = function (event = {}) {
    const { innerWidth, innerHeight } = window;
    const { clientX = innerWidth / 2, clientY = innerHeight / 2 } = event;
    const percentPositionX = (clientX * 100) / innerWidth;
    const percentPositionY = (clientY * 100) / innerHeight;

    document.querySelectorAll(`.${cursorFollowerEyeClass}`).forEach(eyeBallElement => {
        eyeBallElement.style.top = `${percentPositionY}%`;
        eyeBallElement.style.left = `${percentPositionX}%`;
    });
};

const controlEyeBallFollowing = function (followMovement = false) {
    const passiveTime = getRandomAmount(1000, 3500);
    const activeTime = getRandomAmount(4500, 11500);

    setTimeout(() => {
        document.querySelectorAll(`.${cursorFollowerEyeClass}:not(.${trippingEyeClass})`).forEach(eyeBallElement => {
            if (followMovement && isEyeballFollowingLoop) {
                document.addEventListener('mousemove', setEyeBallPosition);
                eyeBallElement.classList.add(cursorFollowingEyeClass);
            }

            else {
                document.removeEventListener('mousemove', setEyeBallPosition);
                eyeBallElement.classList.remove(cursorFollowingEyeClass);
                setEyeBallPosition();
            }
        });

        if (isEyeballFollowingLoop) {
            controlEyeBallFollowing(!followMovement);
        }
    }, followMovement ? passiveTime : activeTime);
};

const closeAllDropdowns = function () {
    document.querySelectorAll(`.${dropdownOpenerClass}`).forEach(({ parentNode: { classList: parentClassList } }) => {
        parentClassList.remove(openDropdownClass);
    });

    document.querySelector(`.${eyeClass}`).classList.remove(trippingEyeClass);
    document.querySelector(`.${starClass}`).classList.remove(grownStarClass);
    document.addEventListener('mousemove', setEyeBallPosition);
    isEyeballFollowingLoop = true;
};

// Make the eyeball follow the cursor:
controlEyeBallFollowing(true);

// Handle keyup and click events:
[...clickEvents, 'keyup'].forEach(eventName => {
    const isClickEvent = clickEvents.includes(eventName);

    // Handle events on the document:
    document.addEventListener(eventName, function (event) {
        const { target, key, type } = event;
        const hasClickHappened = clickEvents.includes(type)
    
        if (hasClickHappened || (type === 'keyup' && key === 'Escape')) {
    
            // Close all dropdowns when any dropdown is open and
            // the user clicks or presses escape:
            if (document.querySelectorAll(`.${openDropdownClass}`).length > 0) {
                closeAllDropdowns();
            }
        }

        // Open dropdown if a dropdown opener is clicked:
        if (hasClickHappened && target.classList.contains(dropdownOpenerClass)) {
            target.parentNode.classList.add(openDropdownClass);
            document.querySelector(`.${eyeClass}`).classList.add(trippingEyeClass);
            document.querySelector(`.${starClass}`).classList.add(grownStarClass);
            document.removeEventListener('mousemove', setEyeBallPosition);
            setEyeBallPosition();
            isEyeballFollowingLoop = false;
        }
    });

    // Only click events:
    if(isClickEvent){

        // Handle clicks on the dropdown openers:
        document.querySelectorAll(`.${dropdownOpenerClass}`).forEach(dropdownOpener => {
            dropdownOpener.addEventListener(eventName, function (event) {
                event.preventDefault();

                const {
                    target: {
                        parentNode: {
                            classList: parentClassList
                        }
                    }
                } = event;

                if (!parentClassList.value.includes(openDropdownClass)) {
                    parentClassList.add(openDropdownClass);
                }
            });
        });

        // Handle email link clicks:
        document.querySelectorAll(`.${emailLinkClass}`).forEach(emailLink => {
            emailLink.addEventListener(eventName, function ({ target }) {
                const {
                    dataset: {
                        name,
                        domain,
                        tld
                    }
                } = target;

                window.location.href = `mailto:${name}@${domain}.${tld}`;
                return false;
            });
        });

        // Handle clicks on the main eye:
        document.querySelector(`button.${eyeClass}`).addEventListener(eventName, function () {
            alert();
        });
    }
}); 

// Populate current year:
document.querySelectorAll(`.${currentYearContainerClass}`).forEach(currentYearContainer => {
    currentYearContainer.innerHTML = new Date().getFullYear();
});

// After document has been initialized:
setTimeout(function () {
    document.querySelector(`.${starShapeClass}`).style.transition = '2.2s';
}, 0);