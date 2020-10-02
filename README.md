# GAZSIAFTER THEME
Paperdeer website theme based on Gazsiafter's animation video design. Created by norbertgogibiro, 2020 September.

## EDITING THEMES
### HOW TO ADD NEW THEME?
1. Create a new SASS (.scss) file in */src/styles/themes* with ***"_theme"*** prefix (e.g. ***"_theme-new.scss"***) and follow the structure of the other theme files - perhaps the easiest way is to copy an existing theme file and modify the color values as you wish.
2. Although you can use custom HEX, RGB or RGBA values, it is recommended to use value variables imported from *"/src/styles/settings.scss"*.
3. Import your new theme file in */src/styles/themes/index.scss*, using the ***@use*** directive. You can omit the underscore prefix and the filename extension. Assign your import to a namespace so you can refer to your ***$export*** variable in the following step.
4. Add a new entry to the ***$theme-exports*** array. Use a key that matches the class name which will be added to the theme wrapper div by Javascript. Then use the ***$export*** variable referred from your namespace, just like the previous entries (e.g. ***"theme-new": themeNew.$export***)
5. Add the class name to the Javascript file that changes the theme wrapper's class name (which one? needs more explanation)
