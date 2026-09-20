
// Show/hide inputs on icon click
document.getElementById("bgIcon").addEventListener("click", () => {
  const input = document.getElementById("bgColorMobile");
  input.style.display = input.style.display === "none" ? "block" : "none";
});

document.getElementById("textIcon").addEventListener("click", () => {
  const input = document.getElementById("textColorMobile");
  input.style.display = input.style.display === "none" ? "block" : "none";
});

document.getElementById("gradIcon").addEventListener("click", () => {
  const inputs = document.getElementById("gradInputs");
  inputs.style.display = inputs.style.display === "none" ? "block" : "none";
});

     // Desktop selectors
const bgPicker = document.getElementById("bgColor");
const textPicker = document.getElementById("textColor");
const gradStart = document.getElementById("gradStart");
const gradEnd = document.getElementById("gradEnd");

// Mobile selectors
const bgPickerMobile = document.getElementById("bgColorMobile");
const textPickerMobile = document.getElementById("textColorMobile");
const gradStartMobile = document.getElementById("gradStartMobile");
const gradEndMobile = document.getElementById("gradEndMobile");


// Common update function
let isGradientActive = false; // global flag

function updateColors(bg, text) {
  const editor = document.getElementById("editor");
  const phaseText = document.getElementById("phaseText");

  if (isGradientActive) {
    // Gradient case
    if (editor) {
      editor.style.backgroundImage = document.body.style.backgroundImage;
      editor.style.backgroundColor = "";
    }
    if (phaseText) {
      phaseText.style.backgroundImage = document.body.style.backgroundImage;
      phaseText.style.backgroundColor = "";
    }
  } else {
    // Plain color case
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = bg;
    if (editor) {
      editor.style.backgroundImage = "";
      editor.style.backgroundColor = bg;
    }
    if (phaseText) {
      phaseText.style.backgroundImage = "";
      phaseText.style.backgroundColor = bg;
    }
  }

  document.body.style.color = text;
  if (editor) editor.style.color = text;
  if (phaseText) phaseText.style.color = text;

  showCSS();
}



// Desktop listeners
bgPicker.addEventListener("input", () => updateColors(bgPicker.value, textPicker.value));
textPicker.addEventListener("input", () => updateColors(bgPicker.value, textPicker.value));

// Mobile listeners
bgPickerMobile.addEventListener("input", () => updateColors(bgPickerMobile.value, textPickerMobile.value));
textPickerMobile.addEventListener("input", () => updateColors(bgPickerMobile.value, textPickerMobile.value));

// Gradient apply (desktop + mobile)
document.getElementById("applyGradient").addEventListener("click", () => {
  const gradientValue = `linear-gradient(45deg, ${gradStart.value}, ${gradEnd.value})`;
  document.body.style.backgroundImage = gradientValue;

  // ✅  sync phaseText
  const phaseText = document.getElementById("phaseText");
  if (phaseText) {
    phaseText.style.backgroundImage = gradientValue;
    phaseText.style.backgroundColor = "";
  }

  // ✅ Sync editor
  const editor = document.getElementById("editor");
  if (editor) {
    editor.style.backgroundImage = gradientValue;
    editor.style.backgroundColor = "";
  }

  showCSS();
});

document.getElementById("gradIcon").addEventListener("click", () => {
  const gradientValue = `linear-gradient(45deg, ${gradStartMobile.value}, ${gradEndMobile.value})`;
  document.body.style.backgroundImage = gradientValue;
  showCSS();
});

// Randomize (desktop + mobile)
function randomizeColors(bgInput, textInput) {
  const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
  bgInput.value = randomColor();
  textInput.value = randomColor();
  updateColors(bgInput.value, textInput.value);

// ✅ Force editor sync
  const editor = document.getElementById("editor");
  if (editor) {
    editor.style.backgroundImage = "";
    editor.style.backgroundColor = bgInput.value;
    editor.style.color = textInput.value;
  }

  // ✅ Force phaseText sync
  const phaseText = document.getElementById("phaseText");
  if (phaseText) {
    phaseText.style.backgroundImage = "";
    phaseText.style.backgroundColor = bgInput.value;
    phaseText.style.color = textInput.value;
  }

}

