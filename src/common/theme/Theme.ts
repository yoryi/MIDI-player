export interface Theme {
  font: string
  canvasFont: string
  themeColor: string
  backgroundColor: string
  secondaryBackgroundColor: string
  dividerColor: string
  textColor: string
  secondaryTextColor: string
  tertiaryTextColor: string
  pianoKeyBlack: string
  pianoKeyWhite: string
  pianoBlackKeyLaneColor: string
  ghostNoteColor: string
  recordColor: string
  shadowColor: string
  highlightColor: string
  greenColor: string
  redColor: string
  yellowColor: string
}

export const defaultTheme: Theme = {
  font: "Inter, -apple-system, BlinkMacSystemFont, Avenir, Lato",
  canvasFont: "'titillium web', sans-serif",
  themeColor: "hsl(230, 70%, 55%)",
  textColor: "#ffffff",
  secondaryTextColor: "#000",
  tertiaryTextColor: "#5a6173",
  dividerColor: "rgba(0, 0, 0, 0.1)",
  backgroundColor: "#5A5A5A",
  secondaryBackgroundColor: "hsl(227, 16%, 22%)",
  pianoKeyBlack: "#272a36",
  pianoKeyWhite: "#fbfcff",
  pianoBlackKeyLaneColor: "hsl(228, 16%, 15%)",
  ghostNoteColor: "#444444",
  recordColor: "#dd3c3c",
  shadowColor: "rgba(0, 0, 0, 0.2)",
  highlightColor: "#8388a51a",
  greenColor: "#31DE53",
  redColor: "#DE5267",
  yellowColor: "#DEB126",
}
