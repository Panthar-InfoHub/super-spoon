'use client'
import Lenis from 'lenis'
import React, { useEffect } from 'react'

const LenisDiv = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.1 });

        // Use requestAnimationFrame to continuously update the scroll
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default LenisDiv