document.getElementById("randomize").addEventListener("click", () => randomizeColors(bgPicker, textPicker));
document.getElementById("randomizeMobile").addEventListener("click", () => randomizeColors(bgPickerMobile, textPickerMobile));

// Save palette (desktop + mobile)
function savePalette() {
  const swatch = document.createElement("div");
  swatch.className = "swatch";
  swatch.style.background = document.body.style.background;
  swatch.dataset.bg = document.body.style.background;
  swatch.dataset.text = document.body.style.color;
  swatch.addEventListener("click", () => {
    document.body.style.background = swatch.dataset.bg;
    document.body.style.color = swatch.dataset.text;
    showCSS();
  });
  paletteContainer.appendChild(swatch);
}

document.getElementById("savePalette").addEventListener("click", savePalette);
document.getElementById("savePaletteMobile").addEventListener("click", savePalette);


      // Randomizer
      document.getElementById("randomize").addEventListener("click", () => {
        const randomColor = () =>
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        bgPicker.value = randomColor();
        textPicker.value = randomColor();
        updateColors();
      });

      // Show CSS snippet
      function showCSS() {
        cssOutput.textContent = `Background: ${document.body.style.background}  Text : ${document.body.style.color}`;
      }

      // Initialize
      updateColors();


 // Function to calculate relative luminance
    function luminance(r, g, b) {
      let a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    // Function to calculate contrast ratio
    function contrast(hex1, hex2) {
      function hexToRgb(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return [r, g, b];
      }
      let lum1 = luminance(...hexToRgb(hex1));
      let lum2 = luminance(...hexToRgb(hex2));
      let brightest = Math.max(lum1, lum2);
      let darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }


let ratioStart = contrast(textPicker.value, gradStart.value);
let ratioEnd = contrast(textPicker.value, gradEnd.value);
let worstRatio = Math.min(ratioStart, ratioEnd);

    function update() {
      
      let fg = document.getElementById("textColor").value;
      let bg = document.getElementById("bgColor").value;
      let ratio = contrast(fg, bg);
      let percent = (ratio / 21) * 100; // max contrast ratio is 21:1

      // Update circular progress bar
      document.getElementById("progress").setAttribute("stroke-dasharray", percent + ",100");
      document.getElementById("ratioText").textContent = ratio.toFixed(1) + ":1";

      // Show result text
      document.getElementById("result").textContent =
        "Contrast Ratio: " + ratio.toFixed(2) + " ( " + Math.round(percent) + "% of max )";


        
    }
    

    // Initial update
    update();

    // Event listeners
    document.getElementById("textColor").addEventListener("input", update);
    document.getElementById("bgColor").addEventListener("input", update);


 // DELETE AND SHARE SNAPSHOT BUTTONS
   const textarea = document.getElementById("editor");
const deleteBtn = document.getElementById("deleteText");
const shareBtn = document.getElementById("shareText");

// DELETE: clear text + reset styles
deleteBtn.addEventListener("click", () => {
  textarea.value = "";
  textarea.style.backgroundColor = "";
  textarea.style.color = "";
});

// SHARE SNAPSHOT: capture textarea as image
shareBtn.addEventListener("click", () => {
  const editor = document.getElementById("editor");

  html2canvas(editor, {
    backgroundColor: editor.style.backgroundColor || "#ffffff",
    useCORS: true
  }).then(canvas => {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "editor_snapshot.png";
    link.click();

    // Optional: share via navigator.share
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      canvas.toBlob(blob => {
        const file = new File([blob], "editor_snapshot.png", { type: "image/png" });
        navigator.share({
          files: [file],
          title: "Editor Snapshot",
          text: "Here is my editor-only snapshot!"
        });
      });
    }
  });
});


