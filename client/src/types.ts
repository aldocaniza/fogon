// Types for Fogón narrative game

export interface Scene {
  id: string;
  title: string;
  body: string;
  mood: "ominous" | "curious" | "calm" | "urgent";
  choices: Choice[];
}

export interface Choice {
  target: string; // id of the scene to navigate to
  preview: string; // text shown to the player
  requires?: Record<string, boolean>; // flags required to show this choice
  sets?: Record<string, boolean>; // flags to set when this choice is taken
}

export interface GameState {
  currentScene: string;
  flags: Record<string, boolean>;
  phase: "loading" | "revealing" | "choosing" | "epilogue";
  history: string[]; // visited scene ids
}
