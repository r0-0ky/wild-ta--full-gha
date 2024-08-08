export interface ClickProps {
  value: number
  clickSettings: { id: number, x: number, y: number }
  handleAnimationEnd: (id: number) => void
}