// dark colors options
      const darkColors = [
        "#000000",
        "#2F4F4F",
        "#4B0082",
        "#B8860B",
        "#8B0000",
        "#006400",
        "#2E8B57",
        "#C71585",
        "#FE1000",
        "#145A32",
        "#E6F000",
        "#2F3E12",
        "#6B6B6B",
        "#DAA520",
        "#A52A2A",
        "#4A4A4A",
        "#800000",
        "#004225",
        "#3D2B56",
        "#7F6000",
        "#8B008B",
        "#FFD700",
        "#DC143C",
      ];
// light colors options
      const lightColors = [
        "#ffffff",
        "#f9f9f9",
        "#f2f2f2",
        "#e6e6e6",
        "#dddddd",
        "#cccccc",
        "#bbbbbb",
        "#aaaaaa",
        "#FFFFFF",
        "#FFFAF0",
        "#FFFACD",
        "#E6E6FA",
        "#F0FFF0",
        "#F0FFFF",
        "#F5F5DC",
        "#FFE4E1",
        "#FFDAB9",
        "#FAFAD2",
        "#E0FFFF",
        "#F5FFFA",
        "#FFF0F5",
        "#F8F8FF",
        "#FFFFE0",
        "#F0F8FF",
      ];
// primary Colors  options
      const primaryColors = [
        "#FF0000", "#0000FF", "#FFFF00"
      ];
// secondary Colors optons
      const secondaryColors = [
        "#00FF00", "#FF7F00", "#8B00FF"
      ];
// tertiary Colors options
      const tertiaryColors = [
        "#FF4500",
        "#FFD700",
        "#ADFF2F",
        "#00CED1",
        "#4169E1",
        "#9932CC",
      ];
 // warm Colors options
      const warmColors = [
        "#FF0000", "#FF4500", "#FFA500", "#FFD700"
      ];
 // cool Colors options    
      const coolColors = 
      [
      "#0000FF",  /* Blue */
"#008080",  /* Teal */
"#00FFFF",  /* Cyan/Aqua */
"#008000",  /* Green */
"#40E0D0",  /* Turquoise */
"#6A5ACD",  /* Slate Blue */
"#7FFFD4",  /* Aquamarine */
"#4682B4",  /* Steel Blue */
"#5F9EA0",  /* Cadet Blue */
"#9370DB"   /* Medium Purple */
      ];
// neutral Colors  options
      const neutralColors = [
        "#FFFFFF",  /* White */
"#000000",  /* Black */
"#808080",  /* Gray */
"#C0C0C0",  /* Silver */
"#D3D3D3",  /* Light Gray */
"#A9A9A9",  /* Dark Gray */
"#F5F5DC",  /* Beige */
"#F5F5F5",  /* White Smoke */
"#E0E0E0",  /* Gainsboro */
"#D2B48C",  /* Tan */
"#8B4513",  /* Saddle Brown */
"#A0522D",  /* Sienna */
"#BC8F8F",  /* Rosy Brown */
"#708090",  /* Slate Gray */
"#2F4F4F"   /* Dark Slate Gray */

      ];
// pastel Colors options
      const pastelColors = [
       "#AEC6CF", "#FFB347", "#77DD77", "#F49AC2", "#CFCFC4",
"#B39EB5", "#FF6961", "#FFD1DC", "#CB99C9", "#FDFD96",
"#836953", "#966FD6", "#03C03C", "#779ECB", "#DEA5A4",
"#FFB7CE", "#E6E6FA", "#FFFACD", "#E0FFFF", "#D8BFD8",
"#F5DEB3", "#FAFAD2", "#E0EEE0", "#F0E68C", "#FFE4E1",
"#DDA0DD", "#B0E0E6", 
"#98FB98", "#FFEFD5", "#FFDAB9"

      ];
