import { PerspectiveCamera, Ring } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Model from '../component/Model'
import CanvasLoader from '../component/CanvasLoader'
import { Leva, useControls } from 'leva'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants'
import OldComputer from '../component/OldComputer'
import Target from '../component/Target'
import ReactLogo from '../component/ReactLogo'
import Cube from '../component/Cube'
import Rings from '../component/Rings'
import HeroCamera from '../component/HeroCamera'
import Button from '../component/Button'

const Hero = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 })
    const size = calculateSizes(isMobile);

    return (
        <section className='min-h-screen w-full flex flex-col relative'>

            {/* about me text */}
            <div className='w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3'>
                <p className='sm:text-3xl text-2xl font-medium text-white text-center '>Hi, I am Tushar Negi <span className='waving-hand'>👋</span></p>
                <p className='hero_tag text-gray_gradient'>Building Products & Brands</p>
            </div>

            {/* 3d model */}
            <div className='w-full h-full absolute inset-0'>
                {/* <Leva /> */}
                <Canvas className='w-full h-full'>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

                        {/* model 1 */}
                        {/* <Model
                            // scale={0.1}
                            position={[1.09, -9.1, 4.5]}
                            rotation={[-2.9, -0.1, 3.15]}
                            scale={isMobile ? 0.07 : 0.1}
                        // position={[0, 0, 0]}
                        // rotation={[0, -Math.PI / 2, 0]}    //-Math.PI / 2 to rotate our model by 90 degrees clockwise
                        /> */}

                        {/* model 2 */}
                        {/* hero component helps us to move the model */}
                        <HeroCamera>
                            <OldComputer
                                // scale={0.1}
                                position={isMobile ? [-0.5, -9.1, 7] : [1.09, -9.1, 7]}
                                rotation={[0, -Math.PI / 14, 0]}
                                scale={isMobile ? 4 : 4.7}
                            // position={[0, 0, 0]}
                            // rotation={[0, -Math.PI / 2, 0]}    //-Math.PI / 2 to rotate our model by 90 degrees clockwise
                            />
                        </HeroCamera>

                        <group>
                            <Target position={isMobile ? [-4, -8, 12] : [-10, -6.5, 14]} scale={isMobile ? 1.5 : 2} />
                            <ReactLogo position={isMobile ? [3, 2.7, 7] : [13, 7, 1]} />
                            <Cube />
                            <Rings position={isMobile ? [-8, 10, 10] : [-15.5, 6, 14]} />
                        </group>

                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>


            {/* contact button */}
            <div className='absolute bottom-7 left-[32%] right-0 w-60 z-10 c-space'>
                <a href="/contact" className='w-fit'>
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
        </section>
    )
}

export default Hero