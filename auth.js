const ACCESS_STORAGE_KEY = "nika_site_access_granted_v1";
const SITE_PASSWORD = "emerald";

const hasAccess = sessionStorage.getItem(ACCESS_STORAGE_KEY) === "1";

if (!hasAccess) {
  document.documentElement.classList.add("site-is-locked");

  const overlay = document.createElement("div");
  overlay.className = "auth-overlay";
  overlay.innerHTML = `
    <section class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <p class="auth-kicker">Private Website</p>
      <h1 id="auth-title">Enter Password</h1>
      <p class="auth-copy">This website is protected. Enter the password to continue.</p>
      <form id="auth-form" class="auth-form">
        <label for="auth-password">Password</label>
        <input id="auth-password" name="password" type="password" autocomplete="current-password" required />
        <button type="submit">Unlock</button>
        <p id="auth-feedback" class="auth-feedback" aria-live="polite"></p>
      </form>
    </section>
  `;

  document.body.appendChild(overlay);

  const form = document.getElementById("auth-form");
  const passwordInput = document.getElementById("auth-password");
  const feedback = document.getElementById("auth-feedback");

  passwordInput?.focus();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!passwordInput || !feedback) {
      return;
    }

    if (passwordInput.value === SITE_PASSWORD) {
      sessionStorage.setItem(ACCESS_STORAGE_KEY, "1");
      document.documentElement.classList.remove("site-is-locked");
      overlay.remove();
      return;
    }

    feedback.textContent = "Wrong password. Try again.";
    passwordInput.value = "";
    passwordInput.focus();
  });
}
