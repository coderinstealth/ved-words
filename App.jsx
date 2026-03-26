import { useState, useRef, useEffect } from "react";

const WORD_DATA = {
  baby:     { cp:'1f476', label:'Baby' },
  data:     { cp:null },
  fatal:    { cp:null },
  crazy:    { cp:'1f92a', label:'Crazy!' },
  apron:    { cp:'1f9ba', label:'Apron' },
  lady:     { cp:'1f469', label:'Lady' },
  basic:    { cp:null },
  shaky:    { cp:null },
  paper:    { cp:'1f4c4', label:'Paper' },
  maple:    { cp:'1f341', label:'Maple' },
  naval:    { cp:null },
  table:    { cp:'1f4cb', label:'Table' },
  bacon:    { cp:'1f953', label:'Bacon' },
  halo:     { cp:'1f607', label:'Halo' },
  acorn:    { cp:'1f330', label:'Acorn' },
  radio:    { cp:'1f4fb', label:'Radio' },
  tomato:   { cp:'1f345', label:'Tomato' },
  potato:   { cp:'1f954', label:'Potato' },
  cake:     { cp:'1f370', label:'Cake' },
  cane:     { cp:'1f6b6', label:'Cane' },
  wade:     { cp:null },
  lake:     { cp:'1f3de', label:'Lake' },
  same:     { cp:null },
  came:     { cp:null },
  case:     { cp:'1f4bc', label:'Case' },
  wave:     { cp:'1f44b', label:'Wave' },
  tame:     { cp:null },
  shade:    { cp:'1f576', label:'Shade' },
  plane:    { cp:'2708', label:'Plane' },
  space:    { cp:'1f680', label:'Space' },
  cage:     { cp:'1f439', label:'Cage' },
  base:     { cp:null },
  stage:    { cp:'1f3a4', label:'Stage' },
  flake:    { cp:'2744', label:'Flake' },
  trade:    { cp:'1f91d', label:'Trade' },
  rain:     { cp:'1f327', label:'Rain' },
  aim:      { cp:'1f3af', label:'Aim' },
  sail:     { cp:'26f5', label:'Sail' },
  train:    { cp:'1f682', label:'Train' },
  maid:     { cp:'1f9f9', label:'Maid' },
  paid:     { cp:'1f4b0', label:'Paid' },
  fail:     { cp:null },
  nail:     { cp:'1f485', label:'Nail' },
  sprain:   { cp:null },
  wait:     { cp:'23f3', label:'Wait' },
  waist:    { cp:null },
  daily:    { cp:'1f4c5', label:'Daily' },
  snail:    { cp:'1f40c', label:'Snail' },
  afraid:   { cp:'1f628', label:'Afraid' },
  trail:    { cp:'1f6b6', label:'Trail' },
  gain:     { cp:null },
  faint:    { cp:'1f634', label:'Faint' },
  grain:    { cp:'1f33e', label:'Grain' },
  raisin:   { cp:'1f347', label:'Raisin' },
  play:     { cp:'1f3ae', label:'Play' },
  day:      { cp:'2600', label:'Day' },
  say:      { cp:null },
  tray:     { cp:'1f37d', label:'Tray' },
  clay:     { cp:'1faa8', label:'Clay' },
  stay:     { cp:null },
  pray:     { cp:'1f64f', label:'Pray' },
  may:      { cp:'1f338', label:'May' },
  spray:    { cp:'1f9f4', label:'Spray' },
  gray:     { cp:null },
  hay:      { cp:'1f33e', label:'Hay' },
  jay:      { cp:'1f426', label:'Jay' },
  pay:      { cp:'1f4b5', label:'Pay' },
  bay:      { cp:'1f3d6', label:'Bay' },
  away:     { cp:null },
  today:    { cp:'1f4c5', label:'Today' },
  relay:    { cp:null },
  vein:     { cp:null },
  reign:    { cp:'1f451', label:'Reign' },
  heir:     { cp:null },
  rein:     { cp:'1f40e', label:'Rein' },
  deign:    { cp:null },
  their:    { cp:null },
  reindeer: { cp:'1f98c', label:'Reindeer' },
  beige:    { cp:null },
  eight:    { cp:'0038-fe0f-20e3', label:'Eight' },
  weigh:    { cp:'2696', label:'Weigh' },
  weight:   { cp:'2696', label:'Weight' },
  sleigh:   { cp:'1f6f7', label:'Sleigh' },
  freight:  { cp:'1f69a', label:'Freight' },
  neigh:    { cp:'1f434', label:'Neigh' },
  neighbor: { cp:'1f3e0', label:'Neighbor' },
  steak:    { cp:'1f969', label:'Steak' },
  break:    { cp:'2615', label:'Break' },
  great:    { cp:'1f31f', label:'Great!' },
  bear:     { cp:'1f43b', label:'Bear' },
  tear:     { cp:'1f972', label:'Tear' },
  wear:     { cp:'1f455', label:'Wear' },
  pear:     { cp:'1f350', label:'Pear' },
  swear:    { cp:null },
  they:     { cp:null },
  hey:      { cp:'1f44b', label:'Hey!' },
  whey:     { cp:null },
  obey:     { cp:null },
  survey:   { cp:'1f4cb', label:'Survey' },
};

