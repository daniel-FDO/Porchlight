const shelters = {
    dover: [
        { name: "Dover Shelter", postcode: "CT16 1AA" }
    ],
    canterbury: [
        { name: "Canterbury Shelter", postcode: "CT1 2BB" }
    ]
};

function searchLocation() {
    const input = document.getElementById("locationInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (shelters[input]) {
        shelters[input].forEach(shelter => {
            resultsDiv.innerHTML += `
                <div class="result-card">
                    <h3>${shelter.name}</h3>
                    <p><strong>Postcode:</strong> ${shelter.postcode}</p>
                </div>
            `;
        });

        resultsDiv.scrollIntoView({ behavior: "smooth" });

    } else {
        resultsDiv.innerHTML = "<p>No shelters found for that location.</p>";
        resultsDiv.scrollIntoView({ behavior: "smooth" });
    }
}

function showAdvice() {
    const adviceDiv = document.getElementById("advice");

    adviceDiv.innerHTML = `
        <h2>Support Advice</h2>
        <ul>
            <li>Stay in well-lit public areas</li>
            <li>Keep your phone charged</li>
            <li>Contact local support services</li>
            <li>Phone the Homeless Helpline for advice: 0808 800 0661</li>
            <li><a href="https://www.porchlight.org.uk/" target="_blank">Porchlight</a></li>
        </ul>
    `;

    adviceDiv.scrollIntoView({ behavior: "smooth" });
}

const buttons = document.querySelectorAll(".hero-card button");
const responseBox = document.getElementById("response-box");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        button.classList.add("clicked");

        const text = button.textContent.toLowerCase();

        if (text.includes("food")) {
            document.getElementById("locationInput").value = "dover";
            responseBox.innerHTML = "Searching for food & shelter support...";
            searchLocation();
        }
        else if (text.includes("lost")) {
            responseBox.innerHTML = "It’s okay. Let’s find safe options for you.";
            showAdvice();
        }
        else {
            responseBox.innerHTML = "We’ll connect you to the right support service.";
            showAdvice();
        }

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 300);
    });
});

function showAdvice() {
    window.location.href = "support.html";
}

function searchLocation() {
    window.location.href = "find_help.html";
}