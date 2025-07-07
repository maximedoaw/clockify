import React from 'react';

interface TextAndImageProps {
  imageSrc: string;
  imageAlt?: string;
}

const TextAndImage: React.FC<TextAndImageProps> = ({ imageSrc, imageAlt = "Application screenshot" }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Track time and fill timesheets online
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mb-12">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-full h-100 object-cover"
        />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
        <p className="text-gray-700 mb-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, sapiente obcaecati excepturi ut nobis eligendi quasi veniam blanditiis iste ab facere beatae animi culpa aspernatur, quae possimus ratione officia est.
        </p>
        <p className="text-gray-700 mb-2">
          Officiis perspiciatis dolorum illo consequatur accusantium sapiente! Deleniti, inventore dolor suscipit, adipisci rem accusantium amet enim sed consequatur veritatis facilis similique accusamus non itaque. Sequi inventore nobis eligendi placeat repudiandae.
        </p>
        <p className="text-gray-700">
          Totam nihil perspiciatis veniam beatae inventore officia, est, hic eveniet nesciunt eius maxime praesentium! Deserunt expedita molestias sequi accusantium nulla, voluptate distinctio reprehenderit optio! Dolor odit rem perspiciatis iure quae!
        </p>
      </div>
    </div>
  );
};

export default TextAndImage;
