"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail } from "lucide-react";

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/send-newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                    setEmail("");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-[100] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl"
                    >
                        {/* <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <X size={20} />
                        </button> */}

                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Mail size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Subscribe to Newsletter</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Get the latest PropTech news delivered straight to your inbox.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {status === "loading" ? (
                                    "Sending..."
                                ) : status === "success" ? (
                                    "Sent Successfully!"
                                ) : (
                                    <>
                                        Subscribe <Send size={18} />
                                    </>
                                )}
                            </button>
                            {status === "error" && (
                                <p className="text-center text-sm text-red-500">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
