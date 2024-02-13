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
    renderer.setClearColor(0x000000, 1); // Set the background to pitch black
    const scene = new THREE.Scene();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const gridSize = 200;
    const gridSpacing = 0.1;

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
    material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.025 });
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
    const color = new THREE.Color(0xffffff);
    color.offsetHSL(scrollY / 200, 0, 0);
    material.color = color;
  }, [scrollY]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(clientY / window.innerHeight) * 2 + 1;

      // Update grid z positions based on mouse position
      for (let i = 0; i < points.length; i++) {
        const x = points[i].x;
        const y = points[i].y;
        const distanceToMouse = Math.sqrt(Math.pow(x - mouseX * 5, 2) + Math.pow(y - mouseY * 5, 2));
        const z = Math.sin(distanceToMouse * 0.09 + (scrollY * 0.2)) * 90;
        points[i].z = z;
      }
      grid.geometry.setFromPoints(points);
      grid.geometry.attributes.position.needsUpdate = true;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
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
