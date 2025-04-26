"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";

interface SubmitType {
  name: string,
  email: string,
  AnyRating: string,
  message: string,
  access_key: string,
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmissionStatus({ success: null, message: "" });

    const formData = formRef.current ? new FormData(formRef.current) : null;
    if (!formData) return;

    formData.append("access_key", "bedb4d5a-a2f1-4512-87d3-d3d5ce2bf431");

    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as SubmitType;
      console.log(JSON.stringify(object))

      if (result) {
        setSubmissionStatus({ success: true, message: "Form submitted successfully!" });
      } else {
        setSubmissionStatus({ success: false, message: "Form submission failed. Please try again." });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmissionStatus({ success: false, message: "Form submission failed. Please try again. Error: " });
    } finally {
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center bg-white from-black">
      <div className="bg-white rounded-3xl text-white shadow-lg p-8 max-w-lg w-full border border-cyan-500">
        <h2 className="text-3xl font-bold mb-4 text-center text-black">Contact us</h2>
        <p className="text-center mb-6 text-black">We would love to make your experience better!</p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2 text-black">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2 text-black">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="AnyRating" className="block font-medium mb-2 text-black">Rating</label>
            <select
              name="AnyRating"
              id="AnyRating"
              className="w-full px-3 py-2 bg-white border border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300 text-black"
              required
            >
              <option className="text-black" value="">Select</option>
              <option className="text-black" value="AnyRating1">1-4</option>
              <option className="text-black" value="AnyRating2">5-7</option>
              <option className="text-black" value="AnyRating3">8-10</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-2 text-black">Message</label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="w-full px-3 py-2 bg-white border text-black border-cyan-500 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-black" required />
              <span className="ml-2 text-black">I am not a robot</span>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        {submissionStatus.success !== null && (
          <div
            className={`mt-6 text-center p-4 rounded-lg ${
              submissionStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}
      </div>

      <div className="mt-8 text-center space-y-4">
        <Link href="/" className="block font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Homepage
        </Link>

        <Link href="https://linktr.ee/knighthacks" target="_blank" className="block font-semibold text-white bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          KnightHacks
        </Link>
      </div>
    </div>
  );
}