const TEXT_COLORS = ['#E63946','#F4A261','#E9A800','#52B788','#457B9D','#C77DFF','#FF85B3','#06D6A0','#FB8500','#4CC9F0'];

const GITHUB_BASE = 'https://raw.githubusercontent.com/coderinstealth/ved-words/main/images';
const IMG_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

function findGithubImage(word) {
  return new Promise((resolve) => {
    let i = 0;
    const tryNext = () => {
      if (i >= IMG_FORMATS.length) { resolve(null); return; }
      const url = `${GITHUB_BASE}/${word}.${IMG_FORMATS[i]}`;
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => { i++; tryNext(); };
      img.src = url;
    };
    tryNext();
  });
}

function twemojiUrl(cp) {
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${cp}.svg`;
}

function makeConfetti(cw, ch) {
  const colors = ['#E63946','#F4A261','#E9C46A','#52B788','#457B9D','#C77DFF','#FF85B3','#06D6A0','#FFB703','#4CC9F0'];
  return Array.from({ length: 180 }, () => ({
    x: cw / 2 + (Math.random() - 0.5) * cw * 0.4,
    y: ch / 2 + (Math.random() - 0.5) * ch * 0.2,
    vx: (Math.random() - 0.5) * 18, vy: -10 - Math.random() * 14,
    rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 14,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 7 + Math.random() * 13,
    shape: Math.random() > 0.5 ? 'rect' : 'circle', alpha: 1,
  }));
}

// Synthesise a cheerful fanfare + crowd noise using Web Audio API
function playCheer() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    const tone = (freq, start, dur, vol = 0.25, type = 'triangle') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(vol, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.start(start);
      osc.stop(start + dur + 0.05);
    };

    // Rising fanfare: C E G C (major arpeggio up)
    [523, 659, 784, 1047].forEach((f, i) => tone(f, now + i * 0.1, 0.28, 0.22));
    // Big chord hit
    [523, 659, 784, 1047].forEach(f => tone(f, now + 0.44, 0.55, 0.15, 'sine'));
    // Second sparkle run up
    [784, 988, 1175, 1319, 1568].forEach((f, i) => tone(f, now + 0.55 + i * 0.07, 0.18, 0.15));

    // Crowd cheer: filtered white noise burst
    const sampleRate = ctx.sampleRate;
    const buf = ctx.createBuffer(1, sampleRate * 1.2, sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    // Band-pass to make it sound like a crowd
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 900;
    bp.Q.value = 0.4;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, now + 0.35);
    ng.gain.linearRampToValueAtTime(0.18, now + 0.5);
    ng.gain.setValueAtTime(0.18, now + 0.9);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(ctx.destination);
    noise.start(now + 0.35);
    noise.stop(now + 1.5);

    // Closing triumphant note
    tone(1047, now + 1.0, 0.4, 0.2, 'sine');
    tone(1319, now + 1.1, 0.35, 0.15, 'sine');

  } catch (e) { /* audio unavailable, silent */ }
}

export default function App() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [display, setDisplay] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [isWide, setIsWide] = useState(window.innerWidth >= 680);
  const [isRecording, setIsRecording] = useState(false);
  const [textColor, setTextColor] = useState('#E63946');

  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const recRef = useRef(null);
  const inputRef = useRef('');

  useEffect(() => { inputRef.current = input; }, [input]);
  useEffect(() => {
    const fn = () => setIsWide(window.innerWidth >= 680);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = false; r.interimResults = false; r.lang = 'en-US';
    r.onstart = () => setIsRecording(true);
    r.onend = () => setIsRecording(false);
    r.onerror = () => setIsRecording(false);
    r.onresult = e => {
      const w = e.results[0][0].transcript.trim().split(' ')[0];
      setInput(w); doSearch(w);
    };
    recRef.current = r;
  }, []);

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    particlesRef.current = makeConfetti(canvas.width, canvas.height);
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02);
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.42; p.vx *= 0.98; p.rot += p.rotV;
        if (p.y > canvas.height * 0.65) p.alpha -= 0.022;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, p.alpha); ctx.fillStyle = p.color;
        if (p.shape === 'rect') ctx.fillRect(-p.size/2, -p.size/3, p.size, p.size * 0.6);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size/2, 0, Math.PI*2); ctx.fill(); }
        ctx.restore();
      });
      if (particlesRef.current.length > 0) animRef.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const doSearch = async (overrideWord) => {
    const word = (overrideWord !== undefined ? overrideWord : inputRef.current).trim().toLowerCase();
    if (!word) return;

    if (animRef.current) cancelAnimationFrame(animRef.current);
    particlesRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    setDisplay(null); setRevealed(false);
    setStatus('loading');

    // Every word is valid — no need to check WORD_DATA
    const entry = WORD_DATA[word] || {};

    const reveal = (disp) => {
      setDisplay(disp);
      setStatus('showing');
      setTimeout(() => {
        setRevealed(true);
        fireConfetti();
        playCheer();
      }, 80);
    };

    const showTextFallback = () => {
      const color = TEXT_COLORS[Math.floor(Math.random() * TEXT_COLORS.length)];
      setTextColor(color);
      reveal({ type:'text', word, label: word });
    };

    // 1. Try GitHub repo image first
    const githubUrl = await findGithubImage(word);
    if (githubUrl) {
      reveal({ type:'img', url: githubUrl, word, label: word });
      return;
    }

    // 2. Fall back to Twemoji if we have a codepoint
    if (entry.cp) {
      try {
        const res = await fetch(twemojiUrl(entry.cp));
        if (!res.ok) throw new Error();
        const svg = await res.text();
        const cleaned = svg.replace(/width="[\d.]+"/i,'width="100%"').replace(/height="[\d.]+"/i,'height="100%"');
        reveal({ type:'svg', content:cleaned, word, label: entry.label || word });
      } catch(e) {
        showTextFallback();
      }
      return;
    }

    // 3. Final fallback: big colourful word
    showTextFallback();
  };

  const reset = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    particlesRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    setDisplay(null); setRevealed(false); setInput(''); setStatus('idle');
  };

  const toggleMic = () => {
    const r = recRef.current;
    if (!r) return;
    isRecording ? r.stop() : r.start();
  };

  const lines = Array.from({ length: 40 }, (_, i) => i);
  const allWords = Object.keys(WORD_DATA);

  return (
    <div style={{ display:'flex', flexDirection: isWide ? 'row' : 'column', height:'100vh', width:'100vw', overflow:'hidden', fontFamily:"'Nunito',sans-serif", background:'#FEFAE0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes word-in  { 0%{transform:translateY(20px) scale(0.85);opacity:0} 100%{transform:translateY(0) scale(1);opacity:1} }
        @keyframes btn-in   { 0%{transform:translateY(14px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes mic-pulse{ to{transform:scale(1.14)} }
        @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes shimmer  { 0%,100%{opacity:.5} 50%{opacity:1} }
      `}</style>

      {/* INPUT PANEL */}
      <div style={{ position:'relative', flex: isWide ? '0 0 280px' : '0 0 46vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#FFFDF5', borderRight: isWide ? '3px dashed #ddd0bb' : 'none', borderBottom: !isWide ? '3px dashed #ddd0bb' : 'none', padding:'20px', gap:14, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
          {lines.map(i => <div key={i} style={{ position:'absolute', left:0, right:0, top:`${i*32+8}px`, height:1, background:'#ede4d4', opacity:0.5 }} />)}
        </div>

        <div style={{ fontFamily:"'Baloo 2',cursive", fontSize:'clamp(1.6rem,4.5vw,2.2rem)', color:'#2C1810', textAlign:'center', lineHeight:1.1, position:'relative', animation:'float 3s ease-in-out infinite' }}>
          <span style={{ color:'#E76F51' }}>Long A</span> Words! 📚
          <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'0.78rem', color:'#9a8878', marginTop:4 }}>Type a word to see it!</div>
        </div>

        <div style={{ display:'flex', gap:10, width:'100%', maxWidth:260 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="train, cake, rain…"
            maxLength={30}
            disabled={status === 'loading'}
            style={{ flex:1, fontFamily:"'Baloo 2',cursive", fontSize:'clamp(1.1rem,3.5vw,1.5rem)', color:'#2C1810', background:'white', border:'3px solid #ddd0bb', borderRadius:14, padding:'10px 12px', textAlign:'center', boxShadow:'4px 4px 0 #c9b99a', outline:'none', minWidth:0 }}
          />
          <button onClick={toggleMic} style={{ flexShrink:0, width:50, height:50, borderRadius:'50%', background: isRecording ? '#E76F51' : '#457B9D', border:'none', cursor:'pointer', fontSize:'1.3rem', display:'flex', alignItems:'center', justifyContent:'center', boxShadow: isRecording ? '0 4px 0 #b84e30' : '0 4px 0 #2d5f7a', animation: isRecording ? 'mic-pulse 0.5s ease-in-out infinite alternate' : 'none' }}>🎙️</button>
        </div>

        <button
          onClick={() => doSearch()}
          disabled={status === 'loading'}
          style={{ fontFamily:"'Baloo 2',cursive", fontSize:'clamp(1rem,3.5vw,1.3rem)', color:'white', background:'#E76F51', border:'none', borderRadius:14, padding:'12px 0', width:'100%', maxWidth:260, cursor:'pointer', boxShadow:'0 5px 0 #b84e30', opacity: status === 'loading' ? 0.7 : 1, animation: status === 'idle' ? 'pulse 2.5s ease-in-out infinite' : 'none' }}
        >
          {status === 'loading' ? '✨ Finding…' : '🎉 Show me!'}
        </button>

        {/* Clickable word list */}
        <div style={{ width:'100%', maxWidth:260, position:'relative' }}>
          <div style={{ fontSize:'0.68rem', color:'#b8a898', marginBottom:5, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>All {allWords.length} words</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'4px 5px', maxHeight: isWide ? '22vh' : '7vh', overflowY:'auto' }}>
            {allWords.map(w => (
              <button key={w} onClick={() => { setInput(w); doSearch(w); }}
                style={{ fontFamily:"'Baloo 2',cursive", fontSize:'0.7rem', padding:'3px 8px', background: WORD_DATA[w].cp ? '#e8f4e8' : '#f4e8e8', color: WORD_DATA[w].cp ? '#2d6a2d' : '#8B3A3A', border:`1.5px solid ${WORD_DATA[w].cp ? '#b8ddb8' : '#e0b8b8'}`, borderRadius:20, cursor:'pointer', whiteSpace:'nowrap' }}>
                {w}
              </button>
            ))}
          </div>
          <div style={{ fontSize:'0.6rem', color:'#c8b8a8', marginTop:4 }}>
            <span style={{ background:'#e8f4e8', border:'1px solid #b8ddb8', borderRadius:10, padding:'1px 5px', marginRight:3 }}>green</span>picture
            <span style={{ background:'#f4e8e8', border:'1px solid #e0b8b8', borderRadius:10, padding:'1px 5px', marginLeft:6, marginRight:3 }}>pink</span>word only
          </div>
        </div>
      </div>

      {/* DISPLAY PANEL */}
      <div style={{ flex:1, position:'relative', background: revealed ? 'linear-gradient(135deg,#fff9f0,#f0f8ff)' : '#f8f4ee', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', transition:'background 0.5s ease' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(#e8dfd4 1px,transparent 1px),linear-gradient(90deg,#e8dfd4 1px,transparent 1px)', backgroundSize:'32px 32px', opacity:0.3, pointerEvents:'none' }} />
        <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:10 }} />

        {status === 'idle' && (
          <div style={{ textAlign:'center', pointerEvents:'none', padding:24 }}>
            <div style={{ fontSize:'clamp(4rem,14vw,8rem)', animation:'float 2.5s ease-in-out infinite', lineHeight:1 }}>📚</div>
            <div style={{ fontFamily:"'Baloo 2',cursive", fontSize:'clamp(1rem,3vw,1.3rem)', color:'#c8b8a4', marginTop:16 }}>Pick a word or type one!</div>
          </div>
        )}

        {status === 'loading' && (
          <div style={{ textAlign:'center', pointerEvents:'none' }}>
            <div style={{ fontSize:'clamp(3.5rem,12vw,6rem)', animation:'spin 0.9s linear infinite', display:'inline-block', lineHeight:1 }}>⭐</div>
            <div style={{ fontFamily:"'Baloo 2',cursive", fontSize:'1.2rem', color:'#9a8878', marginTop:20, animation:'shimmer 0.8s ease-in-out infinite' }}>Loading…</div>
          </div>
        )}

        {status === 'notfound' && (
          <div style={{ textAlign:'center', padding:24 }}>
            <div style={{ fontSize:'3.5rem' }}>🤔</div>
            <div style={{ fontFamily:"'Baloo 2',cursive", fontSize:'1.1rem', color:'#9a8878', marginTop:16, marginBottom:20, lineHeight:1.5 }}>
              <strong style={{color:'#E76F51'}}>"{input}"</strong> isn't in the list!<br/>
              <span style={{fontSize:'0.85rem'}}>Click a word below.</span>
            </div>
            <button onClick={reset} style={{ padding:'10px 24px', background:'#E76F51', color:'white', border:'none', borderRadius:12, fontFamily:"'Baloo 2',cursive", fontSize:'1rem', cursor:'pointer', boxShadow:'0 4px 0 #b84e30' }}>Go back</button>
          </div>
        )}

        {status === 'showing' && display && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, padding:24, zIndex:2, width:'100%', maxWidth:480 }}>

            {display.type === 'img' ? (
              <img
                src={display.url}
                alt={display.word}
                style={{ width: isWide ? 'min(340px,60vh)' : 'min(260px,55vw)', maxHeight: isWide ? 'min(340px,60vh)' : 'min(260px,55vw)', objectFit:'contain', borderRadius:20, boxShadow:'0 12px 40px rgba(0,0,0,0.18)', border:'6px solid white', background:'white', transform: revealed ? 'scale(1) rotate(0deg)' : 'scale(0.1) rotate(-20deg)', opacity: revealed ? 1 : 0, transition:'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease' }}
              />
            ) : display.type === 'svg' ? (
              <div
                style={{ width: isWide ? 'min(300px,55vh)' : 'min(220px,50vw)', height: isWide ? 'min(300px,55vh)' : 'min(220px,50vw)', filter:'drop-shadow(0 12px 32px rgba(0,0,0,0.15))', transform: revealed ? 'scale(1) rotate(0deg)' : 'scale(0.1) rotate(-20deg)', opacity: revealed ? 1 : 0, transition:'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease' }}
                dangerouslySetInnerHTML={{ __html: display.content }}
              />
            ) : (
              <div style={{ textAlign:'center', transform: revealed ? 'scale(1) rotate(0deg)' : 'scale(0.1) rotate(-15deg)', opacity: revealed ? 1 : 0, transition:'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease' }}>
                <div style={{ fontFamily:"'Baloo 2',cursive", fontSize: isWide ? 'clamp(4rem,12vw,8rem)' : 'clamp(3.5rem,16vw,6rem)', color: textColor, lineHeight:1, textShadow:`4px 4px 0 ${textColor}33` }}>
                  {display.word.charAt(0).toUpperCase() + display.word.slice(1)}
                </div>
              </div>
            )}

            {revealed && (
              <div style={{ fontFamily:"'Baloo 2',cursive", fontSize:'clamp(1.6rem,5vw,2.6rem)', color:'#2C1810', textAlign:'center', animation:'word-in 0.5s 0.15s cubic-bezier(0.34,1.56,0.64,1) both', lineHeight:1 }}>
                {(display.type === 'svg' || display.type === 'img') ? `${display.word.charAt(0).toUpperCase() + display.word.slice(1)} 🎉` : '🎉'}
              </div>
            )}

            {revealed && (
              <button onClick={reset} style={{ fontFamily:"'Baloo 2',cursive", fontSize:'1rem', color:'#E76F51', background:'white', border:'3px solid #E76F51', borderRadius:14, padding:'9px 24px', cursor:'pointer', boxShadow:'3px 3px 0 #f0ccc0', animation:'btn-in 0.4s 0.4s ease both' }}>
                🔄 Try another word!
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
