import { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import "./App.css";

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [derainedImage, setDerainedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setDerainedImage(null);
      setError(null);
    }
  };

  const handleInputChange = (e) => {
    handleFileChange(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileChange(droppedFile);
    } else {
      setError("Please drop a valid image file (JPEG/PNG)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select or drop an image");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setDerainedImage(preview);
      setLoading(false);
    }, 2000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSliderChange = (position) => {
    setSliderPosition(position);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } font-poppins transition-colors duration-500`}
    >
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 px-4 py-2 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </motion.button>

      <motion.section
        className="py-16 text-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-teal-600 dark:text-teal-400">
          Adaptive Hybrid Enhancement Network
        </h1>
        <h2 className="text-2xl md:text-3xl text-teal-600 dark:text-teal-400">
          for Single Image Deraining
        </h2>
        <div className="mt-4 w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
      </motion.section>

      <motion.section
        className="max-w-4xl mx-auto mb-12 px-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-teal-600 dark:text-teal-400">
            Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">
                Group Members
              </h3>
              <p className="text-lg text-gray-800 dark:text-gray-100">
                Tushar Raju Nagpure (Roll No: 211106069)
                <br />
                Saurabh Santosh Naik (Roll No: 221206009)
                <br />
                Riya Rajendra Dhargalkar (Roll No: 211106049)
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">
                Guide
              </h3>
              <p className="text-lg text-gray-800 dark:text-gray-100">
                Mr. Bipin Naik (Assistant Professor)
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="max-w-4xl mx-auto mb-12 px-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-6 text-teal-600 dark:text-teal-400">
            Upload Rainy Image
          </h2>
          <div
            className={`border-2 ${
              isDragging ? "border-teal-500" : "border-gray-300"
            } border-dashed rounded-xl p-6 mb-6 text-center transition-colors duration-300 relative`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
              {isDragging
                ? "Drop the image here!"
                : "Drag & drop an image or click to select"}
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="file-input"
              onChange={handleInputChange}
            />
            <label
              htmlFor="file-input"
              className="inline-block px-6 py-3 bg-teal-100 text-teal-700 rounded-full cursor-pointer hover:bg-teal-200 transition"
            >
              Choose File
            </label>
          </div>

          {preview && (
            <div className="mb-6 relative">
              <img
                src={preview}
                alt="Uploaded preview"
                className="max-w-full max-h-64 h-auto rounded-xl mx-auto object-contain"
              />
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 rounded-xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500"></div>
                  <p className="mt-4 text-lg font-semibold text-teal-600 dark:text-teal-400">
                    Processing... Please wait
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <motion.button
              onClick={handleSubmit}
              className="px-8 py-3 bg-teal-500 text-white rounded-xl shadow-lg hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Processing..." : "Derain Image"}
            </motion.button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl text-center">
              {error}
            </div>
          )}
        </div>
      </motion.section>

      {derainedImage && !loading && (
        <motion.section
          className="max-w-4xl mx-auto mb-12 px-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-teal-600 dark:text-teal-400">
              Results
            </h2>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={preview}
                    alt="Rainy Image"
                    style={{ objectFit: "contain" }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={derainedImage}
                    alt="Derained Image"
                    style={{ objectFit: "contain" }}
                  />
                }
                className="w-full h-80 md:h-96"
                onPositionChange={handleSliderChange}
              />
              <motion.div
                className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
                animate={{ opacity: sliderPosition > 25 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                Before
              </motion.div>
              <motion.div
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
                animate={{ opacity: sliderPosition < 75 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                After
              </motion.div>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              Slide to compare the rainy and derained images
            </p>
          </div>
        </motion.section>
      )}
    </div>
  );
}

export default App;
