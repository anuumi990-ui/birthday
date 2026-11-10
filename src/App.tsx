import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  MoonStar,
  Pause,
  Play,
  Sparkles,
  Stars,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./styles.css";

type Scene = "intro" | "birthday" | "letter" | "secret" | "heart" | "finale";

const letterLines = [
  "Моя любимая Лия, ♡",
  "",
  "Я просто хочу, чтобы ты знала, как сильно ты мне дорога. Ты — моя поддержка, моя радость и человек, который умеет сделать мой день теплее даже на расстоянии.",
  "",
  "Спасибо тебе за твою доброту, заботу и за то, что ты есть. Я желаю тебе побольше счастливых дней, искренних улыбок и исполнения самых заветных желаний.",
  "",
  "Мне хочется чаще радовать тебя, поддерживать и создавать для тебя маленькие чудеса — даже если пока я могу делать это только через экран.",
  "",
  "Прости, что не могу сделать тебе более чем это… Я очень хотел подарить тебе что-то особенное, и сделал всё, что смог, своими руками и с любовью.",
  "",
  "С днём рождения, любимая. Пусть рядом с тобой всегда будут тепло, спокойствие и люди, которые ценят тебя так, как ты этого заслуживаешь.",
  "",
  "Люблю вас, Лия. ♡",
];

const starsData = Array.from({ length: 70 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  delay: `${(index % 9) * 0.35}s`,
  duration: `${2.8 + (index % 6) * 0.6}s`,
  size: `${1 + (index % 3)}px`,
}));

function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {starsData.map((star) => (
        <span
          className="star"
          key={star.id}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
    </div>
  );
}

function FloatingHearts({ amount = 14 }: { amount?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: amount }, (_, i) => ({
        id: i,
        left: `${(i * 31 + 4) % 100}%`,
        delay: `${(i % 7) * 0.8}s`,
        duration: `${8 + (i % 5) * 2}s`,
        size: `${10 + (i % 4) * 5}px`,
      })),
    [amount],
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            width: heart.size,
            height: heart.size,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : 0.42;
  }, [muted]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <div className="music-control">
      <audio ref={audioRef} src="https://orangefreesounds.com/wp-content/uploads/2025/03/Emotional-love-piano-melody.mp3" loop onEnded={() => setPlaying(false)} />
      <button className="icon-button" onClick={toggleMusic} aria-label={playing ? "Остановить музыку" : "Включить музыку"}>
        {playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <div className="music-label">
        <span className={playing ? "equalizer is-playing" : "equalizer"}><i /><i /><i /><i /></span>
        <span>{playing ? "Нежная мелодия" : "Романтическая музыка"}</span>
      </div>
      <button className="icon-button volume-button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Включить звук" : "Выключить звук"}>
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  icon = true,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: boolean;
}) {
  return (
    <motion.button
      className="primary-button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
    >
      <span>{children}</span>
      {icon && <ArrowRight size={17} />}
    </motion.button>
  );
}

