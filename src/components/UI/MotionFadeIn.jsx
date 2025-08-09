import React, { useEffect, useMemo, useState } from 'react';

export default function MotionFadeIn({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    yOffset = 12,
    once = true,
}) {
    const [fm, setFm] = useState(null);

    useEffect(() => {
        let cancelled = false;
        import('framer-motion').then(mod => {
            if (!cancelled) setFm(mod);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    const style = useMemo(
        () => ({
            transition: 'opacity 300ms ease, transform 300ms ease',
        }),
        []
    );

    if (!fm) {
        // Fallback: simple CSS fade-in without JS observers
        return (
            <div
                className={`opacity-0 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 translate-y-3 ${className}`}
                style={style}
                data-inview="true"
            >
                {children}
            </div>
        );
    }

    const MotionDiv = (fm.m && fm.m.div) || (fm.motion && fm.motion.div);
    const LazyMotion = fm.LazyMotion;
    const domAnimation = fm.domAnimation;
    return (
        <LazyMotion features={domAnimation} strict>
            <MotionDiv
                className={className}
                initial={{ opacity: 0, y: yOffset }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once }}
                transition={{ delay, duration, ease: 'easeOut' }}
            >
                {children}
            </MotionDiv>
        </LazyMotion>
    );
}
