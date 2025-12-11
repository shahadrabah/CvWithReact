import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

// استيراد الصور
import profile from "./assets/profile.jpg";
import photo1 from "./assets/photo1.jpg";
import photo2 from "./assets/photo2.jpg";
import g1 from "./assets/g1.jpg";
import g2 from "./assets/g2.jpg";
import g3 from "./assets/g3.jpg";
import g4 from "./assets/g4.jpg";
import g5 from "./assets/g5.jpg";
import g6 from "./assets/g6.jpg";
import g7 from "./assets/g7.jpg";
import g8 from "./assets/g8.jpg";
import graduation from "./assets/graduation.jpg";

// صور ألبوم
import gal1 from "./assets/gal1.jpg";
import gal2 from "./assets/gal2.jpg";
import gal3 from "./assets/gal3.jpg";
import gal4 from "./assets/gal4.jpg";
import gal5 from "./assets/gal5.jpg";
import gal6 from "./assets/gal6.jpg";

const photoImages = [gal1, gal2, gal3, gal4, gal5, gal6];
const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const containerRef = useRef(null);
  const photoRefs = useRef([]);

  const nextPhoto = () =>
    setSelectedPhoto((prev) => (prev + 1) % photoImages.length);
  const prevPhoto = () =>
    setSelectedPhoto((prev) => (prev - 1 + photoImages.length) % photoImages.length);

  useEffect(() => {
    const container = containerRef.current;
    const selectedImg = photoRefs.current[selectedPhoto];
    if (container && selectedImg) {
      const containerHeight = container.offsetHeight;
      const imgTop = selectedImg.offsetTop;
      const imgHeight = selectedImg.offsetHeight;
      const scrollPos = imgTop - containerHeight / 2 + imgHeight / 2;
      gsap.to(container, { scrollTo: scrollPos, duration: 0.6, ease: "power2.out" });
    }
  }, [selectedPhoto]);

  const hoverMove = (e) => gsap.to(e.target, { y: -3, duration: 0.2 });
  const hoverMoveBack = (e) => gsap.to(e.target, { y: 0, duration: 0.2 });
  const hoverScale = (e) => gsap.to(e.target, { scale: 1.05, duration: 0.3 });
  const hoverUnscale = (e) => gsap.to(e.target, { scale: 1, duration: 0.3 });

  return (
    <div className="w-screen min-h-screen bg-pink-50 text-gray-800 overflow-auto">
      {/* HOME PAGE */}
      {currentPage === "home" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-pink-50 text-center">
          <img
            src={profile}
            alt="Me"
            className="w-40 h-40 rounded-full shadow-lg cursor-pointer"
            onMouseEnter={hoverScale}
            onMouseLeave={hoverUnscale}
          />
          <h1
            className="text-5xl font-bold mt-6 cursor-pointer text-pink-800"
            onMouseEnter={hoverMove}
            onMouseLeave={hoverMoveBack}
          >
            My Portfolio
          </h1>
          <p
            className="text-gray-700 max-w-xl mt-4 cursor-pointer"
            onMouseEnter={hoverMove}
            onMouseLeave={hoverMoveBack}
          >
            Welcome to my creative space. Explore my work, skills and personal journey.
          </p>
          <button
            onClick={() => setCurrentPage("about")}
            className="mt-6 px-8 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
          >
            My Information
          </button>
        </div>
      )}

      {/* ABOUT PAGE */}
      {currentPage === "about" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-pink-100">
          <h1
            className="text-4xl font-semibold cursor-pointer text-pink-800"
            onMouseEnter={hoverMove}
            onMouseLeave={hoverMoveBack}
          >
            Shuhad Rabah Awad
          </h1>
          <p className="mt-2 text-gray-700">Born 10-01-1991</p>
          <p className="text-gray-700">
            Bachelor in Computer Engineering Technology, Central University
          </p>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {[photo1, photo2].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Photo ${i}`}
                className="w-48 rounded shadow cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentPage("experience")}
            className="mt-6 px-8 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
          >
            Experience
          </button>
        </div>
      )}

      {/* EXPERIENCE PAGE */}
      {currentPage === "experience" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-pink-200">
          <h1 className="text-4xl font-semibold cursor-pointer text-pink-800">
            My previous experience and certifications
          </h1>
          <ul className="list-disc list-inside text-left max-w-xl mt-4 space-y-2 text-gray-700">
            {[
              "Aziz Engineering Library - typesetting & Microsoft Office teaching",
              "Al-Ritaj Institute - English & computer skills teaching",
              "Al-Mutanabbi Street Printing Press - book cover & printing design",
              "Certificates: C# programming with SQL Server & Graphic Design",
            ].map((text, i) => (
              <li key={i} className="cursor-pointer hover:text-pink-800 transition">
                {text}
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            {[g1, g2, g3].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Exp ${i}`}
                className="w-48 rounded shadow cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentPage("gallery")}
            className="mt-6 px-8 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
          >
            Examples of my work
          </button>
        </div>
      )}

      {/* GALLERY PAGE */}
      {currentPage === "gallery" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-pink-50">
          <h1 className="text-4xl font-semibold cursor-pointer text-pink-800">
            Graphic Design Examples
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className="w-full h-48 object-cover rounded shadow cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentPage("postgraduate")}
            className="mt-6 px-8 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
          >
            Postgraduate
          </button>
        </div>
      )}

      {/* POSTGRADUATE PAGE */}
      {currentPage === "postgraduate" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-pink-100">
          <h1 className="text-4xl font-semibold cursor-pointer text-pink-800">
            Postgraduate Studies
          </h1>
          <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-4 cursor-pointer hover:scale-105 transition">
            <h2 className="text-xl font-bold text-pink-800">
              Master's in Computer Engineering
            </h2>
            <p>From Altinbas International University, Istanbul, Turkey</p>
            <p>With Excellent grade</p>
          </div>
          <img
            src={graduation}
            alt="Graduation"
            className="w-64 mx-auto rounded shadow mt-4 cursor-pointer hover:scale-105 transition"
          />
          <button
            onClick={() => setCurrentPage("contact")}
            className="mt-6 px-8 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
          >
            Contact
          </button>
        </div>
      )}

      {/* CONTACT PAGE */}
      {currentPage === "contact" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-pink-50">
          <h1 className="text-4xl font-semibold cursor-pointer text-pink-800">
            Contact
          </h1>
          <p className="mt-2 text-gray-700">Email: shahad@example.com</p>
          <p className="text-gray-700">Phone: +964 770 000 0000</p>
          <p className="text-gray-700">Location: Baghdad, Iraq</p>
          <button
            onClick={() => setCurrentPage("smallGallery")}
            className="mt-6 px-8 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
          >
            Go to Photo Album
          </button>
        </div>
      )}

      {/* SMALL GALLERY PAGE - Fullscreen Album */}
      {currentPage === "smallGallery" && (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-pink-50 p-6">
          <h1 className="text-4xl font-bold text-pink-800 mb-6">
            My Interactive Photo Album
          </h1>

          <div
            ref={containerRef}
            className="flex flex-col items-center gap-6 overflow-y-auto w-full h-full p-4 bg-white rounded-xl shadow-lg"
          >
            {photoImages.map((img, i) => (
              <img
                key={i}
                ref={(el) => (photoRefs.current[i] = el)}
                src={img}
                alt={`Photo ${i}`}
                className={`w-full max-w-md rounded-lg border border-gray-200 shadow-md cursor-pointer transition-all duration-300 ${
                  i === selectedPhoto
                    ? "filter-none scale-105"
                    : "filter grayscale brightness-75 opacity-70 hover:scale-105"
                }`}
                onClick={() => setSelectedPhoto(i)}
              />
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={prevPhoto}
              className="px-6 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
            >
              Prev
            </button>
            <button
              onClick={nextPhoto}
              className="px-6 py-3 bg-white text-pink-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
            >
              Next
            </button>
          </div>

          <p className="mt-4 text-pink-800 font-semibold">
            Click on a photo to make it colored and center it in the album
          </p>
        </div>
      )}
    </div>
  );
}
