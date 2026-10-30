// Ajuste este número para o WhatsApp que receberá as inscrições.
// Formato internacional, somente números. Ex.: 5521999999999

// Número de WhatsApp que receberá as inscrições.
const WHATSAPP_NUMBER = "5521970234639";

const form = document.querySelector("#signupForm");
const message = document.querySelector("#formMessage");
const phoneInput = document.querySelector("#phone");

// Formatação automática do telefone
phoneInput.addEventListener("input", (event) => {
  let digits = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (digits.length > 10) {
    digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (digits.length > 6) {
    digits = digits.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (digits.length > 2) {
    digits = digits.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  }

  event.target.value = digits;
});

// Envio e armazenamento das inscrições
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const data = new FormData(form);

  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const phone = data.get("phone").trim();
  const phoneModel = data.get("phoneModel").trim() || null;
  const consentimentoDivulgacao = data.has("consentimentoDivulgacao");

  const whatsappText = [
    "Olá! Tenho interesse no encontro de fotografia com celular.",
    "",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `WhatsApp: ${phone}`,
    `Celular: ${phoneModel || "Não informado"}`
  ].join("\n");

  // Abrir uma aba para o WhatsApp durante o processamento
  const whatsappWindow = window.open("about:blank", "_blank");

  submitButton.disabled = true;
  message.textContent = "Salvando sua inscrição...";

  try {
    const { error } = await supabaseClient
      .from("inscricoes")
      .insert({
        nome: name,
        email: email || null,
        whatsapp: phone,
        modelo_celular: phoneModel,
        consentimento: true,
        consentimento_divulgacao: consentimentoDivulgacao
    });

    if (error) {
      throw error;
    }

    message.textContent =
      "Inscrição registrada! Abrindo o WhatsApp...";

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

    if (whatsappWindow) {
      whatsappWindow.location.href = url;
    } else {
      window.location.href = url;
    }

    form.reset();

  } catch (error) {
    console.error("Erro ao registrar inscrição:", error);

    if (whatsappWindow) {
      whatsappWindow.close();
    }

    message.textContent =
      "Não foi possível registrar sua inscrição. Tente novamente.";

  } finally {
    submitButton.disabled = false;
  }
});

// Menu compacto para celulares
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