export default function App() {
  const [scene, setScene] = useState<Scene>("intro");
  const [letterOpen, setLetterOpen] = useState(false);
  const [catPetted, setCatPetted] = useState(false);
  const [heartTaps, setHeartTaps] = useState(0);

  function goTo(next: Scene) {
    setScene(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }



  return (
    <main className="app-shell">
      <Starfield />
      <FloatingHearts />
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo("intro"); }}>
          <span className="brand-mark"><Heart size={15} fill="currentColor" /></span>
          <span>для тебя, всегда</span>
        </a>
        <div className="topbar-right">
          <span className="made-with"><span className="status-dot" /> сделано с любовью</span>
          <MusicControl />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.section
            className="scene intro-scene"
            key="intro"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7 }}
          >
            <div className="intro-content">
              <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Sparkles size={14} />
                <span>Маленькая вселенная — только для тебя</span>
              </motion.div>
              <motion.div className="hero-orb-wrap" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, type: "spring", bounce: 0.25 }}>
                <div className="hero-orb">
                  <div className="orb-shine" />
                  <Heart className="orb-heart" size={43} strokeWidth={1.2} fill="rgba(255,223,244,.85)" />
                </div>
                <span className="orb-spark spark-a">✦</span>
                <span className="orb-spark spark-b">✧</span>
                <span className="orb-spark spark-c">·</span>
              </motion.div>
              <motion.p className="small-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>ЛИЯ, ЭТО ВСЁ ДЛЯ ТЕБЯ ♡</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
                Для самой лучшей<br /><em>девушки</em> на свете.
              </motion.h1>
              <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                Я хотел сказать тебе кое-что важное.<br className="desktop-break" /> Поэтому создал для тебя маленький уголок вселенной.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
                <PrimaryButton onClick={() => goTo("birthday")}>Открыть мой сюрприз</PrimaryButton>
              </motion.div>
              <motion.div className="scroll-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                <span>создано специально для тебя</span><span className="scroll-line" />
              </motion.div>
            </div>
            <div className="corner-note note-left">немного любви<br />с моего экрана тебе</div>
            <div className="corner-note note-right">СОЗДАНО С ♡<br />И КАПЛЕЙ МАГИИ</div>
          </motion.section>
        )}

        {scene === "birthday" && (
          <motion.section
            className="scene birthday-scene"
            key="birthday"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55 }}
          >
            <div className="section-tag"><Stars size={15} /> СЕГОДНЯ ТВОЙ ДЕНЬ</div>
            <div className="birthday-layout">
              <div className="birthday-copy">
                <p className="small-kicker">для моей любимой Лии</p>
                <h2>С днём рождения,<br /><em>любимая!</em></h2>
                <p className="body-copy">Если бы я мог подарить тебе всё самое прекрасное во вселенной, я бы так и сделал. Пока я создал для тебя эту маленькую вселенную.</p>
                <div className="birthday-actions">
                  <PrimaryButton onClick={() => goTo("letter")}>Для тебя есть письмо</PrimaryButton>
                </div>
                <div className="little-note"><Heart size={14} fill="currentColor" /> Расстояние — всего лишь число. Ты всегда важна для меня.</div>
              </div>
              <motion.div className="birthday-art" initial={{ rotate: 5, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
                <div className="art-halo" />
                <div className="birthday-card">
                  <div className="card-topline"><span>ЗАПИСКА ВСЕЛЕННОЙ</span><span>№ 001</span></div>
                  <div className="card-star">✦</div>
                  <div className="card-heart"><Heart size={64} strokeWidth={1} fill="rgba(251,190,224,.16)" /></div>
                  <div className="card-title">Лия,<br /><em>ты самая лучшая</em><br />девушка на свете! 🤩</div>
                  <div className="card-bottom"><span>с любовью,</span><span>♡ всегда</span></div>
                </div>
                <span className="art-floating floating-one">♡</span>
                <span className="art-floating floating-two">✧</span>
                <span className="art-floating floating-three">✦</span>
              </motion.div>
            </div>
            <button className="back-button" onClick={() => goTo("intro")}>← В начало</button>
          </motion.section>
        )}

        {scene === "letter" && (
          <motion.section
            className="scene letter-scene"
            key="letter"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55 }}
          >
            <div className="section-tag"><Heart size={14} /> ПИСЬМО ДЛЯ ТЕБЯ</div>
            <h2 className="letter-heading">Несколько слов <em>от меня тебе.</em></h2>
            <div className="letter-paper">
              <div className="paper-decoration">♡</div>
              <div className="letter-meta"><span>ЛИЧНОЕ ПИСЬМО</span><span>ОТКРОЙ В ЛЮБОЙ МОМЕНТ</span></div>
              {!letterOpen ? (
                <motion.button className="envelope" onClick={() => setLetterOpen(true)} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                  <div className="envelope-flap" />
                  <div className="envelope-seal"><Heart size={24} fill="currentColor" /></div>
                  <span>нажми, чтобы открыть</span>
                </motion.button>
              ) : (
                <motion.div className="letter-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                  {letterLines.map((line, index) => (
                    <motion.p key={`${index}-${line}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.12, 1.2) }}>
                      {line || "\u00a0"}
                    </motion.p>
                  ))}
                </motion.div>
              )}
              <div className="paper-footer"><span>от всего сердца</span><Heart size={14} fill="currentColor" /></div>
            </div>
            <div className="letter-bottom-actions">
              <button className="text-button" onClick={() => goTo("birthday")}>← Назад</button>
              <PrimaryButton onClick={() => goTo("secret")}>Ещё кое-что</PrimaryButton>
            </div>
          </motion.section>
        )}

        {scene === "secret" && (
          <motion.section
            className="scene secret-scene"
            key="secret"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55 }}
          >
            <div className="section-tag"><MoonStar size={15} /> МАЛЕНЬКИЙ СЕКРЕТ</div>
            <h2 className="secret-heading">Тс-с… здесь прячется <em>маленький друг</em>.</h2>
            <p className="body-copy secret-intro">В этой маленькой вселенной пушистый друг приготовил для тебя послание.</p>
            <motion.button
              className="cat-stage"
              onClick={() => setCatPetted((value) => !value)}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Погладить белого котика"
            >
              <div className="cat-glow" />
              <div className="cat">
                <div className="cat-ears"><span /><span /></div>
                <div className="cat-head">
                  <div className="cat-eye eye-left" />
                  <div className="cat-eye eye-right" />
                  <div className="cat-blush blush-left" />
                  <div className="cat-blush blush-right" />
                  <div className="cat-nose" />
                  <div className="cat-mouth" />
                  <div className="whiskers whisker-left"><i /><i /><i /></div>
                  <div className="whiskers whisker-right"><i /><i /><i /></div>
                </div>
                <div className="cat-body" />
                <div className="cat-tail" />
                <div className="cat-paws"><span /><span /></div>
              </div>
              <span className="cat-hint">{catPetted ? "мур-р! ♡" : "нажми на котика"}</span>
              <span className="cat-star cat-star-one">✦</span>
              <span className="cat-star cat-star-two">✧</span>
            </motion.button>
            <AnimatePresence>
              {catPetted && (
                <motion.div className="cat-message" initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}>
                  <span className="message-cat">ฅ^•ﻌ•^ฅ</span>
                  <p>«мяу-мяу! передаю тебе самые тёплые обнимашки от одного программиста. и напоминаю: ты очень-очень классная. ♡»</p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="secret-bottom">
              <button className="text-button" onClick={() => goTo("letter")}>← К письму</button>
              <PrimaryButton onClick={() => goTo("heart")}>Последний сюрприз <Heart size={16} /></PrimaryButton>
            </div>
          </motion.section>
        )}

        {scene === "heart" && (
          <motion.section className="scene heart-love-scene" key="heart" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6 }}>
            <div className="section-tag"><Heart size={15} /> МОЯ ЛЮБОВЬ БЕЗ ГРАНИЦ</div>
            <p className="heart-page-intro">Нажимай на сердечко — оно будет становиться всё больше.</p>
            <motion.button className="growing-heart-button" onClick={() => setHeartTaps((n) => n + 1)} whileTap={{ scale: 0.94 }} aria-label="Нажать на сердце">
              <motion.div className="growing-heart" animate={{ scale: Math.min(1 + heartTaps * 0.12, 3.2) }} transition={{ type: "spring", stiffness: 170, damping: 12 }}>
                <Heart size={112} strokeWidth={1.1} fill="currentColor" />
              </motion.div>
              <span className="heart-sparkle sparkle-left">✦</span><span className="heart-sparkle sparkle-right">✧</span>
            </motion.button>
            <p className="heart-tap-count">Нажатий: {heartTaps}</p>
            <h2 className="heart-love-message">Сколько бы вы ни нажимали на сердечко,<br /><em>всё равно я люблю вас больше.</em></h2>
            <p className="heart-love-subtext">Ведь нет границы моей любви к вам, Лия. ♡</p>
            <div className="heart-page-actions">
              <button className="text-button" onClick={() => goTo("secret")}>← Назад</button>
              <PrimaryButton onClick={() => goTo("finale")}>Увидеть нашу галактику <Stars size={16} /></PrimaryButton>
            </div>
          </motion.section>
        )}

        {scene === "finale" && (
          <motion.section className="scene galaxy-scene" key="finale" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6 }}>
            <div className="section-tag"><Stars size={15} /> НАША МАЛЕНЬКАЯ ГАЛАКТИКА</div>
            <h2 className="galaxy-heading">Вселенная <em>добрых слов</em></h2>
            
            <div className="galaxy-embed">
              <iframe
                className="galaxy-frame"
                src="./galaxy.html"
                title="Наша галактика добрых слов"
                allow="fullscreen"
              />
            </div>
            <p className="galaxy-footer-note">Каждое слово — маленькая звезда, а все они ведут к тебе. ♡</p>
            <div className="finale-footer">
              <button className="text-button" onClick={() => goTo("heart")}>← К сердечку</button>
              <button className="text-button" onClick={() => { setHeartTaps(0); setLetterOpen(false); setCatPetted(false); goTo("intro"); }}>↺ Пройти всё сначала</button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="site-footer">
        <span>© маленькая вселенная, созданная для тебя</span>
        <span className="footer-heart">♡</span>
        <span>не идеально, зато от сердца</span>
      </footer>
    </main>
  );
}