// earth Colors options
      const earthColors = [
       "#8B4513",  /* Saddle Brown */
"#A0522D",  /* Sienna */
"#D2B48C",  /* Tan */
"#DEB887",  /* Burly Wood */
"#F4A460",  /* Sandy Brown */
"#CD853F",  /* Peru */
"#B8860B",  /* Dark Goldenrod */
"#C19A6B",  /* Camel */
"#556B2F",  /* Dark Olive Green */
"#6B8E23",  /* Olive Drab */
"#808000",  /* Olive */
"#9ACD32",  /* Yellow Green */
"#BC8F8F",  /* Rosy Brown */
"#E9967A",  /* Dark Salmon */
"#8F9779"   /* Artichoke Green */

      ];
// ocean Colors options
      const oceanColors = [
        "#00CED1",  /* Dark Turquoise */
"#20B2AA",  /* Light Sea Green */
"#48D1CC",  /* Medium Turquoise */
"#5F9EA0",  /* Cadet Blue */
"#4682B4",  /* Steel Blue */
"#7FFFD4",  /* Aquamarine */
"#40E0D0",  /* Turquoise */
"#008080",  /* Teal */
"#0000CD",  /* Medium Blue */
"#1E90FF",  /* Dodger Blue */
"#87CEEB",  /* Sky Blue */
"#B0E0E6",  /* Powder Blue */
"#2E8B57",  /* Sea Green */
"#006994",  /* Ocean Blue */
"#66CDAA"   /* Medium Aquamarine */

      ];
// sunset Colors options
      const sunsetColors = [
        "#FF4500",  /* Orange Red */
"#FF6347",  /* Tomato */
"#FF7F50",  /* Coral */
"#FFD700",  /* Gold */
"#FFA500",  /* Orange */
"#FF69B4",  /* Hot Pink */
"#FF1493",  /* Deep Pink */
"#DB7093",  /* Pale Violet Red */
"#C71585",  /* Medium Violet Red */
"#800080",  /* Purple */
"#8B0000",  /* Dark Red */
"#DC143C",  /* Crimson */
"#FFB6C1",  /* Light Pink */
"#FF8C00",  /* Dark Orange */
"#E9967A"   /* Dark Salmon */

      ];
// floral Colors options
      const floralColors = [
        "#FF69B4",  /* Hot Pink - Rose */
"#FFB6C1",  /* Light Pink - Cherry Blossom */
"#FF1493",  /* Deep Pink - Dahlia */
"#DB7093",  /* Pale Violet Red - Peony */
"#C71585",  /* Medium Violet Red - Orchid */
"#9370DB",  /* Medium Purple - Lavender */
"#BA55D3",  /* Medium Orchid */
"#FFD700",  /* Gold - Sunflower */
"#FFFACD",  /* Lemon Chiffon - Daisy */
"#F0E68C",  /* Khaki - Marigold */
"#ADFF2F",  /* Green Yellow - Leafy Stem */
"#32CD32",  /* Lime Green - Fresh Leaves */
"#FF4500",  /* Orange Red - Hibiscus */
"#E9967A",  /* Dark Salmon - Tulip */
"#DC143C",  /* Crimson - Rose Petal */

      ];
// galaxy Colors options
      const galaxyColors = [
        "#0B3D91",  /* Deep Space Blue */
"#1A1A40",  /* Cosmic Indigo */
"#4B0082",  /* Indigo - Nebula */
"#800080",  /* Purple - Galaxy Core */
"#9932CC",  /* Dark Orchid - Star Cluster */
"#BA55D3",  /* Medium Orchid - Nebula Glow */
"#FF00FF",  /* Magenta - Cosmic Dust */
"#FF69B4",  /* Hot Pink - Stellar Glow */
"#FFD700",  /* Gold - Star Light */
"#FFFFFF",  /* White - Bright Stars */
"#000000",  /* Black - Space Void */
"#191970",  /* Midnight Blue - Deep Sky */
"#2E0854",  /* Dark Violet - Nebula Depth */
"#8A2BE2",  /* Blue Violet - Spiral Arms */
"#00FFFF"   /* Aqua - Starburst Glow */

      ];
