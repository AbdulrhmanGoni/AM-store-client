export default function loadingControl(action) {
    if (action) document.getElementById("loadingCircle").style.display = "flex";
    else document.getElementById("loadingCircle").style.display = "none";
}
