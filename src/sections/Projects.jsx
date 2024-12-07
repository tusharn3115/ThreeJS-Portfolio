import React, { useState, useEffect, Suspense } from 'react';
import { myProjects } from '../constants';
import { gsap } from 'gsap';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from '../component/CanvasLoader';
import ProjectDemo from '../component/ProjectDemo';
import { Canvas } from '@react-three/fiber';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // Dynamically derive currentProject based on selectedProjectIndex
  const currentProject = myProjects[selectedProjectIndex];

  // Function to change the project when clicking on the left or right arrow button
  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  // Trigger animation when currentProject changes
  useEffect(() => {
    // Clear existing animations
    gsap.killTweensOf('.project-details');

    // Animate the title, description, and subdescription character by character
    gsap.fromTo(
      '.project-details .animatedText',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.05, // Delay between each character
        ease: 'power3.out',
      }
    );
  }, [selectedProjectIndex]);

  return (
    <section className="c-space my-20">
      <p className="head-text">My Selected Work</p>

      {/* Project details */}
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentProject.logoStyle}
          >
            <img
              className="w-10 h-10 shadow-sm"
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          {/* Project description */}
          <div className="flex flex-col gap-5 text-white-600 my-5 project-details">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          {/* Languages used in project */}
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            {/* Website preview */}
            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Live Site</p>
              <img
                src="/assets/arrow-up.png"
                className="w-3 h-3"
                alt="arrow-up"
              />
            </a>
          </div>

          {/* Navigate to different projects */}
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation('previous')}
            >
              <img
                src="/assets/left-arrow.png"
                alt="left-arrow"
                className="w-4 h-4"
              />
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleNavigation('next')}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right-arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* 3d model for lil project preview */}
        <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full'>
          <Canvas>
            <ambientLight intensity={3} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <ProjectDemo texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
