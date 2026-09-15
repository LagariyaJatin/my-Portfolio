# Custom Cursor — Code + Freebuff Prompt

## 1. CODE (copy this whole block)

```html
<!-- CURSOR MARKUP -->
<div class="cursor">
  <svg class="cursor-progress" viewBox="0 0 44 44">
    <circle class="cursor-progress-bg" cx="22" cy="22" r="20" />
    <circle class="cursor-progress-bar" cx="22" cy="22" r="20" />
  </svg>
  <div class="cursor-inner">
    <span class="cursor-dot"></span>
    <svg class="cursor-arrow" viewBox="0 0 24 24" width="14" height="14">
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</div>

<style>
.cursor {
  position: fixed;
  top: 0; left: 0;
  width: 44px; height: 44px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1);
  mix-blend-mode: difference;
}

.cursor-progress {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}
.cursor-progress-bg {
  fill: none;
  stroke: rgba(255,255,255,0.2);
  stroke-width: 1.5;
}
.cursor-progress-bar {
  fill: none;
  stroke: #fff;
  stroke-width: 1.5;
  stroke-dasharray: 125.6; /* 2 * PI * 20 */
  stroke-dashoffset: 125.6;
  transition: stroke-dashoffset 0.1s linear;
}

.cursor-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.cursor-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #fff;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cursor-arrow {
  position: absolute;
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

/* State: hovering a link */
.cursor.is-link { width: 56px; height: 56px; }
.cursor.is-link .cursor-dot { opacity: 0; transform: scale(0); }
.cursor.is-link .cursor-arrow { opacity: 1; transform: scale(1) rotate(0deg); }

/* State: hovering media/image */
.cursor.is-media { width: 90px; height: 90px; }
.cursor.is-media .cursor-progress { opacity: 0; }

@media (hover: none) {
  .cursor { display: none; }
}
</style>

<script>
const cursor = document.querySelector('.cursor');
const progressBar = document.querySelector('.cursor-progress-bar');
const CIRCUMFERENCE = 125.6;

let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

// Follow mouse with slight easing
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function render() {
  posX += (mouseX - posX) * 0.18;
  posY += (mouseY - posY) * 0.18;
  cursor.style.left = posX + 'px';
  cursor.style.top = posY + 'px';
  requestAnimationFrame(render);
}
render();

// Scroll progress ring
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
  progressBar.style.strokeDashoffset = offset;
}
window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// State changes based on hovered element
document.querySelectorAll('[data-cursor]').forEach((el) => {
  const type = el.getAttribute('data-cursor'); // "link" or "media"
  el.addEventListener('mouseenter', () => cursor.classList.add(`is-${type}`));
  el.addEventListener('mouseleave', () => cursor.classList.remove(`is-${type}`));
});
</script>
```

**Usage:** add `data-cursor="link"` to nav links/buttons, and `data-cursor="media"` to project images/thumbnails, e.g.:

```html
<a href="#" data-cursor="link">View Case Study</a>
<img src="project.jpg" data-cursor="media" />
```

---

## 2. PROMPT FOR FREEBUFF (copy this whole block)

Implement this exact custom cursor system on the site, using the code below as the base implementation — do not simplify, redesign, or replace it with a different cursor approach.

**Behavior required:**
- A small dot cursor with a thin circular ring around it
- The ring fills up as the user scrolls down the page (a scroll-progress indicator built into the cursor)
- When hovering any element marked `data-cursor="media"` (project images/thumbnails), the cursor grows into a large soft circle
- When hovering any element marked `data-cursor="link"` (nav links, buttons, CTAs), the dot disappears and morphs into a diagonal arrow pointing up-right
- Cursor uses `mix-blend-mode: difference` so it stays visible on both light and dark sections
- Hide the custom cursor entirely on touch devices (already handled via `@media (hover: none)` in the code)

**Code to use as-is:**

[Paste the full HTML/CSS/JS block from section 1 above here]

**Apply the data attributes to:**
- `data-cursor="link"` → all nav links, the "Let's Talk" button, "View My Work" button, "Start a Project" and "Email Me" buttons, all "View Case Study" links
- `data-cursor="media"` → all project thumbnail images in the Featured Projects section, and the portrait photo in the About Me section

Adapt only the color (`#fff`) and sizing if needed to match the site's existing color palette — keep the animation logic and structure exactly as provided.
