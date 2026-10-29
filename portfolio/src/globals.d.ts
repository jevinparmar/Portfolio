/// <reference types="vite/client" />

declare global {
  interface Window {
    __PRELOADER_ACTIVE__?: boolean
    THREE?: any
    VANTA?: {
      FOG: (options: any) => any
      [key: string]: any
    }
  }
}

export {}
