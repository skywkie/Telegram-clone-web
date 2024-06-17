import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../styles/Home.scss";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat/Chat";
import ChatNone from "../components/Chat/None/ChatNone";

import { useAppSelector } from "../hooks";

import Particle from "../utils/canvasParticles.ts";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!isAuth) return navigate("/auth/register");
  }, []);

  React.useLayoutEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = 1;

    const particles: Particle[] = [];
    for (let i = 0; i < 180; i++) {
      particles.push(new Particle(canvas, ctx));
    }

    requestAnimationFrame(drawCanvas);

    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = 0; j < particles.length; j++) {
          const x1 = particles[i].x;
          const y1 = particles[i].y;
          const x2 = particles[j].x;
          const y2 = particles[j].y;
          const dx = x1 - x2;
          const dy = y1 - y2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const stepProgress = 1 / 50;
            const opacity = -((distance - 100) * stepProgress);
            ctx.strokeStyle = `hsla(${particles[i].deg}, 50%, 50%, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawCanvas);
    }
  }, []);

  return (
    <div className="home">
      <canvas ref={canvasRef} id="background-canvas"></canvas>
      <Sidebar />
      <Routes>
        <Route path="/" element={<ChatNone />} />
        <Route path="/chat/:userId" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default Home;
