import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

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
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 1);
    const scene = new THREE.Scene();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const gridSize = 200;
    const gridSpacing = 0.9;

    points = [];
    const colors = []; // Array to store colors

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * gridSpacing;
        const y = (j - gridSize / 2) * gridSpacing;
        const z =
          Math.sin((x + scrollY) * 0.05) * Math.sin((y + scrollY) * 0.05);
        points.push(new THREE.Vector3(x, y, z));
        colors.push(1.0, 1.0, 1.0); // Initialize each color as white
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({ size: 0.09, vertexColors: true });
    grid = new THREE.Points(geometry, material);
    scene.add(grid);

    camera.position.z = 10;

    const handleScroll = () => {
      setScrollY(window.scrollY * 0.25);
    };
    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    // Update grid z positions
    for (let i = 0; i < points.length; i++) {
      const x = points[i].x;
      const y = points[i].y;
      points[i].z =
        Math.sin((x + scrollY) * 0.05) * Math.sin((y + scrollY) * 0.05);
    }
    grid.geometry.setFromPoints(points);
    grid.geometry.attributes.position.needsUpdate = true;

    // Update color based on scroll
    const color = new THREE.Color(0xd3d3d3);
    color.offsetHSL(scrollY / 200, 0, 0);
    material.color = color;
    material.opacity = 0.2;
  }, [scrollY]);

  useEffect(() => {
    let scrollY = window.scrollY;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(clientY / window.innerHeight) * 2 + 1;

      for (let i = 0; i < points.length; i++) {
        const x = points[i].x;
        const y = points[i].y;
        const distanceToMouse = Math.sqrt(
          Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2),
        );
        const z = Math.sin(distanceToMouse * 0.1 + scrollY * 0.2) * 0.5;
        points[i].z = z;
      }
      grid.geometry.setFromPoints(points);
      grid.geometry.attributes.position.needsUpdate = true;

      const colorAttribute = grid.geometry.attributes.color;
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const dx = point.x - mouseX * 11;
        const dy = point.y - mouseY * 12;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 1) {
          const hue = (1 - distance) * 0.5;
          const color = new THREE.Color();
          color.setHSL(hue, 1, 0.5);
          colorAttribute.setXYZ(i, color.r, color.g, color.b);
        }
      }
      colorAttribute.needsUpdate = true;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera]);

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default WavingGrid;
