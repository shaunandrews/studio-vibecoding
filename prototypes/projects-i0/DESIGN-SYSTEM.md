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
- **Status colors are distinct from traffic light colors.** Running green (`#4ab866`) ≠ maximize green (`#28c840`). Stop-hover red (`#e65054`) ≠ close red (`#ff5f57`).

## Icons

- **Use `@wordpress/icons`** via the `WPIcon` component.
- **No inline SVGs** unless the icon doesn't exist in the WP set.

## Components

### Button
- **Props:** `variant` (primary/secondary/tertiary), `surface` (light/dark), `size` (default/small), `width` (hug/full), `icon`, `label`
- Icon-only buttons auto-square to match height
- Surface controls color scheme, not a separate variant

### StatusIndicator
- **Props:** `status` (stopped/loading/running)
- **Events:** `toggle`
- Uses single-element `clip-path` morphing for smooth shape transitions
- Stopped: grey circle → green play triangle on hover
- Running: green circle → red stop square on hover
- Loading: spinning blue ring (not interactive)
- Fixed container size (`--space-m`) regardless of inner shape

### WPIcon
- **Props:** `icon` (from @wordpress/icons), `size` (number, default 24)
- Resolves React element trees to native SVG for Vue compatibility
