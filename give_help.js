document.addEventListener("DOMContentLoaded", () => {
 const amountBtns = document.querySelectorAll(".amt");
 const freqBtns = document.querySelectorAll(".freq");
 const tabs = document.querySelectorAll(".give-tab");
 const msg = document.getElementById("giveMessage");
 const customAmountBox = document.getElementById("customAmountBox");
 const customAmountInput = document.getElementById("customAmount");
 const giveAmounts = document.querySelector(".give-amounts");
 const giveFreq = document.querySelector(".give-frequency");
 const submitBtn = document.querySelector(".give-submit");
 const wishButtons = document.querySelectorAll(".wish");
 const messages = {
   5: "£5 provides essential hygiene items for someone in need",
   10: "£10 provides a hot meal and shelter for one person for one night",
   25: "£25 helps support outreach services and emergency supplies",
   50: "£50 helps fund longer-term support and accommodation services",
   other: "Enter your custom donation amount below."
 };
 function setActive(list, activeBtn) {
   list.forEach(btn => btn.classList.remove("active"));
   activeBtn.classList.add("active");
 }
 function showCustomAmount() {
   customAmountBox.style.display = "block";
   customAmountInput.focus();
 }
 function hideCustomAmount() {
   customAmountBox.style.display = "none";
   customAmountInput.value = "";
 }
 amountBtns.forEach(btn => {
   btn.addEventListener("click", () => {
     setActive(amountBtns, btn);
     const key = btn.textContent.replace("£", "").trim().toLowerCase();
     if (key === "other") {
       showCustomAmount();
       msg.textContent = messages.other;
     } else {
       hideCustomAmount();
       msg.textContent = messages[key] || messages.other;
     }
   });
 });
 customAmountInput.addEventListener("input", () => {
   const value = customAmountInput.value.trim();
   if (value && Number(value) > 0) {
     msg.textContent = `£${value} could make a real difference to someone in need.`;
   } else {
     msg.textContent = "Enter your custom donation amount below.";
   }
 });
 freqBtns.forEach(btn => {
   btn.addEventListener("click", () => {
     setActive(freqBtns, btn);
   });
 });
 tabs.forEach(btn => {
   btn.addEventListener("click", () => {
     setActive(tabs, btn);
     const mode = btn.dataset.mode;
     if (mode === "donate") {
       giveAmounts.style.display = "grid";
       giveFreq.style.display = "grid";
       submitBtn.textContent = "Donate Now";
       const activeAmountBtn = document.querySelector(".amt.active");
       const activeKey = activeAmountBtn
         ? activeAmountBtn.textContent.replace("£", "").trim().toLowerCase()
         : "10";
       if (activeKey === "other") {
         showCustomAmount();
         msg.textContent = "Enter your custom donation amount below.";
       } else {
         hideCustomAmount();
         msg.textContent = messages[activeKey] || messages[10];
       }
     } else {
       giveAmounts.style.display = "none";
       giveFreq.style.display = "none";
       hideCustomAmount();
       msg.textContent = "Join our volunteer team and help support people experiencing homelessness.";
       submitBtn.textContent = "Apply to Volunteer";
     }
   });
 });
 submitBtn.addEventListener("click", () => {
   const activeTab = document.querySelector(".give-tab.active")?.dataset.mode;
   const activeAmount = document.querySelector(".amt.active")?.textContent.replace("£", "").trim().toLowerCase();
   if (activeTab === "donate") {
     if (activeAmount === "other") {
       const value = customAmountInput.value.trim();
       if (!value || Number(value) <= 0) {
         alert("Please enter a valid donation amount.");
         return;
       }
       alert(`Thank you for donating £${value} ❤️`);
     } else {
       const shownAmount = activeAmount || "10";
       alert(`Thank you for donating £${shownAmount} ❤️`);
     }
   } else {
     window.open("https://www.porchlight.org.uk/get-involved/volunteer-with-us", "_blank");
   }
 });
 wishButtons.forEach(button => {
   button.addEventListener("click", () => {
     const item = button.textContent.trim();
     buyItem(item);
   });
 });
});
function buyItem(item) {
 const query = item.replace(/ /g, "+");
 const url = "https://www.amazon.co.uk/s?k=" + query;
 window.open(url, "_blank");
}