// autumn Colors options
      const autumnColors = [
       "#FF8C00",  /* Dark Orange */
"#FFA500",  /* Orange */
"#FF4500",  /* Orange Red */
"#DC143C",  /* Crimson */
"#B22222",  /* Firebrick */
"#8B0000",  /* Dark Red */
"#CD853F",  /* Peru */
"#D2691E",  /* Chocolate */
"#A0522D",  /* Sienna */
"#8B4513",  /* Saddle Brown */
"#DEB887",  /* Burly Wood */
"#F4A460",  /* Sandy Brown */
"#B8860B",  /* Dark Goldenrod */
"#DAA520",  /* Goldenrod */
"#9ACD32",  /* Yellow Green */
      ];
// rainy Colors options
      const springColors=[
"#FFB6C1",  /* Light Pink - Cherry Blossom */
"#FFC0CB",  /* Pink - Spring Rose */
"#FFD700",  /* Gold - Daffodil */
"#FFFACD",  /* Lemon Chiffon - Daisy Petals */
"#ADFF2F",  /* Green Yellow - Fresh Grass */
"#7CFC00",  /* Lawn Green - New Leaves */
"#00FA9A",  /* Medium Spring Green */
"#87CEEB",  /* Sky Blue - Clear Spring Sky */
"#B0E0E6",  /* Powder Blue - Soft Breeze */
"#9370DB",  /* Medium Purple - Lilac Flowers */
"#BA55D3",  /* Orchid - Spring Bloom */
"#FF69B4",  /* Hot Pink - Tulip Petals */
"#F08080",  /* Light Coral - Blossoms */
"#E6E6FA",  /* Lavender - Spring Garden */
"#98FB98"   /* Pale Green - Fresh Shoots */


      ];
// rainy Colors options
      const rainyColors = [
"#708090",  /* Slate Gray - Rain Clouds */
"#778899",  /* Light Slate Gray - Mist */
"#A9A9A9",  /* Dark Gray - Heavy Clouds */
"#B0C4DE",  /* Light Steel Blue - Rainy Sky */
"#4682B4",  /* Steel Blue - Wet Atmosphere */
"#5F9EA0",  /* Cadet Blue - Damp Air */
"#2F4F4F",  /* Dark Slate Gray - Stormy Clouds */
"#87CEFA",  /* Light Sky Blue - Clear After Rain */
"#00CED1",  /* Dark Turquoise - Rain Reflection */
"#556B2F",  /* Dark Olive Green - Wet Leaves */
"#6B8E23",  /* Olive Drab - Rainforest Green */
"#E0FFFF",  /* Light Cyan - Water Droplets */
"#C0C0C0",  /* Silver - Shiny Wet Surface */
"#1E90FF",  /* Dodger Blue - Rainy Horizon */
"#468499"   /* Teal Blue - Rainy Mood */

      ];
