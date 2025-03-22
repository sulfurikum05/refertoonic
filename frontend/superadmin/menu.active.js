
const data = [
    ["statusChange", "menu-item-status-change"],
    ["dashboard.", "menu-item-dashboard"],
    ["dashboardManagement", "menu-item-dashManagement"],
    ["userManagement", "menu-item-userManagement"],
    ["paymentHistory", "menu-item-paymentHistoryManagement"],
    ["videoModeration", "menu-item-videoModeration"],
    ["messages", "menu-item-messages"],
    ["notifications", "menu-item-notifications"],
    [ "flieLibrary", "menu-item-flieLibrary"],
    ["profile", "menu-item-profile"],
]
data.forEach((item)=>{
    if (location.pathname.includes(item[0])) {
        const elem = document.querySelector(`.${item[1]}`)
        elem.classList.add('menuActiveColor')
    }
})



