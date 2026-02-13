# Design System Rules

## Spacing

- **All spacing uses the 5px grid.** Use `--space-xxxs` through `--space-xxxl` exclusively.
- **No magic numbers.** No `padding: 12px` or `gap: 7px`. If it's not on the grid, it doesn't ship.
- **Exception:** Only with explicit logic and permission (e.g., optical alignment, icon sizing, border widths). Document the reason in a comment.

### Scale

| Token          | Value |
|----------------|-------|
| `--space-xxxs` | 5px   |
| `--space-xxs`  | 10px  |
| `--space-xs`   | 15px  |
| `--space-s`    | 20px  |
| `--space-m`    | 25px  |
| `--space-l`    | 30px  |
| `--space-xl`   | 40px  |
| `--space-xxl`  | 50px  |
| `--space-xxxl` | 60px  |

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

## Layout Utilities

Global utility classes in `styles/layout.css`. Use these instead of writing `display: flex` in component styles.

### Stacks

| Class    | Effect                                           |
|----------|--------------------------------------------------|
| `.hstack` | `display: flex; align-items: center`             |
| `.vstack` | `display: flex; flex-direction: column`          |

### Gap

Maps directly to space tokens:

`.gap-xxxs` · `.gap-xxs` · `.gap-xs` · `.gap-s` · `.gap-m` · `.gap-l` · `.gap-xl` · `.gap-xxl` · `.gap-xxxl`

### Justify

`.justify-start` · `.justify-center` · `.justify-end` · `.justify-between`

### Align

`.align-start` · `.align-center` · `.align-end` · `.align-stretch`

**Note:** `.hstack` defaults to `align-items: center`. Use `.align-stretch` when children should fill the cross axis (e.g., `app-body` needing full-height sidebar and frame).

### Flex Sizing

| Class      | Effect             |
|------------|--------------------|
| `.flex-1`   | `flex: 1`          |
| `.flex-none` | `flex: none`       |
| `.shrink-0`  | `flex-shrink: 0`   |
| `.min-w-0`   | `min-width: 0`     |

### Wrap

`.flex-wrap` · `.flex-nowrap`

### Overflow

`.overflow-hidden` · `.overflow-auto`

### Dimensions

`.w-full` · `.h-full`

### Usage Pattern

Combine utility classes on the element, keep component-specific styles (colors, borders, transitions) in scoped CSS:

```html
<div class="sidebar vstack shrink-0">
<div class="app-body hstack align-stretch gap-xs flex-1 min-w-0">
<div class="project-list-item hstack gap-xs">
```

## Components

### Button
- **Props:** `variant` (primary/secondary/tertiary), `surface` (light/dark), `size` (default/small), `width` (hug/full), `icon`, `label`
- Icon-only buttons auto-square to match height
- Surface controls color scheme, not a separate variant
- Button keeps its own inline-flex styles (not converted to utilities) because `inline-flex` + `justify-content: center` doesn't map to hstack/vstack

### Panel (planned)
- Reserved for future panel/resizable layout system

### ProjectListItem
- **Props:** `name` (string), `favicon` (string URL), `status` (stopped/loading/running), `active` (boolean)
- **Events:** `select`, `toggle`
- Single sidebar row: favicon + name + status indicator
- Uses `hstack gap-xs` for layout, `flex-1 min-w-0` on name for truncation

### Sidebar
- **Structure:** heading + project list + footer with add button
- Uses `vstack shrink-0` for vertical layout
- Fixed width: 210px (42 grid units)
- Project list uses `vstack gap-xxxs flex-1 overflow-auto` for scrollable list

### StatusIndicator
- **Props:** `status` (stopped/loading/running)
- **Events:** `toggle`
- Uses single-element `clip-path` morphing for smooth shape transitions
- Stopped: grey circle → green play triangle on hover
- Running: green circle → red stop square on hover
- Loading: spinning blue ring (not interactive)
- Fixed container size (`--space-m`) regardless of inner shape

### Titlebar
- **Regions:** `titlebar-start` (traffic lights), `titlebar-center` (app title), `titlebar-end` (settings/help)
- Center is absolutely positioned for true centering regardless of start/end widths
- All regions use `hstack` utility for alignment
- `-webkit-app-region: drag` on titlebar, `no-drag` on interactive regions
- Traffic lights: 12px circles (OS-native size — intentional exception)

### WPIcon
- **Props:** `icon` (from @wordpress/icons), `size` (number, default 24)
- Resolves React element trees to native SVG for Vue compatibility
