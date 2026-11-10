import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let visible = false

    const move = (e) => {
      if (!visible) { visible = true; gsap.set([dot, ring], { opacity: 1 }) }
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' })
    }
    const grow = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.3, duration: 0.2 })
    }
    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button')) grow()
      else shrink()
    })

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed',top:0,left:0,width:5,height:5,borderRadius:'50%',
        background:'var(--fg)',pointerEvents:'none',zIndex:9999,
        transform:'translate(-50%,-50%)',opacity:0,mixBlendMode:'multiply' }} />
      <div ref={ringRef} style={{ position:'fixed',top:0,left:0,width:28,height:28,borderRadius:'50%',
        border:'1.5px solid var(--muted)',pointerEvents:'none',zIndex:9999,
        transform:'translate(-50%,-50%)',opacity:0,mixBlendMode:'multiply' }} />
    </>
  )
}
