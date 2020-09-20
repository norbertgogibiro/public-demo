const openDropdownClass = 'dropdown-state-open';
const dropdownOpenerClass = 'dropdown-opener';
const emailLinkClass = 'link-email';
const currentYearContainerClass = 'current-year';
const cursorFollowerEyeClass = 'eye-ball-cursor-follower';
const cursorFollowingEyeClass = 'is-following';
const trippingEyeClass = 'is-tripping';
const clickEvents = ['click', 'touchstart'];
let isEyeballFollowingLoop = true;

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
    const passiveTimeMin = 1000;
    const passiveTimeMax = 3500;
    const passiveTime = Math.random() * (passiveTimeMax - passiveTimeMin) + passiveTimeMin;

    const activeTimeMin = 4500;
    const activeTimeMax = 11500;
    const activeTime = Math.random() * (activeTimeMax - activeTimeMin) + activeTimeMin;
    console.log('called', isEyeballFollowingLoop);

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

    document.querySelector('.eye').classList.remove(trippingEyeClass);
    document.addEventListener('mousemove', setEyeBallPosition);
    isEyeballFollowingLoop = true;
};

// Make the eyeball follow the cursor:
controlEyeBallFollowing(true);

// Handle document keyup and click events:
[...clickEvents, 'keyup'].forEach(eventName => document.addEventListener(eventName, function (event) {
    //event.preventDefault();
    const { target, key, type } = event;
    const isClickEvent = clickEvents.includes(type);

    if (isClickEvent || (type === 'keyup' && key === 'Escape')) {
        if (document.querySelectorAll(`.${openDropdownClass}`).length > 0) {
            closeAllDropdowns();
        }

        if (isClickEvent && target.classList.contains(dropdownOpenerClass)) {
            target.parentNode.classList.add(openDropdownClass);
            document.querySelector('.eye').classList.add(trippingEyeClass);
            document.removeEventListener('mousemove', setEyeBallPosition);
            setEyeBallPosition();
            isEyeballFollowingLoop = false;
        }
    }
}));

// Handle dropdown openers:
document.querySelectorAll(`.${dropdownOpenerClass}`).forEach(dropdownOpener => {
    clickEvents.forEach(eventName => dropdownOpener.addEventListener(eventName, function (event) {
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
    }));
});

// Handle email link clicks:
document.querySelectorAll(`.${emailLinkClass}`).forEach(emailLink => {
    clickEvents.forEach(eventName => emailLink.addEventListener(eventName, function ({ target }) {
        const {
            dataset: {
                name,
                domain,
                tld
            }
        } = target;

        window.location.href = `mailto:${name}@${domain}.${tld}`;
        return false;
    }));
});

// Populate current year:
document.querySelectorAll(`.${currentYearContainerClass}`).forEach(currentYearContainer => {
    currentYearContainer.innerHTML = new Date().getFullYear();
});