import { Controller } from '@hotwired/stimulus'
import { useTransition } from 'stimulus-use'

export default class extends Controller {
  menuTarget: HTMLElement
  toggleTransition: (event?: Event) => void
  leave: (event?: Event) => void
  transitioned: false

  static targets = ['menu']

  connect (): void {
    useTransition(this, {
      element: this.menuTarget
    })
  }

  toggle ({
    target
  }: {
    target: HTMLInputElement
  }): void {
    this.toggleTransition()
    this.updateMenuPosition(target.offsetHeight)
  }

  updateMenuPosition (menuOffsetHeight: number): void {
    const menuRect = this.menuTarget.getBoundingClientRect()

    if (menuRect.left < 0) {
      this.hangLeft()
    }
    else if (menuRect.right > window.innerWidth) {
      this.hangRight()
    }

    if (menuRect.top < 0) {
      this.hangTop(menuOffsetHeight)
    }
    else if (menuRect.bottom > window.innerHeight) {
      this.hangBottom(menuOffsetHeight)
    }
  }

  hangLeft (): void {
    this.menuTarget.classList.add('left-0')
    this.menuTarget.classList.remove('right-0')
  }
  hangRight (): void {
    this.menuTarget.classList.add('right-0')
    this.menuTarget.classList.remove('left-0')
  }
  hangBottom (buttonHeight: number): void {
    this.menuTarget.style.bottom = `${buttonHeight + 10}px`;
  }
  hangTop (buttonHeight: number): void {
    this.menuTarget.style.top = `${buttonHeight + 10}px`;
  }

  hide (event: Event): void {
    const node = event.target as Node
    if (!this.element.contains(node) && !this.menuTarget.classList.contains('hidden')) {
      this.leave()
    }
  }
}
