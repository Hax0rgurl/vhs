# Performance Rationale: Synchronous Layout Thrashing

## The Problem
In `src/pages/_app.tsx:12`, the `useEffect` hook performs the following operations synchronously:
1. `getComputedStyle(document.documentElement)` - Reads layout information from the DOM.
2. `document.documentElement.classList.add(...)` - Writes back to the DOM, invalidating the current layout.

This sequence of Read-then-Write within the same synchronous block causes the browser to forcefully calculate the layout synchronously (a forced synchronous layout). If other code were to read again, or if this happens repeatedly, it leads to "layout thrashing." This blocks the main thread, delaying rendering and making the page feel sluggish, especially during initialization when a lot of DOM manipulation is happening.

## Why We Can't Easily Benchmark This Here
Layout thrashing is a browser-rendering-engine-specific issue (e.g., Blink, WebKit, Gecko). In our Node.js environment or standard server-side test environments (like jsdom), the actual layout and painting pipeline doesn't exist. There is no true rendering thread to block. Thus, writing a meaningful automated benchmark that runs in Node.js to prove a reduction in layout time is technically infeasible.

## The Optimization
We can avoid forcing a synchronous layout by decoupling the Read and the Write. We read the computed style immediately, but we defer the DOM write (`classList.add`) using `requestAnimationFrame`.

`requestAnimationFrame` schedules our DOM modification to occur right before the browser's next repaint. By the time this callback runs, the browser has already finished processing other JavaScript tasks for this frame, grouping our style change with the next natural rendering cycle and preventing synchronous layout recalculation in the middle of our script execution.