// winter Colors options
      const winterColors = [
"#FFFFFF",  /* Snow White */
"#F0F8FF",  /* Alice Blue - Frosty Sky */
"#E0FFFF",  /* Light Cyan - Ice Glow */
"#B0C4DE",  /* Light Steel Blue - Winter Sky */
"#4682B4",  /* Steel Blue - Cold Breeze */
"#708090",  /* Slate Gray - Cloudy Winter */
"#2F4F4F",  /* Dark Slate Gray - Stormy Winter */
"#000080",  /* Navy - Deep Winter Night */
"#191970",  /* Midnight Blue - Winter Night Sky */
"#006400",  /* Dark Green - Pine Trees */
"#228B22",  /* Forest Green - Evergreen Foliage */
"#8B008B",  /* Dark Magenta - Winter Bloom */
"#9370DB",  /* Medium Purple - Frosty Twilight */
"#C0C0C0",  /* Silver - Frozen Surface */
"#DCDCDC"   /* Gainsboro - Soft Snow Mist */

      ];


      // Render Palette (grid style)
      function renderPalette(paletteId, colors) {
        const palette = document.getElementById(paletteId);
        palette.innerHTML = "";
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        for (let i = 0; i < colors.length; i += 4) {
          const row = document.createElement("tr");
          for (let j = i; j < i + 4 && j < colors.length; j++) {
            const cell = document.createElement("td");
            cell.style.width = "90px";
            cell.style.height = "90px";
            cell.style.background = colors[j];
            cell.style.border = "none";
            cell.title = colors[j];

            //  click handler 
cell.addEventListener("click", () => { 
  // Body update
  document.body.style.backgroundImage = "";   // clear gradient
  document.body.style.backgroundColor = colors[j]; 

  // ✅ Editor update
  const editor = document.getElementById("editor"); 
  if (editor) {
    editor.style.backgroundImage = "";        // clear gradient
    editor.style.backgroundColor = colors[j]; // apply plain color
  }

  // ✅ PhaseText update
  const phaseText = document.getElementById("phaseText");
  if (phaseText) {
    phaseText.style.backgroundImage = "";     // clear gradient
    phaseText.style.backgroundColor = colors[j];
  }

  // Sync picker
  const bgPicker = document.getElementById("bgColor");
  if (bgPicker) {
    bgPicker.value = colors[j];
  }

  // Contrast ratio update
  update();
});


            row.appendChild(cell);
          }
          table.appendChild(row);
        }
        palette.appendChild(table);
      } 
      
      // Close all palettes
      function closeAllPalettes() {
        document
          .querySelectorAll(".palette")
          .forEach((p) => p.classList.add("d-none"));
      } 
      
      // Attach toggle logic
    function attachToggle(btnId, paletteId, colors) {
  document.getElementById(btnId).addEventListener("click", function () {
    const palette = document.getElementById(paletteId);
    const isHidden = palette.classList.contains("d-none");
    closeAllPalettes();
    if (isHidden) {
      palette.classList.remove("d-none");
      renderPalette(paletteId, colors); // fresh render every time
    }
  });
}

      // Register all buttons with their palettes
      // method (ClassName , previewId, ObjectName)
      attachToggle("darkBtn", "darkPalette", darkColors);
      attachToggle("lightBtn", "lightPalette", lightColors);
      attachToggle("primaryBtn", "primaryPalette", primaryColors);
      attachToggle("secondaryBtn", "secondaryPalette", secondaryColors);
      attachToggle("tertiaryBtn", "tertiaryPalette", tertiaryColors);
      attachToggle("warmBtn", "warmPalette", warmColors);
      attachToggle("coolBtn", "coolPalette", coolColors);
      attachToggle("neutralBtn", "neutralPalette", neutralColors);
      attachToggle("pastelBtn", "pastelPalette", pastelColors);
      attachToggle("earthBtn", "earthPalette", earthColors);
      attachToggle("oceanBtn", "oceanPalette", oceanColors);
      attachToggle("sunsetBtn", "sunsetPalette", sunsetColors);
      attachToggle("floralBtn", "floralPalette", floralColors);
      attachToggle("galaxyBtn", "galaxyPalette", galaxyColors);
      attachToggle("autumnBtn", "autumnPalette", autumnColors);
      attachToggle("springBtn", "springPalette", springColors);
      attachToggle("rainyBtn", "rainyPalette", rainyColors);
      attachToggle("winterBtn", "winterPalette", winterColors);

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleBlindness");
  const closeBtn = document.getElementById("closeBlindness");
  const sidebar = document.getElementById("blindnessSidebar");
  const bgPicker = document.getElementById("bgColor");
  const textPicker = document.getElementById("textColor");
  const previews = document.querySelectorAll(".blind-preview");
  const phaseWindow = document.getElementById("phasePreviewWindow");
  const closePhaseBtn = document.getElementById("closePhasePreview");
  const phaseTitle = document.getElementById("phaseTitle");
  const phaseText = document.getElementById("phaseText");

  let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;

