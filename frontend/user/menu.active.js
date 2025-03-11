
const data = [
    ["dashboard.", "menu-item-dashboard"],
    ["profile", "menu-item-profile"],
    ["payment.packages", "menu-item-paymentPackages"],
    ["file.library", "menu-item-fileLibrary"],
    ["payment.history", "menu-item-paymentHistory"],
    ["help", "menu-item-help"],
    ["notifications", "menu-item-notifications"],
]
data.forEach((item)=>{
    if (location.pathname.includes(item[0])) {
        const elem = document.querySelector(`.${item[1]}`)
        elem.classList.add('menuActiveColor')
    }
})



