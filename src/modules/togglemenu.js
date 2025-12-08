export default function toggleSettings () {
  let menu = document.getElementById("formOptions");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  };
}