phaseWindow.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("resize-handle")) return; // skip if resizing
  isDragging = true;
  dragOffsetX = e.clientX - phaseWindow.offsetLeft;
  dragOffsetY = e.clientY - phaseWindow.offsetTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    phaseWindow.style.left = e.clientX - dragOffsetX + "px";
    phaseWindow.style.top = e.clientY - dragOffsetY + "px";
    phaseWindow.style.right = "auto"; // override right positioning
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

["n","s","e","w"].forEach(dir => {
  const handle = document.createElement("div");
  handle.className = "resize-handle " + dir;
  phaseWindow.appendChild(handle);

  handle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = phaseWindow.offsetWidth;
    const startHeight = phaseWindow.offsetHeight;
    const startLeft = phaseWindow.offsetLeft;
    const startTop = phaseWindow.offsetTop;

    function onMouseMove(ev) {
      if (dir === "e") phaseWindow.style.width = startWidth + (ev.clientX - startX) + "px";
      if (dir === "w") {
        phaseWindow.style.width = startWidth - (ev.clientX - startX) + "px";
        phaseWindow.style.left = startLeft + (ev.clientX - startX) + "px";
      }
      if (dir === "s") phaseWindow.style.height = startHeight + (ev.clientY - startY) + "px";
      if (dir === "n") {
        phaseWindow.style.height = startHeight - (ev.clientY - startY) + "px";
        phaseWindow.style.top = startTop + (ev.clientY - startY) + "px";
      }
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});



  // Sidebar toggle
toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  phaseWindow.classList.add("active");   // preview window bhi show ho
  phaseWindow.style.right = "10%";       // reposition visible
});
  closeBtn.addEventListener("click", () => sidebar.classList.remove("active"));

  // Update sidebar previews
  function updateBlindPreviews() {
    previews.forEach(box => {
      box.style.backgroundColor = bgPicker.value;
      box.style.color = textPicker.value;
    });

    // Filters
    document.getElementById("vision-deuteranomaly").style.filter = "contrast(1.2) saturate(0.8)";
    document.getElementById("vision-protanomaly").style.filter = "contrast(1.1) saturate(0.7)";
    document.getElementById("vision-deuteranopia").style.filter = "grayscale(0.5) sepia(0.6)";
    document.getElementById("vision-protanopia").style.filter = "grayscale(0.6) sepia(0.7)";
    document.getElementById("vision-tritanomaly").style.filter = "hue-rotate(90deg) saturate(0.7)";
    document.getElementById("vision-tritanopia").style.filter = "hue-rotate(120deg) saturate(0.6)";
    document.getElementById("vision-mono").style.filter = "grayscale(100%)";
  }

  updateBlindPreviews();
  bgPicker.addEventListener("input", updateBlindPreviews);
  textPicker.addEventListener("input", updateBlindPreviews);

  // Click on phase → open right-side preview
  previews.forEach(box => {
    box.addEventListener("click", function () {
      phaseTitle.textContent = box.textContent + " Preview";
      phaseText.style.backgroundColor = bgPicker.value;
      phaseText.style.color = textPicker.value;
      phaseText.style.filter = box.style.filter;
      phaseWindow.classList.add("active");
    });
  });

  // Close preview
closePhaseBtn.addEventListener("click", () => {
  phaseWindow.style.left = "";
  phaseWindow.style.top = "";
  phaseWindow.style.width = "80%";
  phaseWindow.style.height = "80%";
  phaseWindow.style.right = "-90%"; // back to hidden
  phaseWindow.classList.remove("active");
});
});
document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");

  // Force plain text paste
