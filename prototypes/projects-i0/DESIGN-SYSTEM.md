# Design System Rules

## Spacing

- **All spacing uses the 5px grid.** Use `--space-xxxs` through `--space-xxxl` exclusively.
- **No magic numbers.** No `padding: 12px` or `gap: 7px`. If it's not on the grid, it doesn't ship.
- **Exception:** Only with explicit logic and permission (e.g., optical alignment, icon sizing, border widths). Document the reason in a comment.

## Border Radius

- **Use `--radius-s`, `--radius-m`, or `--radius-l`** from `styles/radius.css`.
- **Exception:** `border-radius: 50%` for circles (avatars, status dots) is fine.

## Colors

- **All colors use CSS variables** from `styles/colors.css`.
- **No hex/rgb values in components.** If you need a new color, add it to the system first.

## Icons

- **Use `@wordpress/icons`** via the `WPIcon` component.
- **No inline SVGs** unless the icon doesn't exist in the WP set.
