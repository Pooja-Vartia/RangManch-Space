# RangManch-Space
A creative playground for experimenting with color contrasts. Easily generate and test text colors, background shades, and gradient combinations to design accessible and visually appealing interfaces.

# RangManch-Space
Description : CloudColors Dashboard
  A creative playground and responsive dashboard for testing color contrast and accessibility with blindness mode previews and text       formatting tools.
- Test color contrast ratios for accessibility compliance.
- Preview text in different **color blindness modes**.
- Format text with a responsive toolbar (bold, italic, underline, caps, alignment).
- Apply background/foreground colors, gradients, and random palettes.
- Save and reuse custom palettes.

## Features
- Responsive design for mobile, tablet, and desktop
- Eye toggler for RightPart sidebar
- Preview window for blindness modes
- Toolbar with text formatting actions
- Color palettes and randomizer

 # User Flow 
        HEADER --
                |
        r1(a) → Dashboard Logo
        r1(b) → TextActions Toolbar
                 ├── Delete
                 ├── Save
                 ├── Bold
                 ├── Italic
                 ├── Underline
                 ├── CapsLock
                 ├── Undo / Redo
                 ├── FontFamily
                 ├── FontSize
                 └── Alignment

        SUBHEADER ----
                |
        r2(a) → Carousel Slides Dropdowns
                 ├── Dark Colors
                 ├── Light Colors
                 ├── Primary Colors
                 ├── Secondary Colors
                 ├── Tertiary Colors
                 ├── Warm Colors
                 ├── Cool Colors
                 ├── Neutral / Pastel / Earth / Ocean / Sunset / Floral / Galaxy / Autumn / Spring / Rainy / Winter

        MAIN DASHBOARD ---
                |
        r3(a) → Left Column
                 ├── Background Color Picker
                 ├── Foreground Color Picker
                 ├── Gradient Start & End Picker
                 ├── Apply Gradient Button
                 ├── Result Display (RGB, HEX, HSL)
        r3(b) → Middle Column
                 ├── TextArea Space
                 ├── Live Color Contrast Checker
        r3(c) → Right Column
                 ├── Blindness Mode (7 Phases)
                 ├── Preview Window for Each Phase
                 ├── SVG Contrast Ratio Illustration
                 ├── Randomize Button
                 └── Save Palette Option


## Installation
```bash
git clone https://github.com/Pooja-Vartia/RangManch-Space.git
cd RangManch-Space

