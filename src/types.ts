export interface FloatingHeart {
  id: string;
  x: number; // percentage width 0 - 100
  size: number; // in pixels
  speed: number; // duration of translation in seconds
  delay: number; // animation delay
  scale: number;
}

export interface SorryTranslation {
  id: string;
  text: string;
  language: string;
  x: number; // percentage x (offset from center)
  y: number; // percentage y (offset from center)
  delay: number;
  rotation: number;
  scale: number;
}
