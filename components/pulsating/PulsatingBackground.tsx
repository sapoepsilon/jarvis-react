import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface WavingGridProps {
    className?: string;
}

let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let grid: THREE.Points;
let points: THREE.Vector3[] = [];
let material: THREE.PointsMaterial; // Declare the material

const WavingGrid: React.FC<WavingGridProps> = ({ className }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState<number>(0);

    useEffect(() => {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true });
        const scene = new THREE.Scene();

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        const gridSize = 50;
        const gridSpacing = 0.5;

        points = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = (i - gridSize / 2) * gridSpacing;
                const y = (j - gridSize / 2) * gridSpacing;
                const z = Math.sin((x + scrollY) * 0.05) * Math.sin((y + scrollY) * 0.05);
                points.push(new THREE.Vector3(x, y, z));
            }
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Initialize material here
        material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
        grid = new THREE.Points(geometry, material);
        scene.add(grid);

        camera.position.z = 10;

        const handleScroll = () => {
            setScrollY(window.scrollY * 0.25);
        };
        window.addEventListener('scroll', handleScroll);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    useEffect(() => {
        // Update grid z positions
        for (let i = 0; i < points.length; i++) {
            const x = points[i].x;
            const y = points[i].y;
            points[i].z = Math.sin((x + scrollY) * 0.05) * Math.sin((y + scrollY) * 0.05);
        }
        grid.geometry.setFromPoints(points);
        grid.geometry.attributes.position.needsUpdate = true;

        // Update color based on scroll
        const color = new THREE.Color(0xff0000);
        color.offsetHSL(scrollY / 50, 0, 0);
        material.color = color;
    }, [scrollY]);

    useEffect(() => {
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [camera]);

    return (
        <div className={className} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default WavingGrid;
