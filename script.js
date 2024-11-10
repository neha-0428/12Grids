const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const fields = ["name", "organization", "email", "contact", "message"];
const errors = {
  name: "Name is required.",
  organization: "Organization name is required.",
  email: "Valid email is required.",
  contact: "Contact number is required.",
  message: "Message cannot be empty.",
};

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // Clear previous error messages
  fields.forEach((field) => {
    document.getElementById(`${field}Error`).textContent = "";
  });

  // Validation
  fields.forEach((field) => {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      document.getElementById(`${field}Error`).textContent = errors[field];
      isValid = false;
    } else if (field === "email" && !validateEmail(input.value.trim())) {
      document.getElementById(`${field}Error`).textContent =
        "Invalid email format.";
      isValid = false;
    } else if (field === "contact" && !validateContact(input.value.trim())) {
      document.getElementById(`${field}Error`).textContent =
        "Contact number should contain only numbers and be at least 10 digits long.";
      isValid = false;
    }
  });

  if (isValid) {
    successMessage.classList.remove("hidden");
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
    contactForm.reset();
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateContact(contact) {
  // Allow only numbers and check for minimum length (e.g., 10 digits)
  const re = /^[0-9]{10}$/;
  return re.test(contact);
}
