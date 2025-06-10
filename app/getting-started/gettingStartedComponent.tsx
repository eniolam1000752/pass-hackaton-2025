'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVoice } from '@humeai/voice-react';

const features = [
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow-md">
        {/* Lightning bolt icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path d="M13 2L3 14h7v8l8-12h-7z" fill="#7B61FF" />
        </svg>
      </span>
    ),
    title: 'Buy and swap tokens instantly with simple commands',
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow-md">
        {/* Checkmark in heart icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 21s-6.5-4.35-9-8.5C.5 8.5 3.5 5 7 5c1.74 0 3.41 1.01 4.13 2.44C12.59 6.01 14.26 5 16 5c3.5 0 6.5 3.5 4 7.5C18.5 16.65 12 21 12 21z"
            fill="#7B61FF"
          />
          <path
            d="M9.5 12.5l2 2 3-3"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    ),
    title: 'Get market insights to make informed decisions',
  },
  {
    icon: (
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 shadow-md">
        {/* Dots and lines icon */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="2" fill="#7B61FF" />
          <circle cx="18" cy="6" r="2" fill="#7B61FF" />
          <circle cx="6" cy="18" r="2" fill="#7B61FF" />
          <circle cx="18" cy="18" r="2" fill="#7B61FF" />
          <rect x="11" y="5" width="2" height="14" rx="1" fill="#7B61FF" />
          <rect x="5" y="11" width="14" height="2" rx="1" fill="#7B61FF" />
        </svg>
      </span>
    ),
    title: 'Approve each action while your agent does the heavy lifting.',
  },
];

export function GettingStartedPage() {
  const { status, connect } = useVoice();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
    >
      <motion.div
        className="w-full max-w-md mx-auto flex flex-col items-center relative"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.4,
          type: 'spring',
          stiffness: 90,
        }}
      >
        {/* Back arrow */}
        <div className="w-full flex items-center">
          <motion.button
            aria-label="Back"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            style={{ position: 'absolute', left: 16, top: 24 }}
            whileTap={{ scale: 0.92 }}
            whileHover={{
              scale: 1.08,
              backgroundColor: 'rgba(123,97,255,0.08)',
            }}
            onClick={() => window.history.back()}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <motion.path
                d="M15 18l-6-6 6-6"
                stroke="#7B61FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </svg>
          </motion.button>
        </div>
        {/* Title */}
        <motion.h1
          className="mt-16 text-2xl md:text-3xl font-bold text-center text-[#3a2d7d] drop-shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Ready to launch your <br />
          <span className="text-[#7B61FF] bg-gradient-to-r from-[#7B61FF] to-[#5AD6FF] bg-clip-text text-transparent">
            personal assistant?
          </span>
        </motion.h1>

        {/* Features */}
        <motion.div
          className="mt-12 w-full flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.13,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <AnimatePresence>
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-4 bg-white/90 rounded-2xl p-5 border border-[#e6e0fa]"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  damping: 16,
                  delay: 0.1 + idx * 0.08,
                }}
                whileHover={{
                  scale: 1.025,
                  backgroundColor: '#f3eaff',
                }}
              >
                {feature.icon}
                <span className="text-base font-medium text-[#3a2d7d]">
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Get Started Button */}
        <motion.a
          href="/onboarding"
          className="mt-12 w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          onClick={() => {
            connect()
              .then(() => {})
              .catch(() => {})
              .finally(() => {});
          }}
        >
          <motion.button
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#7B61FF] to-[#5AD6FF] text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/40"
            whileHover={{
              scale: 1.045,
              boxShadow: '0 8px 32px 0 rgba(90,214,255,0.18)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
