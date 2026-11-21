// Tabs + FAQ accordion + anonymous toggle
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".support-tab");
  const tabContents = document.querySelectorAll("[data-tabcontent]");

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");

      const key = t.dataset.tab;
      tabContents.forEach(c => {
        c.classList.toggle("hidden", c.dataset.tabcontent !== key);
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains("show");

      // close all in the same faq block
      const wrapper = btn.closest(".support-faq");
      wrapper.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("show"));
      wrapper.querySelectorAll(".faq-item").forEach(b => b.classList.remove("open"));

      if (!isOpen) {
        answer.classList.add("show");
        btn.classList.add("open");
      }
    });
  });

  // Anonymous toggle enables/disables email
  const toggle = document.getElementById("anonToggle");
  const email = document.getElementById("emailInput");

  toggle.addEventListener("click", () => {
    const isOff = toggle.classList.toggle("off");
    // OFF = not anonymous => enable email
    email.disabled = !isOff ? true : false;

    toggle.setAttribute("aria-pressed", String(!isOff));
  });

  // Fake submit
  const sendBtn = document.getElementById("sendBtn");
  const note = document.getElementById("sendNote");
  sendBtn.addEventListener("click", () => {
    note.textContent = "✅ Sent! (Demo mode, in a real site this would send to a support worker.)";
  });
});