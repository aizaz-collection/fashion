"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "@/components/icons";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03]">
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition hover:text-gold disabled:opacity-30"
      >
        <Minus className="h-4 w-4" />
      </motion.button>
      <motion.span
        key={value}
        initial={{ scale: 1.25, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-8 text-center text-sm font-semibold text-cream"
      >
        {value}
      </motion.span>
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition hover:text-gold disabled:opacity-30"
      >
        <Plus className="h-4 w-4" />
      </motion.button>
    </div>
  );
}