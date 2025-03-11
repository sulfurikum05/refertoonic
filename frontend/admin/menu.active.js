
const data = [
    ["dashboard.", "menu-item-dashboard"],
    ["userManagement", "menu-item-userManagement"],
    ["payment.history", "menu-item-paymentHistory"],
    ["payment.packages", "menu-item-paymentPackages"],
    ["videoModeration", "menu-item-videoModeration"],
    ["messages", "menu-item-messages"],
    ["notifications", "menu-item-notifications"],
    ["help", "menu-item-help"],
    [ "file.library", "menu-item-flieLibrary"],
    ["profile", "menu-item-profile"],
]
data.forEach((item)=>{
    if (location.pathname.includes(item[0])) {
        const elem = document.querySelector(`.${item[1]}`)
        elem.classList.add('menuActiveColor')
    }
})



