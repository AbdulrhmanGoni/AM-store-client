import { generateRandomId } from "../goniFunctions";
export default function renderElement(elementId = generateRandomId() + "-coustomRender") {
    const div = document.createElement("div");
    div.id = elementId
    document.body.appendChild(div);
    return elementId;
}