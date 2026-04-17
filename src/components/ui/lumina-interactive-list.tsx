import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const THREE: any;

export function LuminaSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = (src: string, globalName: string) => new Promise<void>((res, rej) => {
      if ((window as any)[globalName]) { res(); return; }
      if (document.querySelector(`script[src="${src}"]`)) {
        const check = setInterval(() => {
          if ((window as any)[globalName]) { clearInterval(check); res(); }
        }, 50);
        setTimeout(() => { clearInterval(check); rej(new Error(`Timeout: ${globalName}`)); }, 10000);
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => { setTimeout(() => res(), 100); };
      s.onerror = () => rej(new Error(`Failed: ${src}`));
      document.head.appendChild(s);
    });

    const initApplication = () => {
      const container = containerRef.current;
      if (!container) return;

      const SLIDER_CONFIG: any = {
        settings: {
          transitionDuration: 2.5,
          autoSlideSpeed: 5000,
          currentEffect: "glass",
          globalIntensity: 1.0,
          speedMultiplier: 1.0,
          distortionStrength: 1.0,
          colorEnhancement: 1.0,
          glassRefractionStrength: 1.0,
          glassChromaticAberration: 1.0,
          glassBubbleClarity: 1.0,
          glassEdgeGlow: 1.0,
          glassLiquidFlow: 1.0,
        },
      };

      let currentSlideIndex = 0;
      let isTransitioning = false;
      let shaderMaterial: any, renderer: any, scene: any, camera: any;
      let slideTextures: any[] = [];
      let texturesLoaded = false;
      let autoSlideTimer: any = null;
      let progressAnimation: any = null;
      let sliderEnabled = false;

      const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
      const PROGRESS_UPDATE_INTERVAL = 50;
      const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

      const slides = [
        {
          title: "UNNA – Conexão Mulher",
          description: "O palco onde ideias florescem, marcas ganham propósito e mulheres brilham juntas.",
          media: "https://assets.codepen.io/7558/orange-portrait-001.jpg",
        },
        {
          title: "Propósito & Marca",
          description: "Mulheres que transformam o mercado com autenticidade e visão.",
          media: "https://assets.codepen.io/7558/orange-portrait-002.jpg",
        },
        {
          title: "Conexão Real",
          description: "Redes que nascem de conversas verdadeiras e parceiras de jornada.",
          media: "https://assets.codepen.io/7558/orange-portrait-003.jpg",
        },
        {
          title: "Empoderamento",
          description: "Quando uma mulher cresce, ela puxa outras com ela.",
          media: "https://assets.codepen.io/7558/orange-portrait-004.jpg",
        },
        {
          title: "Negócios & Propósito",
          description: "O encontro entre sua marca e seu maior potencial.",
          media: "https://assets.codepen.io/7558/orange-portrait-005.jpg",
        },
        {
          title: "Juntas Brilhamos",
          description: "Um evento que vai além do networking: é uma transformação.",
          media: "https://assets.codepen.io/7558/orange-portrait-006.jpg",
        },
      ];

      // Shaders
      const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;
        uniform int uEffectType;
        uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
        uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
        varying vec2 vUv;

        vec2 getCoverUV(vec2 uv, vec2 textureSize) {
          vec2 s = uResolution / textureSize;
          float scale = max(s.x, s.y);
          vec2 scaledSize = textureSize * scale;
          vec2 offset = (uResolution - scaledSize) * 0.5;
          return (uv * uResolution - offset) / scaledSize;
        }

        vec4 glassEffect(vec2 uv, float progress) {
          float time = progress * 5.0 * uSpeedMultiplier;
          vec2 uv1 = getCoverUV(uv, uTexture1Size);
          vec2 uv2 = getCoverUV(uv, uTexture2Size);
          float maxR = length(uResolution) * 0.85;
          float br = progress * maxR;
          vec2 p = uv * uResolution;
          vec2 c = uResolution * 0.5;
          float d = length(p - c);
          float nd = d / max(br, 0.001);
          float param = smoothstep(br + 3.0, br - 3.0, d);
          vec4 img;
          if (param > 0.0) {
            float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
            vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
            vec2 distUV = uv2 - dir * ro;
            distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
            float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
            img = vec4(
              texture2D(uTexture2, distUV + dir * ca * 1.2).r,
              texture2D(uTexture2, distUV + dir * ca * 0.2).g,
              texture2D(uTexture2, distUV - dir * ca * 0.8).b,
              1.0
            );
            if (uGlassEdgeGlow > 0.0) {
              float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
              img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
            }
          } else {
            img = texture2D(uTexture2, uv2);
          }
          vec4 oldImg = texture2D(uTexture1, uv1);
          if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
          return mix(oldImg, img, param);
        }

        void main() {
          gl_FragColor = glassEffect(vUv, uProgress);
        }
      `;

      const splitText = (text: string) =>
        text.split('').map(char => `<span style="display:inline-block;opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

      const updateContent = (idx: number) => {
        const titleEl = container.querySelector('#lumina-title') as HTMLElement;
        const descEl  = container.querySelector('#lumina-desc')  as HTMLElement;
        if (!titleEl || !descEl) return;

        gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: 'power2.in' });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: 'power2.in' });

        setTimeout(() => {
          titleEl.innerHTML = splitText(slides[idx].title);
          descEl.textContent = slides[idx].description;
          gsap.set(titleEl.children, { opacity: 0, y: 20 });
          gsap.set(descEl, { y: 20, opacity: 0 });
          gsap.to(titleEl.children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out' });
          gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
        }, 500);
      };

      const updateCounter = (idx: number) => {
        const sn = container.querySelector('#lumina-number') as HTMLElement;
        const st = container.querySelector('#lumina-total')  as HTMLElement;
        if (sn) sn.textContent = String(idx + 1).padStart(2, '0');
        if (st) st.textContent = String(slides.length).padStart(2, '0');
      };

      const updateNavigationState = (idx: number) =>
        container.querySelectorAll('.slide-nav-item').forEach((el, i) => el.classList.toggle('active', i === idx));

      const updateSlideProgress = (idx: number, prog: number) => {
        const el = container.querySelectorAll('.slide-nav-item')[idx]?.querySelector('.slide-progress-fill') as HTMLElement;
        if (el) { el.style.width = `${prog}%`; el.style.opacity = '1'; }
      };

      const quickResetProgress = (idx: number) => {
        const el = container.querySelectorAll('.slide-nav-item')[idx]?.querySelector('.slide-progress-fill') as HTMLElement;
        if (el) { el.style.transition = 'width 0.2s ease-out'; el.style.width = '0%'; setTimeout(() => (el.style.transition = 'width 0.1s linear, opacity 0.3s ease'), 200); }
      };

      const fadeSlideProgress = (idx: number) => {
        const el = container.querySelectorAll('.slide-nav-item')[idx]?.querySelector('.slide-progress-fill') as HTMLElement;
        if (el) { el.style.opacity = '0'; setTimeout(() => (el.style.width = '0%'), 300); }
      };

      const stopAutoSlideTimer = () => {
        if (progressAnimation) clearInterval(progressAnimation);
        if (autoSlideTimer) clearTimeout(autoSlideTimer);
        progressAnimation = null;
        autoSlideTimer = null;
      };

      const startAutoSlideTimer = () => {
        if (!texturesLoaded || !sliderEnabled) return;
        stopAutoSlideTimer();
        let progress = 0;
        const increment = (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
        progressAnimation = setInterval(() => {
          if (!sliderEnabled) { stopAutoSlideTimer(); return; }
          progress += increment;
          updateSlideProgress(currentSlideIndex, progress);
          if (progress >= 100) {
            clearInterval(progressAnimation);
            progressAnimation = null;
            fadeSlideProgress(currentSlideIndex);
            if (!isTransitioning) navigateToSlide((currentSlideIndex + 1) % slides.length);
          }
        }, PROGRESS_UPDATE_INTERVAL);
      };

      const safeStartTimer = (delay = 0) => {
        stopAutoSlideTimer();
        if (sliderEnabled && texturesLoaded) {
          if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
          else startAutoSlideTimer();
        }
      };

      const navigateToSlide = (targetIndex: number) => {
        if (isTransitioning || targetIndex === currentSlideIndex) return;
        stopAutoSlideTimer();
        quickResetProgress(currentSlideIndex);

        const currentTexture = slideTextures[currentSlideIndex];
        const targetTexture  = slideTextures[targetIndex];
        if (!currentTexture || !targetTexture) return;

        isTransitioning = true;
        shaderMaterial.uniforms.uTexture1.value = currentTexture;
        shaderMaterial.uniforms.uTexture2.value = targetTexture;
        shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
        shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

        updateContent(targetIndex);
        currentSlideIndex = targetIndex;
        updateCounter(currentSlideIndex);
        updateNavigationState(currentSlideIndex);

        gsap.fromTo(
          shaderMaterial.uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration: TRANSITION_DURATION(),
            ease: 'power2.inOut',
            onComplete: () => {
              shaderMaterial.uniforms.uProgress.value = 0;
              shaderMaterial.uniforms.uTexture1.value = targetTexture;
              shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
              isTransitioning = false;
              safeStartTimer(100);
            },
          }
        );
      };

      const createSlidesNavigation = () => {
        const nav = container.querySelector('#lumina-nav');
        if (!nav) return;
        nav.innerHTML = '';
        slides.forEach((slide, i) => {
          const item = document.createElement('div');
          item.className = `slide-nav-item${i === 0 ? ' active' : ''}`;
          item.dataset.slideIndex = String(i);
          item.innerHTML = `<div class="slide-nav-title">${slide.title}</div><div class="slide-progress-line"><div class="slide-progress-fill"></div></div>`;
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isTransitioning && i !== currentSlideIndex) {
              stopAutoSlideTimer();
              quickResetProgress(currentSlideIndex);
              navigateToSlide(i);
            }
          });
          nav.appendChild(item);
        });
      };

      const loadImageTexture = (src: string) =>
        new Promise<any>((resolve, reject) => {
          const l = new THREE.TextureLoader();
          l.load(src, (t: any) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
            resolve(t);
          }, undefined, reject);
        });

      const initRenderer = async () => {
        const canvas = container.querySelector('.webgl-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const w = container.offsetWidth  || window.innerWidth;
        const h = container.offsetHeight || window.innerHeight;

        scene    = new THREE.Scene();
        camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        shaderMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTexture1: { value: null },
            uTexture2: { value: null },
            uProgress:  { value: 0 },
            uResolution: { value: new THREE.Vector2(w, h) },
            uTexture1Size: { value: new THREE.Vector2(1, 1) },
            uTexture2Size: { value: new THREE.Vector2(1, 1) },
            uEffectType: { value: 0 },
            uGlobalIntensity: { value: 1.0 },
            uSpeedMultiplier: { value: 1.0 },
            uDistortionStrength: { value: 1.0 },
            uColorEnhancement: { value: 1.0 },
            uGlassRefractionStrength: { value: 1.0 },
            uGlassChromaticAberration: { value: 1.0 },
            uGlassBubbleClarity: { value: 1.0 },
            uGlassEdgeGlow: { value: 1.0 },
            uGlassLiquidFlow: { value: 1.0 },
          },
          vertexShader,
          fragmentShader,
        });

        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

        for (const s of slides) {
          try { slideTextures.push(await loadImageTexture(s.media)); }
          catch { console.warn('Texture failed:', s.media); }
        }

        if (slideTextures.length >= 2) {
          shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
          shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
          shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
          shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
          texturesLoaded = true;
          sliderEnabled  = true;
          container.classList.add('loaded');
          safeStartTimer(500);
        }

        let rafId: number;
        const render = () => { rafId = requestAnimationFrame(render); renderer.render(scene, camera); };
        render();
        // expose cancellation to outer scope via closure
        cancelRaf = () => cancelAnimationFrame(rafId);
      };

      // Handle resize
      const onResize = () => {
        if (!renderer) return;
        const w = container.offsetWidth  || window.innerWidth;
        const h = container.offsetHeight || window.innerHeight;
        renderer.setSize(w, h);
        shaderMaterial.uniforms.uResolution.value.set(w, h);
      };

      // Init
      createSlidesNavigation();
      updateCounter(0);

      const titleEl = container.querySelector('#lumina-title') as HTMLElement;
      const descEl  = container.querySelector('#lumina-desc')  as HTMLElement;
      if (titleEl && descEl) {
        titleEl.innerHTML = splitText(slides[0].title);
        descEl.textContent = slides[0].description;
        gsap.fromTo(titleEl.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.03, ease: 'power3.out', delay: 0.5 });
        gsap.fromTo(descEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 });
      }

      initRenderer();

      const onVisibilityChange = () =>
        document.hidden ? stopAutoSlideTimer() : (!isTransitioning && safeStartTimer());
      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('resize', onResize);

      return () => {
        stopAutoSlideTimer();
        sliderEnabled = false;
        cancelRaf?.();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (renderer) renderer.dispose();
      };
    };

    // cancelRaf é populado dentro de initRenderer (via closure)
    // e precisa ser acessível para o cleanup do useEffect
    let cancelRaf: (() => void) | undefined;
    let cleanupApp: (() => void) | undefined;
    let mounted = true;

    const loadScripts = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
      } catch (e) {
        console.error('Script load failed:', e);
        return;
      }
      if (!mounted) return;
      cleanupApp = initApplication();
    };

    loadScripts();

    return () => {
      mounted = false;
      cleanupApp?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="lumina-wrapper">
      <canvas className="webgl-canvas" />

      {/* Slide counter */}
      <div className="lumina-counter" aria-hidden="true">
        <span id="lumina-number">01</span>
        <span className="lumina-sep">/</span>
        <span id="lumina-total">06</span>
      </div>

      {/* Slide caption (bottom-left) */}
      <div className="lumina-caption">
        <h2 className="lumina-slide-title" id="lumina-title" />
        <p  className="lumina-slide-desc"  id="lumina-desc"  />
      </div>

      {/* Side navigation */}
      <nav className="lumina-nav" id="lumina-nav" aria-label="Navegação de slides" />
    </div>
  );
}
