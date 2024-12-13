import React, { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three';
import Button from '../component/Button';


const About = () => {
    
    const [hasCopied, setHasCopied] = useState(false)

    // custom globe material
    const globeMaterial = new THREE.MeshPhongMaterial();
    globeMaterial.bumpScale = 10;
    new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
        globeMaterial.specularMap = texture;
        globeMaterial.specular = new THREE.Color('grey');
        globeMaterial.shininess = 10;
    });

    const globeEl = useRef();

    useEffect(() => {
        const directionalLight = globeEl.current.lights().find(obj3d => obj3d.type === 'DirectionalLight');
        directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
    }, []);


    // contact me copy 
    const handleCopy = () => {
        navigator.clipboard.writeText('negitushar923@gmail.com')
        setHasCopied(true)

        setTimeout(() => {
            setHasCopied(false)
        }, 2000);
    }

    return (
        <section className='c-space my-20' id='about'>
            <div className='grid xl:grid-cols-3 xl:grid-rows-2 md:grid-cols-2 grid-cols-1 gap-5 h-full'>

                {/* about me details */}
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src="/assets/grid1.png" alt="grid-1" className='w-full sm:h-[276p] h-fit object-contain' />
                        <div>
                            <p className='grid-headtext'>Hey, I'm Tushar Negi! 🤓</p>
                            <p className='grid-subtext'>I've honed my skills in front-end development, specializing in crafting stunning 3D, animative, and interactive websites. 💻✨ I love transforming ideas into dynamic user experiences that are both visually engaging 🎨 and functionally seamless ⚡.</p>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src="assets/tech.png" alt="grid-2" className='w-full sm:h-[276p] h-fit object-contain' />
                        <div>
                            <p className='grid-headtext'>Languages & Frameworks</p>
                            <p className='grid-subtext'>I specialize in building high-performance web apps with JavaScript, focusing on React, Next.js, and Tailwind CSS for modern UI design. Using GSAP and Three.js, I create stunning animations and 3D experiences. With Vercel, I ensure seamless deployment and scalability for all projects.</p>
                        </div>
                    </div>
                </div>


                {/* 3d globe */}
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <div className='rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center'>
                            <Globe
                                height={326} width={326} backgroundColor='rgba(0, 0, 0, 0)' backgroundImageOpacity={0.1}
                                ref={globeEl}
                                globeMaterial={globeMaterial}
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                                labelsData={[{
                                    lat: 30,
                                    lng: 76,
                                    color: "white",
                                    text: "I'm Here!",
                                    size: 40,
                                }]}
                            />;
                        </div>
                        <div>
                            <p className='grid-headtext'>I work remotely across most timezones.</p>
                            <p className='grid-subtext'>I work remotely across most time zones 🌍, ensuring seamless collaboration regardless of location. Based in UT of India, Chandigarh 🏙️, I specialize in creating innovative 💡, user-friendly 💻 web solutions for clients worldwide 🌟.</p>
                            <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
                        </div>
                    </div>
                </div>

                <div className='xl:col-span-2 xl:row-span-2'>
                    <div className='grid-container'>
                        <img src="/assets/grid3.png" alt="grid-3" className='w-full sm:h-[266px] h-fit object-contain' />
                        <div>
                            <p className='grid-headtext'>My Passion for Web Development</p>
                            <p className='grid-subtext'>My passion for web development 💻 fuels my drive to create innovative, user-friendly solutions 🌟. I enjoy learning new technologies, solving challenges, and building seamless experiences for users 🚀.</p>
                        </div>
                    </div>
                </div>


                {/* contact me btn */}
                <div className='xl:col-span-1 xl:row-span-2'>
                    <div className='grid-container'>
                        <img src="/assets/grid4.png" alt="grid-4" className='w-full sm:h-[126px] md:h-[276px] h-fit object-cover sm:object-top' />
                        <div className='space-y-2'>
                            <p className='grid-subtext text-center'>Contact Me</p>
                            <div className='copy-container' onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                                <p className=' lg:text-2xl md:text-xl font-medium text-gray_gradient text-white'>negitushar923@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About