editor.addEventListener("paste", function(e) {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData("text/plain");
  document.execCommand("insertText", false, text);
});


  // DELETE
  document.getElementById("deleteText").addEventListener("click", () => {
    editor.innerHTML = "";   // clear contenteditable div
    editor.removeAttribute("style"); // reset styles
  });

  // SHARE SNAPSHOT (keep your html2canvas logic, but use editor.innerHTML instead of textarea.value)

  // Bold
  document.getElementById("btnBold").addEventListener("click", () => {
    document.execCommand("bold");
  });

  // Italic
  document.getElementById("btnItalic").addEventListener("click", () => {
    document.execCommand("italic");
  });

  // Underline
  document.getElementById("btnUnderline").addEventListener("click", () => {
    document.execCommand("underline");
  });

  // Caps toggle (applies to whole div)
  document.getElementById("btnCaps").addEventListener("click", () => {
    editor.style.textTransform =
      editor.style.textTransform === "uppercase" ? "none" : "uppercase";
  });

  // Undo / Redo
  document.getElementById("btnUndo").addEventListener("click", () => {
    document.execCommand("undo");
  });
  document.getElementById("btnRedo").addEventListener("click", () => {
    document.execCommand("redo");
  });

  //object for  fontFamilies
const fontFamilies = [
  "Arial", "Verdana", "Tahoma", "Trebuchet MS", "Times New Roman",
  "Georgia", "Garamond", "Courier New", "Lucida Console", "Impact",
  "Comic Sans MS", "Palatino Linotype", "Book Antiqua", "Candara",
  "Segoe UI", "Helvetica", "Franklin Gothic Medium", "Century Gothic",
  "Gill Sans", "Optima", "Monaco", "Brush Script MT", "Futura",
  "Rockwell", "Baskerville", "Copperplate", "Didot"
];

// apply the font family
  const fontSelect = document.getElementById("fontSelect");
fontFamilies.forEach(font => {
  const option = document.createElement("option");
  option.value = font;
  option.textContent = font;
  option.style.fontFamily = font; // preview in dropdown
  fontSelect.appendChild(option);
});

  //select the Font 
  document.getElementById("fontSelect").addEventListener("change", (e) => {
    document.execCommand("fontName", false, e.target.value);
  });

  // font size
const fontSizes = [
  "8", "10", "12", "14", "16", "18", "20", "22", "24",
  "28", "32", "36", "40", "44", "48", "52", "60", "72",
  "84", "96", "108", "120", "144", "160", "180", "200",
  "220", "240", "260", "280"
];

// apply the font size
const fontSizeSelect = document.getElementById("fontSizeSelect");
fontSizes.forEach(size => {
  const option = document.createElement("option");
  option.value = size;
  option.textContent = size + "px";   // just label
  fontSizeSelect.appendChild(option);
});

fontSizeSelect.addEventListener("change", (e) => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = e.target.value + "px";
    range.surroundContents(span);
  }
});


  // Font Size (execCommand only supports 1–7)
  document.getElementById("fontSizeSelect").addEventListener("change", (e) => {
    document.execCommand("fontSize", false, e.target.value);
  });

  // Alignment
  document.getElementById("alignSelect").addEventListener("change", (e) => {
    if (e.target.value === "left") document.execCommand("justifyLeft");
    if (e.target.value === "center") document.execCommand("justifyCenter");
    if (e.target.value === "right") document.execCommand("justifyRight");
    if (e.target.value === "justify") document.execCommand("justifyFull");
  });
});
const toggleBtn = document.getElementById("toggleBar");
const toolbar = document.getElementById("textActions");

toggleBtn.addEventListener("click", () => {
  toolbar.classList.toggle("active");
  body.classList.toggle("bar-active");

  // Change icon
  if (toolbar.classList.contains("active")) {
    toggleBtn.innerHTML = '<i class="fas fa-angle-left"></i>'; // less than
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-angle-right"></i>'; // greater than
  }
});
// Toggle for mobile/mid screens
document.getElementById("toggleRightPartMobile").addEventListener("click", function () {
  const rightPart = document.querySelector(".rightPart");
  rightPart.classList.toggle("active");
});
