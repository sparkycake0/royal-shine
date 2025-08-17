"use client";
import { motion } from "framer-motion";
import star from "./assets/star-solid-full.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4 justify-center">
      <div className="hookup-text flex text-4xl p-4 gap-4 font-bold">
        <motion.h1
          initial={{ y: "-150%" }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.25,
            type: "spring",
            damping: 8,
            mass: 1,
          }}
          className="text-orange-400"
        >
          ROYAL
        </motion.h1>
        <motion.h1
          initial={{ y: "-150%" }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.25,
            type: "spring",
            damping: 8,
            mass: 1,
          }}
        >
          SHINE
        </motion.h1>
      </div>

      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.85, duration: 0.25 }}
          className="flex justify-center items-center"
        >
          <Image src={star} alt="" className="w-6" />
          <Image src={star} alt="" className="w-6" />
          <h1 className="font-bold text-lg mx-4">Detailing Specialist</h1>
          <Image src={star} alt="" className="w-6" />
          <Image src={star} alt="" className="w-6" />
        </motion.div>
      </div>

      <div className="mt-12 w-full">
        <div className="flex items-center justify-center w-full">
          <motion.div
            initial={{
              width: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center gap-1 overflow-hidden whitespace-nowrap"
          >
            <h1 className="text-3xl text-orange-400">Usluge</h1>
            <div className="w-28 bg-orange-200 h-0.5"></div>
          </motion.div>
        </div>
        <div className="mt-6 p-4 gap-2 grid grid-cols-1 justify-items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 1.8 }}
            className="border-2 rounded-full p-4 w-72 hover:border-orange-400 hover:text-orange-300 transiotion-all duration-150 cursor-default"
          >
            <h1>Poliranje Kola</h1>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 1.9 }}
            className="border-2  rounded-full p-4 w-72 hover:border-orange-400 hover:text-orange-300 transiotion-all duration-150 cursor-default"
          >
            <h1>Ciscenje Enterijera</h1>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 2 }}
            className="border-2 rounded-full p-4 w-72 hover:border-orange-400 hover:text-orange-300 transiotion-all duration-150 cursor-default"
          >
            <h1>Pranje Kauca i Fotelja</h1>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 2.1 }}
            className="border-2 rounded-full p-4 w-72 hover:border-orange-400 hover:text-orange-300 transiotion-all duration-150 cursor-default"
          >
            <h1>Pranje Stolica i Duseka</h1>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 2.2 }}
            className="border-2 rounded-full p-4 w-72 hover:border-orange-400 hover:text-orange-300 transiotion-all duration-150 cursor-default"
          >
            <h1>Osvezivanje Doma</h1>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 2.3 }}
            className="border-2 rounded-full p-4 w-72 hover:border-orange-400 hover:text-orange-300 transiotion-all duration-150 cursor-default"
          >
            <h1>Osvezivanje Vozila</h1>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
