import { getDiv } from "./htmlElements.js";

export function tooltip(tooltipText, activeBlock) {
  const tooltipDiv = getDiv("tooltip-hidden");
  const tooltipContent = getDiv("tooltip__content");

  tooltipContent.innerHTML = tooltipText;

  tooltipDiv.append(tooltipContent);

  activeBlock.addEventListener("mouseenter", () => {
    tooltipDiv.classList.add("tooltip-visibility");
    activeBlock.append(tooltipDiv);
  });

  activeBlock.addEventListener("keydown", () => {
    if (tooltipDiv.classList.contains("tooltip-visibility")) {
      tooltipDiv.classList.remove("tooltip-visibility");
      tooltipDiv.remove();
    } else {
      tooltipDiv.classList.add("tooltip-visibility");
      activeBlock.append(tooltipDiv);
    }
  });

  activeBlock.addEventListener("mouseleave", () => {
    tooltipDiv.classList.remove("tooltip-visibility");
  });

  return tooltipDiv;
}
