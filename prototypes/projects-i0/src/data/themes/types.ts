export interface ColorPaletteEntry {
  slug: string
  name: string
  hex: string
}

export interface ColorSettings {
  palette: ColorPaletteEntry[]
  background: string
  text: string
}

export interface SiteTheme {
  name: string
  settings: {
    color: ColorSettings & {
      defaultMode?: 'light' | 'dark'
      modes?: {
        dark?: ColorSettings
        light?: ColorSettings
      }
    }
    typography: {
      fontFamily: {
        heading: string
        body: string
      }
      fontSize: {
        small: string
        medium: string
        large: string
        xlarge: string
        hero: string
      }
      lineHeight: {
        tight: string
        normal: string
      }
    }
    spacing: {
      unit: string
      scale: number[]
    }
    layout: {
      contentWidth: string
      wideWidth: string
    }
  }
}
