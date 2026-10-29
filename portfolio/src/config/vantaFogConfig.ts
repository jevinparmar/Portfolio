/**
 * =======================================================================
 * VANTA.JS FOG BACKGROUND CONFIGURATION
 * =======================================================================
 * 
 * Customize the full-screen background fog colors and animation parameters right here!
 * 
 * HOW TO CHANGE COLORS:
 * - Colors use hex format: 0xRRGGBB (e.g., 0xc8ff00 is lime, 0xffc300 is yellow, 0x080808 is dark black).
 * - You can switch to any of the ready-made PRESETS below by changing `activeVantaFogConfig`,
 *   OR tweak individual colors directly.
 * 
 * PARAMETERS:
 * - highlightColor: Brightest crests of the fog
 * - midtoneColor:   Primary body of the smoke clouds
 * - lowlightColor:  Deep shadow areas within the fog
 * - baseColor:      Backdrop atmosphere color
 * - blurFactor:     Softness/diffusion of the smoke (0.1 = sharp, 0.9 = ultra-diffused, default: 0.6)
 * - zoom:           Camera scale / cloud size (0.5 to 3.0, default: 1.0)
 * - speed:          Speed of the fluid drift (0.5 = calm/ambient, 2.0 = fast, default: 1.0)
 * - opacity:        Canvas layer opacity (0.1 to 1.0, default: 0.95)
 */

export interface VantaFogOptions {
  highlightColor: number
  midtoneColor: number
  lowlightColor: number
  baseColor: number
  blurFactor: number
  zoom: number
  speed: number
  opacity?: number
}

export const VANTA_FOG_PRESETS: Record<string, VantaFogOptions> = {
  /**
   * 1. BLACK & PURPLE (ACTIVE PORTFOLIO THEME)
   * Deep obsidian black backdrop paired with radiant electric violet highlights
   * and rich royal purple smoke bodies.
   */
  blackPurple: {
    highlightColor: 0xa855f7, // Electric violet / neon purple
    midtoneColor: 0x4c1d95,   // Royal purple smoke clouds
    lowlightColor: 0x18042b,  // Dark plum shadow smoke
    baseColor: 0x060209,      // Deep obsidian black backdrop
    blurFactor: 0.6,
    zoom: 1.0,
    speed: 1.0,
    opacity: 0.95,
  },

  /**
   * 2. CYBER LIME
   * Classic cyber lime and dark obsidian.
   */
  cyberLime: {
    highlightColor: 0xc8ff00, // Electric lime
    midtoneColor: 0x1f2e08,   // Deep mossy emerald undertone
    lowlightColor: 0x0c1406,  // Dark shadow smoke
    baseColor: 0x080808,      // Deep obsidian backdrop
    blurFactor: 0.6,
    zoom: 1.0,
    speed: 1.0,
    opacity: 0.95,
  },

  /**
   * 2. VIBRANT SUNSET (EXACT DEMO COLORS FROM YOUR SCREENSHOT & VIDEO)
   * The original color combination from your screenshot:
   * Yellow (0xffc300), Red (0xff1f00), Blue/Purple (0x2d00ff), Pink-White (0xffebeb)
   */
  vibrantSunset: {
    highlightColor: 0xffc300,
    midtoneColor: 0xff1f00,
    lowlightColor: 0x2d00ff,
    baseColor: 0xffebeb,
    blurFactor: 0.6,
    zoom: 1.0,
    speed: 1.0,
    opacity: 0.85,
  },

  /**
   * 3. DARK SUNSET GLOW
   * Warm golden amber & crimson sunset clouds on a dark obsidian base.
   * Brings the warm fiery sunset feel from your demo into a dark theme.
   */
  darkSunset: {
    highlightColor: 0xffc300,
    midtoneColor: 0xe63946,
    lowlightColor: 0x240046,
    baseColor: 0x0a0708,
    blurFactor: 0.6,
    zoom: 1.0,
    speed: 1.0,
    opacity: 0.9,
  },

  /**
   * 3. COSMIC AURORA
   * Atmospheric dark space with deep cyan & emerald celestial nebulae.
   */
  cosmicAurora: {
    highlightColor: 0x2dd4bf,
    midtoneColor: 0x0f2424,
    lowlightColor: 0x07111a,
    baseColor: 0x06080d,
    blurFactor: 0.65,
    zoom: 1.1,
    speed: 1.0,
    opacity: 0.9,
  },

  /**
   * 4. DARK MONOCHROME
   * Minimalist Awwwards-style grayscale liquid smoke.
   */
  darkMonochrome: {
    highlightColor: 0x444444,
    midtoneColor: 0x222222,
    lowlightColor: 0x111111,
    baseColor: 0x080808,
    blurFactor: 0.7,
    zoom: 0.9,
    speed: 0.8,
    opacity: 0.85,
  },

  /**
   * 5. NEON CYBERPUNK
   * Deep midnight with vibrant neon purple, magenta, and cyan highlights.
   */
  neonCyberpunk: {
    highlightColor: 0x00f0ff,
    midtoneColor: 0x7928ca,
    lowlightColor: 0x180033,
    baseColor: 0x07000d,
    blurFactor: 0.6,
    zoom: 1.0,
    speed: 1.0,
    opacity: 0.9,
  },
}

/**
 * =======================================================================
 * ACTIVE CONFIGURATION:
 * Change this object to switch presets or customize any value!
 *
 * Example: To use the Vibrant Sunset demo colors, simply change to:
 *   export const activeVantaFogConfig: VantaFogOptions = VANTA_FOG_PRESETS.vibrantSunset
 * =======================================================================
 */
export const activeVantaFogConfig: VantaFogOptions = {
  ...VANTA_FOG_PRESETS.blackPurple,
}
