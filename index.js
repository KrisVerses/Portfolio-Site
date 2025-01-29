document.addEventListener("DOMContentLoaded", function () {
  // Fade-in Effect
  const elements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");
  const projectContainer = document.querySelector(".projects"); // Parent container for projects
  let noProjectMessage = document.createElement("p"); // Create message once
  noProjectMessage.textContent = "No projects available.";
  noProjectMessage.classList.add(
    "text-gray-500",
    "text-center",
    "mt-4",
    "hidden"
  );

  // Append the message initially (hidden)
  projectContainer.appendChild(noProjectMessage);

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active state from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("bg-gray-300"));
      this.classList.add("bg-gray-300");

      const filter = this.getAttribute("data-filter");
      let hasVisibleProjects = false;

      projects.forEach((project) => {
        if (
          filter === "all" ||
          project.getAttribute("data-category") === filter
        ) {
          project.classList.remove("hidden");
          // Reapply fade-in effect when shown
          observer.observe(project);
          hasVisibleProjects = true;
        } else {
          project.classList.add("hidden");
        }
      });

      // Show or hide "No projects available" message
      if (hasVisibleProjects) {
        noProjectMessage.classList.add("hidden"); // Hide message if projects are found
      } else {
        noProjectMessage.classList.remove("hidden"); // Show message if no projects match
      }
    });
  });
});
