// уведомление при отправке формы
function showAlert(event) {
    event.preventDefault();
    alert("Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.");
}

// подсветка активной страницы в меню
document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// кнопка «наверх»
const btn = document.createElement("button");
btn.innerText = "↑";
btn.className = "to-top";
document.body.appendChild(btn);

btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

window.onscroll = () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
};

// 10 лаба проверка условий
const form = document.getElementById("feedbackForm");
const errorsBlock = document.getElementById("formErrors");
const commentsBlock = document.getElementById("comments");
const button = document.getElementById("submitBtn");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const counter = document.getElementById("charCount");
const name = document.getElementById("name");
const email = document.getElementById("email");

// маска телефона
phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/[^\d+()-\s]/g, "");
});
phone.addEventListener("input", function(e) {
    let x = phone.value.replace(/\D/g, ""); // оставляем только цифры
    if (x.startsWith("8")) x = "7" + x.slice(1); // если кто-то ввёл 8 → меняем на 7
    if (!x.startsWith("7")) x = "7" + x; // 7 в начало

    let formatted = "+7 ";
    if (x.length > 1) formatted += "(" + x.substring(1, 4);
    if (x.length >= 4) formatted += ") " + x.substring(4, 7);
    if (x.length >= 7) formatted += "-" + x.substring(7, 9);
    if (x.length >= 9) formatted += "-" + x.substring(9, 11);

    phone.value = formatted;
});



// счетчик символов для textarea
message.addEventListener("input", () => {
    counter.textContent = `${message.value.length} / 400`;
});

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        errorsBlock.innerHTML = "";

        const fields = [name, email, phone, message];

        // сброс рамок
        fields.forEach(f => f.style.borderColor = "#ccc");

        let errors = [];

        if (!name.value.trim()) errors.push("Введите имя");
        if (!email.value.trim()) errors.push("Введите email");
        if (!email.value.includes("@")) errors.push("Email должен содержать символ @");
        if (!phone.value.trim()) errors.push("Введите телефон");
        if (!message.value.trim()) errors.push("Введите сообщение");

        if (message.value.length < 50 || message.value.length > 400) {
            errors.push("Сообщение должно быть от 50 до 400 символов");
        }

        // если есть ошибки выводим
        if (errors.length > 0) {
            errors.forEach(text => {
                const p = document.createElement("p");
                p.textContent = text;
                errorsBlock.appendChild(p);
            });
            return;
        }

        const userName = name.value.trim();
        const userEmail = email.value.trim();
        const userPhone = phone.value.trim();
        const userMessage = message.value.trim();

        // комментарий
        if (commentsBlock) {
            const comment = document.createElement("div");
            comment.className = "comment";
            comment.innerHTML = `
                <p><strong>Имя:</strong> ${userName}</p>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>Телефон:</strong> ${userPhone}</p>
                <p><strong>Сообщение:</strong> ${userMessage}</p>
            `;
            commentsBlock.prepend(comment);
        }

        fields.forEach(field => {
            field.style.borderColor = "green";
            field.value = "";
        });

        button.textContent = "Готово";
    });
}

const slides = document.querySelectorAll(".services .slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentSlide = 0;

// гарантируем, что первый активен
slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === 0);
});

function changeSlide(direction) {
    slides[currentSlide].classList.remove("active");

    if (direction === "next") {
        currentSlide = (currentSlide + 1) % slides.length;
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }

    slides[currentSlide].classList.add("active");
}

nextBtn?.addEventListener("click", () => changeSlide("next"));
prevBtn?.addEventListener("click", () => changeSlide("prev"));
