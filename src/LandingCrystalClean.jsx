import { useState, useEffect } from "react";
import {
  PHONE_DISPLAY,
  EMAIL,
  ADDRESS,
  NINEA,
  WAVE_NUMBER,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  LOGO,
  PHOTOS,
  wa,
  FORMULES,
  SPECIFIQUES,
  FREQUENCES,
  ZONES,
  FAQ,
} from "./config";

const telHref = PHONE_DISPLAY ? `tel:${PHONE_DISPLAY.replace(/\s/g, "")}` : null;
const MSG_DEVIS = "Bonjour CrystalClean, je souhaite un devis pour un nettoyage.";

// Repère pour une information pas encore fournie (voir config.js) — visible
// en local seulement ; en ligne, l'information manquante est masquée.
const SHOW_TODO = import.meta.env.DEV;
function Todo({ label }) {
  if (!SHOW_TODO) return null;
  return <span className="todo">à compléter : {label}</span>;
}

// ============================================================
// COMPOSANT
// ============================================================
export default function LandingCrystalClean() {
  const [slider, setSlider] = useState(50);
  const [lightbox, setLightbox] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const photos = PHOTOS.galerie.filter(Boolean);
  const total = photos.length;
  const closeLb = () => setLightbox(null);
  const prevLb = () => setLightbox((i) => (i - 1 + total) % total);
  const nextLb = () => setLightbox((i) => (i + 1) % total);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") prevLb();
      else if (e.key === "ArrowRight") nextLb();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, total]);

  useEffect(() => {
    const root = document.querySelector(".ccd");
    if (!root || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("reveal-on");
    const targets = root.querySelectorAll("section, .pillars");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ccd">
      <style>{css}</style>

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="brand" aria-label="CrystalClean — accueil">
            <img src={LOGO} alt="CrystalClean" className="logo-img" />
          </a>
          <div className="nav-links">
            <a href="#tarifs">Tarifs</a>
            <a href="#b2b">Entreprises</a>
            <a href="#etapes">Comment ça marche</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            {PHONE_DISPLAY ? (
              <a className="nav-phone" href={telHref}>{PHONE_DISPLAY}</a>
            ) : (
              <span className="nav-phone"><Todo label="téléphone" /></span>
            )}
            {INSTAGRAM_URL && (
              <a
                className="nav-ig"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram CrystalClean"
              >
                <IgIcon />
              </a>
            )}
            <a
              className="btn btn-wa btn-sm"
              href={wa(MSG_DEVIS)}
              target="_blank"
              rel="noreferrer"
            >
              <WaIcon /> Devis
            </a>
          </div>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header className="hero">
        {PHOTOS.hero ? (
          <div
            className="hero-img"
            style={{ backgroundImage: `url(${PHOTOS.hero})` }}
          />
        ) : (
          <div className="hero-img hero-img-empty">
            <img src={LOGO} alt="" className="hero-logo" />
          </div>
        )}
        {PHOTOS.hero && <div className="hero-overlay" />}
        <div className="hero-content">
          <p className="eyebrow">Nettoyage professionnel à Dakar</p>
          <h1>
            Des espaces impeccables,
            <br />
            <span className="accent">sans y penser.</span>
          </h1>
          <p className="hero-sub">
            Bureaux, commerces, résidences et sites industriels : nos équipes
            formées interviennent avec leur matériel et leurs produits, à
            l'heure qui vous convient. Qualité contrôlée à chaque passage.
          </p>
          <div className="hero-ctas">
            <a
              className="btn btn-wa btn-lg"
              href={wa(MSG_DEVIS)}
              target="_blank"
              rel="noreferrer"
            >
              <WaIcon /> Devis gratuit sur WhatsApp
            </a>
            <a className="btn btn-ghost btn-lg" href="#tarifs">
              Voir les tarifs
            </a>
          </div>
          <ul className="hero-proof">
            <li>Visite et devis sous 48 h</li>
            <li>Personnel formé & matériel fourni</li>
            <li>Wave · Orange Money · Espèces</li>
          </ul>
        </div>
      </header>

      {/* ---------- PILIERS ---------- */}
      <section className="pillars" aria-label="Nos domaines">
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="ccdGradP" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1273C9" />
              <stop offset="50%" stopColor="#29A8C0" />
              <stop offset="100%" stopColor="#74B82E" />
            </linearGradient>
          </defs>
        </svg>
        {[
          ["Bureaux", "Des équipes dans un cadre net", "bureaux"],
          ["Commercial", "Boutiques, restaurants, grandes surfaces", "commercial"],
          ["Résidentiel", "Appartements et villas", "residentiel"],
          ["Industriel", "Entrepôts, ateliers, après travaux", "industriel"],
        ].map(([t, d, ic]) => (
          <div className="pillar" key={t}>
            <PillarIcon name={ic} />
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </section>

      {/* ---------- POURQUOI ---------- */}
      <section className="section" id="pourquoi">
        <div className="section-head">
          <p className="eyebrow">Un service pensé pour vous</p>
          <h2>Pourquoi confier votre nettoyage à CrystalClean&nbsp;?</h2>
          <p className="lead">
            Un partenaire fiable et réactif — pour les entreprises comme pour
            les particuliers.
          </p>
        </div>
        <ul className="why-list">
          <li>Personnel formé, encadré et assuré</li>
          <li>Matériel professionnel et produits fournis</li>
          <li>Produits respectueux des surfaces et de l'environnement</li>
          <li>Interventions hors de vos heures d'activité</li>
          <li>Contrôle qualité systématique</li>
          <li>Photos de passage et suivi en ligne</li>
        </ul>
      </section>

      {/* ---------- AVANT / APRÈS ---------- */}
      <section className="section section-alt">
        <div className="section-head">
          <p className="eyebrow">La preuve par l'image</p>
          <h2>Avant / Après</h2>
        </div>
        <div className="ba-wrap">
          <div className="ba">
            <div
              className={`ba-img ${PHOTOS.apres ? "" : "ph ph-apres"}`}
              style={PHOTOS.apres ? { backgroundImage: `url(${PHOTOS.apres})` } : undefined}
            >
              {!PHOTOS.apres && <span className="ph-label">Photo à venir</span>}
            </div>
            <div
              className={`ba-img ba-top ${PHOTOS.avant ? "" : "ph ph-avant"}`}
              style={{
                ...(PHOTOS.avant ? { backgroundImage: `url(${PHOTOS.avant})` } : {}),
                clipPath: `inset(0 ${100 - slider}% 0 0)`,
              }}
            >
              {!PHOTOS.avant && <span className="ph-label">Photo à venir</span>}
            </div>
            <div className="ba-line" style={{ left: `${slider}%` }}>
              <span className="ba-handle">⇄</span>
            </div>
            <span className="ba-label ba-label-l">AVANT</span>
            <span className="ba-label ba-label-r">APRÈS</span>
            <input
              className="ba-range"
              type="range"
              min="0"
              max="100"
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              aria-label="Comparer avant et après"
            />
          </div>
          <p className="ba-hint">Faites glisser pour comparer</p>
        </div>
      </section>

      {/* ---------- TARIFS ---------- */}
      <section className="section" id="tarifs">
        <div className="section-head">
          <p className="eyebrow">Tarifs affichés, zéro surprise</p>
          <h2>Une offre pour chaque espace</h2>
        </div>
        <div className="cards">
          {FORMULES.map((f) => (
            <article
              key={f.nom}
              className={`card ${f.populaire ? "card-pop" : ""}`}
            >
              {f.populaire && <span className="badge">Le plus demandé</span>}
              <h3>{f.nom}</h3>
              <p className="card-tag">{f.tagline}</p>
              <div className="prices">
                {f.prix.map(([p, label]) => (
                  <div key={label}>
                    <p className="prix-prefix">à partir de</p>
                    <span className="price">{p}</span>
                    <span className="price-unit"> Fcfa<sup>*</sup></span>
                    <p className="price-label">{label}</p>
                  </div>
                ))}
              </div>
              <p className="duree">Durée : {f.duree.toLowerCase()} — sur site</p>
              <ul>
                {f.inclus.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <a
                className={`btn ${f.populaire ? "btn-wa" : "btn-outline"} btn-full`}
                href={wa(f.msg)}
                target="_blank"
                rel="noreferrer"
              >
                {f.nom === "Résidence" ? "Réserver" : "Demander un devis"}
              </a>
            </article>
          ))}
        </div>
        <p className="tarif-note">
          * Tarifs indicatifs par intervention — selon la surface, l'état des
          lieux et après visite.
        </p>
        <div className="deplacement">
          <p className="deplacement-title">Interventions spécifiques — à partir de</p>
          <div className="deplacement-grid">
            {SPECIFIQUES.map(([prix, nom, detail]) => (
              <div className="dep-item" key={nom}>
                <span className="dep-prix">{prix}</span>
                <span className="dep-zone">
                  {nom}
                  <br />
                  <small>{detail}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- B2B ---------- */}
      <section className="section section-alt" id="b2b">
        <div className="b2b">
          <div className="b2b-text">
            <p className="eyebrow">Contrats Entreprises &amp; Multi-sites</p>
            <h2>Vous gérez plusieurs locaux ou un site exigeant&nbsp;?</h2>
            <p className="b2b-sub">
              Nous proposons des contrats d'entretien récurrents aux
              entreprises, administrations, ambassades, enseignes et
              gestionnaires de copropriétés. Un planning de passage fixe, une
              équipe qui connaît vos lieux et un interlocuteur unique, pour des
              espaces toujours impeccables auprès de vos collaborateurs et de
              vos clients.
            </p>
            <div className="freqs" aria-label="Fréquences de passage">
              {FREQUENCES.map((f) => (
                <span key={f} className="freq">{f}</span>
              ))}
            </div>
            <ul className="b2b-list">
              <li>Un contrat pour tous vos sites</li>
              <li>Passages planifiés selon vos horaires</li>
              <li>Tarification négociée, facture mensuelle</li>
              <li>Espace client en ligne : interventions, photos, factures</li>
            </ul>
            <a
              className="btn btn-wa"
              href={wa("Bonjour CrystalClean, je représente une entreprise et souhaite un devis pour un contrat d'entretien régulier. Nombre de sites / surfaces : ")}
              target="_blank"
              rel="noreferrer"
            >
              <WaIcon /> Demander un devis entreprise
            </a>
          </div>
        </div>
      </section>

      {/* ---------- COMMENT ÇA MARCHE ---------- */}
      <section className="section" id="etapes">
        <div className="section-head">
          <p className="eyebrow">Comment ça marche</p>
          <h2>Simple, de bout en bout</h2>
        </div>
        <div className="steps">
          <div className="step">
            <span className="step-n"><StepIcon name="chat" /></span>
            <h3>1. Écrivez-nous sur WhatsApp</h3>
            <p>
              Le type de locaux, la surface, l'adresse. Pour les sites
              professionnels, nous passons visiter et chiffrons sous 48 h.
            </p>
          </div>
          <div className="step">
            <span className="step-n"><StepIcon name="team" /></span>
            <h3>2. Notre équipe intervient</h3>
            <p>
              À l'heure convenue, avec son matériel et ses produits. Vous
              n'avez rien à fournir, votre activité n'est pas interrompue.
            </p>
          </div>
          <div className="step">
            <span className="step-n"><StepIcon name="sparkle" /></span>
            <h3>3. Profitez du résultat</h3>
            <p>
              Contrôle qualité en fin de passage, puis règlement par Wave,
              Orange Money ou espèces. Photos envoyées sur demande.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- GALERIE ---------- */}
      <section className="section section-alt" id="galerie">
        <div className="section-head">
          <p className="eyebrow">Nos dernières interventions</p>
          <h2>Le résultat parle</h2>
        </div>
        <div className="gallery">
          {total > 0
            ? photos.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className="g-item"
                  style={{ backgroundImage: `url(${src})` }}
                  aria-label={`Agrandir la réalisation CrystalClean ${i + 1}`}
                  onClick={() => setLightbox(i)}
                />
              ))
            : PHOTOS.galerie.map((_, i) => (
                <div key={i} className="g-item ph" aria-hidden="true">
                  <span className="ph-label">Photo à venir</span>
                </div>
              ))}
        </div>
        {INSTAGRAM_URL && (
          <p className="center">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="ig-link">
              Plus de réalisations sur Instagram → {INSTAGRAM_HANDLE}
            </a>
          </p>
        )}
      </section>

      {/* ---------- ZONES ---------- */}
      <section className="section" id="zones">
        <div className="section-head">
          <p className="eyebrow">Zone d'intervention</p>
          <h2>Dakar et sa banlieue</h2>
        </div>
        <div className="zones">
          {ZONES.map((z) => (
            <span key={z} className="zone">
              {z}
            </span>
          ))}
        </div>
        <p className="center muted">
          Site en dehors de Dakar ou intervention industrielle en région ?
          Demandez-nous sur WhatsApp, nous étudions chaque demande.
        </p>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section section-alt" id="faq">
        <div className="section-head">
          <p className="eyebrow">Questions fréquentes</p>
          <h2>Tout ce qu'il faut savoir</h2>
        </div>
        <div className="faq">
          {FAQ.map((item, i) => (
            <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={i}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <span className="faq-ic" aria-hidden="true">+</span>
              </button>
              {openFaq === i && <p className="faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="final">
        <h2>Prêt pour des espaces impeccables&nbsp;?</h2>
        <p>Devis gratuit — visite et proposition personnalisée sous 48 h.</p>
        <div className="final-ctas">
          <a
            className="btn btn-wa btn-lg"
            href={wa(MSG_DEVIS)}
            target="_blank"
            rel="noreferrer"
          >
            <WaIcon /> Demander mon devis
          </a>
          {PHONE_DISPLAY && (
            <a className="btn btn-ghost btn-lg" href={telHref}>
              {PHONE_DISPLAY}
            </a>
          )}
        </div>
        <p className="pay">
          Paiement : Wave · Orange Money · Espèces · Virement (entreprises)
          {(WAVE_NUMBER || SHOW_TODO) && (
            <>{" — "}Wave : {WAVE_NUMBER ?? <Todo label="numéro Wave" />}</>
          )}
        </p>
      </section>

      <footer className="footer">
        <img src={LOGO} alt="CrystalClean" className="logo-img-footer" />
        <p className="footer-phone">
          {PHONE_DISPLAY ? <a href={telHref}>{PHONE_DISPLAY}</a> : <Todo label="téléphone" />}
        </p>
        {(EMAIL || SHOW_TODO) && (
          <p className="footer-mail">
            {EMAIL ? <a href={`mailto:${EMAIL}`}>{EMAIL}</a> : <Todo label="e-mail" />}
          </p>
        )}
        {(ADDRESS || SHOW_TODO) && <p>{ADDRESS ?? <Todo label="adresse" />}</p>}
        <p>
          Nettoyage professionnel · Dakar, Sénégal
          {INSTAGRAM_URL && (
            <>
              {" · "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </>
          )}
        </p>
        {(NINEA || SHOW_TODO) && (
          <p className="footer-legal">NINEA : {NINEA ?? <Todo label="NINEA" />}</p>
        )}
      </footer>

      {/* ---------- LIGHTBOX ---------- */}
      {lightbox !== null && (
        <div className="lb" onClick={closeLb} role="dialog" aria-modal="true" aria-label="Galerie">
          <button className="lb-close" onClick={closeLb} aria-label="Fermer">×</button>
          <button
            className="lb-nav lb-prev"
            onClick={(e) => { e.stopPropagation(); prevLb(); }}
            aria-label="Photo précédente"
          >‹</button>
          <img
            className="lb-img"
            src={photos[lightbox]}
            alt={`Réalisation CrystalClean ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-nav lb-next"
            onClick={(e) => { e.stopPropagation(); nextLb(); }}
            aria-label="Photo suivante"
          >›</button>
          <span className="lb-count">{lightbox + 1} / {total}</span>
        </div>
      )}

      {/* ---------- WHATSAPP FLOTTANT ---------- */}
      <a
        className="wa-float"
        href={wa(MSG_DEVIS)}
        target="_blank"
        rel="noreferrer"
        aria-label="Demander un devis sur WhatsApp"
      >
        <WaIcon size={26} />
      </a>
    </div>
  );
}

function WaIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.45-4.45 9.87-9.9 9.87zm8.42-18.3A11.82 11.82 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.92 0-3.18-1.24-6.18-3.5-8.43z" />
    </svg>
  );
}

function StepIcon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "chat")
    return (
      <svg {...common}>
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.3-3.9A8.5 8.5 0 1 1 21 11.5z" />
        <path d="M8.5 11.5h7M8.5 8.7h5" />
      </svg>
    );
  if (name === "team")
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M16.5 14.2c2.6.3 4.5 2.5 4.5 5.3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3l1.6 4.8a3 3 0 0 0 1.9 1.9L20.3 11.3l-4.8 1.6a3 3 0 0 0-1.9 1.9L12 19.6l-1.6-4.8a3 3 0 0 0-1.9-1.9L3.7 11.3l4.8-1.6a3 3 0 0 0 1.9-1.9z" />
    </svg>
  );
}

function PillarIcon({ name }) {
  const common = {
    className: "pillar-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "url(#ccdGradP)",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "bureaux")
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10.5 21v-3h3v3" />
      </svg>
    );
  if (name === "commercial")
    return (
      <svg {...common}>
        <path d="M3.5 9.5L5 4h14l1.5 5.5" />
        <path d="M3.5 9.5a2.8 2.8 0 0 0 5.6 0 2.8 2.8 0 0 0 5.8 0 2.8 2.8 0 0 0 5.6 0" />
        <path d="M5 12v8h14v-8M10 20v-4.5h4V20" />
      </svg>
    );
  if (name === "residentiel")
    return (
      <svg {...common}>
        <path d="M3 11l9-7.5 9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M10 20v-5.5h4V20" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M2.5 20.5h19" />
      <path d="M3.5 20.5V11l5 3V11l5 3V11l5 3V4.5h2v16" />
      <path d="M7 17.5h1.5M11 17.5h1.5M15 17.5h1.5" />
    </svg>
  );
}

function IgIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// ============================================================
// DESIGN SYSTEM
//   Grille 8px · rayons 12/16/24 · 2 ombres · thème clair CrystalClean
// ============================================================
const css = `
.ccd {
  --bg: #ffffff;
  --surface: #ffffff;
  --paper: #F4F8FB;
  --surface-2: #EEF4F9;
  --line: #E2EAF0;
  --ink: #15212E;
  --ink-2: #465666;
  --steel: #6B7B8C;
  --wa: #1faa59;
  --wa-dark: #168447;
  --blue: #1273C9;
  --blue-deep: #0B5499;
  --teal: #29A8C0;
  --green: #74B82E;
  --green-bright: #8BC53F;
  --green-deep: #5A9A1E;
  --grad: linear-gradient(95deg, #1273C9 0%, #29A8C0 50%, #74B82E 100%);
  --r-sm: 12px;
  --r: 16px;
  --r-lg: 24px;
  --shadow-sm: 0 2px 8px rgba(21,33,46,.06);
  --shadow-md: 0 12px 32px rgba(21,33,46,.10);
  --container: 1120px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.ccd * { box-sizing: border-box; margin: 0; }
.ccd :focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; border-radius: 4px; }
.ccd #tarifs, .ccd #galerie, .ccd #etapes, .ccd #zones, .ccd #faq, .ccd #b2b { scroll-margin-top: 88px; }

/* ---- Repère « à compléter » ---- */
.todo {
  display: inline-block; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700;
  letter-spacing: 0; text-transform: none;
  color: #9a4d00; background: #FFF1DC; border: 1px dashed #F0A040;
  padding: 2px 8px; border-radius: 6px; line-height: 1.5;
}

/* ---- Typo ---- */
.ccd h1, .ccd h2, .ccd h3, .ccd .price {
  font-family: 'Archivo', 'Arial Narrow', -apple-system, sans-serif;
  letter-spacing: -0.02em;
}
.ccd h2 { font-size: clamp(28px, 4vw, 40px); font-weight: 800; line-height: 1.15; }
.ccd h3 { font-size: 19px; font-weight: 700; }
.center { text-align: center; }
.muted { color: var(--steel); font-size: 14px; margin-top: 24px; }
.eyebrow {
  font-size: 12px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;
  background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent;
  margin-bottom: 12px;
}
.section-head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
.lead { color: var(--ink-2); font-size: 17px; margin-top: 16px; }

/* ---- Nav ---- */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,.86); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  max-width: var(--container); margin: 0 auto; padding: 10px 24px;
  display: flex; align-items: center; gap: 32px;
}
.brand { display: inline-flex; align-items: center; text-decoration: none; }
.logo-img { height: 44px; width: auto; display: block; }
.nav-links { display: flex; align-items: center; gap: 28px; margin-left: auto; }
.nav-links a {
  font-size: 14px; font-weight: 600; color: var(--ink-2); text-decoration: none;
  transition: color .16s ease; white-space: nowrap;
}
.nav-links a:hover { color: var(--blue); }
.nav-actions { display: flex; align-items: center; gap: 16px; }
.nav-phone { font-size: 14px; font-weight: 700; color: var(--ink); text-decoration: none; white-space: nowrap; }
.nav-phone:hover { color: var(--blue); }
.nav-ig { color: var(--ink-2); display: inline-flex; transition: color .16s ease; }
.nav-ig:hover { color: var(--blue); }
@media (max-width: 980px) {
  .nav-links, .nav-phone { display: none; }
  .nav-actions { margin-left: auto; }
}
@media (max-width: 560px) {
  .nav-ig { display: none; }
  .logo-img { height: 34px; }
}

/* ---- Boutons ---- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 28px; border-radius: var(--r-sm); font-weight: 700; font-size: 15px;
  text-decoration: none; cursor: pointer; border: none;
  transition: transform .15s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn-wa { background: var(--wa); color: #fff; box-shadow: 0 4px 16px rgba(31,170,89,.25); }
.btn-wa:hover { background: var(--wa-dark); box-shadow: 0 8px 24px rgba(31,170,89,.32); }
.btn-ghost { background: #fff; color: var(--blue-deep); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
.btn-ghost:hover { border-color: var(--blue); color: var(--blue); }
.btn-outline { background: transparent; color: var(--blue-deep); border: 1px solid var(--line); }
.btn-outline:hover { border-color: var(--blue); color: var(--blue); }
.btn-sm { padding: 10px 18px; font-size: 14px; }
.btn-lg { padding: 16px 32px; font-size: 16px; }
.btn-full { width: 100%; margin-top: 24px; }

/* ---- Hero ---- */
.hero { position: relative; min-height: 88vh; display: flex; align-items: center; overflow: hidden; }
.hero-img {
  position: absolute; inset: 0; background-size: cover; background-position: center;
  background-color: var(--paper);
}
.hero-img-empty {
  background:
    radial-gradient(700px 420px at 85% 20%, rgba(41,168,192,.16), transparent),
    radial-gradient(600px 400px at 70% 90%, rgba(116,184,46,.14), transparent),
    radial-gradient(600px 400px at 10% 10%, rgba(18,115,201,.10), transparent),
    var(--paper);
  display: flex; align-items: center; justify-content: flex-end;
  padding-right: max(24px, calc((100vw - var(--container)) / 2));
}
.hero-logo { width: min(40vw, 520px); height: auto; mix-blend-mode: multiply; }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(100deg, rgba(255,255,255,.96) 0%, rgba(255,255,255,.80) 45%, rgba(255,255,255,0) 75%);
}
.hero-content { position: relative; width: 100%; max-width: var(--container); margin: 0 auto; padding: 96px 24px; }
.hero .eyebrow { background: none; -webkit-text-fill-color: var(--green-deep); color: var(--green-deep); }
.hero h1 { font-size: clamp(36px, 6vw, 64px); font-weight: 900; line-height: 1.06; margin-bottom: 24px; max-width: 720px; }
.hero .accent { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero-sub { max-width: 500px; font-size: 17px; color: var(--ink-2); margin-bottom: 40px; }
.hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
.hero-proof {
  list-style: none; padding: 0; margin: 48px 0 0;
  display: flex; gap: 12px; flex-wrap: wrap;
}
.hero-proof li {
  font-size: 13px; font-weight: 600; color: var(--blue-deep);
  padding: 8px 16px; border-radius: 100px;
  background: rgba(255,255,255,.85); border: 1px solid var(--line);
  backdrop-filter: blur(4px);
}
@media (max-width: 900px) {
  .hero-logo { display: none; }
}

/* ---- Sections ---- */
.section { max-width: none; padding: 96px 24px; }
.section > * { max-width: var(--container); margin-left: auto; margin-right: auto; }
.section-alt { background: var(--paper); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }

/* ---- Piliers ---- */
.pillars {
  max-width: var(--container); margin: -48px auto 0; padding: 0 24px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  position: relative; z-index: 10;
}
.pillar {
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r);
  padding: 32px 24px; text-align: center; box-shadow: var(--shadow-md);
  transition: transform .2s ease, border-color .2s ease;
}
.pillar:hover { transform: translateY(-3px); border-color: rgba(18,115,201,.3); }
.pillar-icon { width: 36px; height: 36px; margin-bottom: 16px; display: inline-block; }
.pillar h3 { font-size: 15px; font-weight: 800; margin-bottom: 4px; letter-spacing: .04em; text-transform: uppercase; }
.pillar p { font-size: 13px; color: var(--ink-2); }
@media (max-width: 900px) {
  .pillars { grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: -32px; }
}

/* ---- Pourquoi ---- */
.why-list {
  list-style: none; padding: 0; max-width: 880px !important;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;
}
.why-list li {
  position: relative; padding: 16px 20px 16px 52px; font-size: 15px; font-weight: 600;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-sm);
  box-shadow: var(--shadow-sm);
}
.why-list li::before {
  content: "✓"; position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
  width: 22px; height: 22px; border-radius: 50%; background: var(--grad); color: #fff;
  font-size: 12px; font-weight: 900; display: flex; align-items: center; justify-content: center;
}

/* ---- Emplacements photo ---- */
.ph {
  display: flex; align-items: center; justify-content: center;
  background:
    repeating-linear-gradient(135deg, rgba(18,115,201,.05) 0 12px, transparent 12px 24px),
    var(--surface-2);
  border: 1px dashed #C9D6E2;
}
.ph-avant { background-color: #E4E8EC; }
.ph-apres { background-color: #EAF6F8; }
.ph-label {
  font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--steel);
  background: rgba(255,255,255,.85); padding: 6px 12px; border-radius: 6px;
}
.ba .ph-avant .ph-label { margin-right: 50%; white-space: nowrap; }
.ba .ph-apres .ph-label { margin-left: 50%; white-space: nowrap; }

/* ---- Avant / Après ---- */
.ba-wrap { max-width: 800px !important; }
.ba {
  position: relative; aspect-ratio: 16/10; border-radius: var(--r); overflow: hidden;
  background: var(--surface-2); box-shadow: var(--shadow-md);
}
.ba-img { position: absolute; inset: 0; background-size: cover; background-position: center; }
.ba-top { z-index: 2; }
.ba-line {
  position: absolute; top: 0; bottom: 0; width: 2px; background: #fff; z-index: 3;
  transform: translateX(-50%); box-shadow: 0 0 16px rgba(21,33,46,.35);
}
.ba-handle {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 44px; height: 44px; border-radius: 50%; background: #fff; color: var(--blue-deep);
  display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 700;
  box-shadow: var(--shadow-md);
}
.ba-label {
  position: absolute; top: 16px; z-index: 4; font-size: 11px; font-weight: 800;
  letter-spacing: .14em; padding: 6px 12px; border-radius: 6px;
  background: rgba(21,33,46,.72); color: #fff; backdrop-filter: blur(4px);
}
.ba-label-l { left: 16px; }
.ba-label-r { right: 16px; }
.ba-range {
  position: absolute; inset: 0; z-index: 5; width: 100%; height: 100%;
  opacity: 0; cursor: ew-resize; -webkit-appearance: none;
}
.ba-hint { text-align: center; color: var(--steel); font-size: 13px; margin-top: 16px; }

/* ---- Tarifs ---- */
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.card {
  position: relative; background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--r); padding: 36px 32px; box-shadow: var(--shadow-sm);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  display: flex; flex-direction: column;
}
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: rgba(18,115,201,.3); }
.card-pop {
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box, var(--grad) border-box;
  box-shadow: var(--shadow-md);
}
.card ul { list-style: none; padding: 0; display: grid; gap: 10px; flex: 1; align-content: start; }
.card li { padding-left: 26px; position: relative; font-size: 14px; color: var(--ink-2); }
.card li::before { content: "✓"; position: absolute; left: 0; color: var(--green-deep); font-weight: 800; }
.badge {
  position: absolute; top: -13px; left: 32px; background: var(--grad); color: #fff;
  font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
  padding: 5px 14px; border-radius: 100px;
}
.card-tag { color: var(--ink-2); font-size: 14px; margin: 4px 0 24px; }
.prices { display: flex; gap: 32px; margin-bottom: 8px; flex-wrap: wrap; }
.prix-prefix { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--steel); margin-bottom: 2px; }
.price { font-size: 32px; font-weight: 900; color: var(--blue-deep); }
.price-unit { font-size: 15px; font-weight: 700; color: var(--ink-2); }
.price-label { font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: var(--steel); margin-top: 2px; }
.duree { font-size: 13px; color: var(--ink-2); margin: 16px 0; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
.tarif-note { text-align: center; font-size: 12px; color: var(--steel); margin-top: 24px; }
.deplacement {
  max-width: 880px !important; margin-top: 32px !important;
  background: var(--paper); border: 1px solid var(--line); border-radius: var(--r); padding: 24px 32px;
}
.deplacement-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em; color: var(--steel); margin-bottom: 16px; text-align: center; }
.deplacement-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 20px; }
.dep-item { text-align: center; }
.dep-prix { display: block; font-family: 'Archivo', sans-serif; font-size: 20px; font-weight: 900; color: var(--blue-deep); }
.dep-zone { display: block; font-size: 14px; font-weight: 600; color: var(--ink); margin-top: 2px; }
.dep-zone small { font-size: 12px; font-weight: 400; color: var(--steel); }

/* ---- B2B ---- */
.b2b {
  position: relative; border-radius: var(--r-lg); overflow: hidden;
  background: #fff; border: 1px solid var(--line); box-shadow: var(--shadow-md);
  padding: 56px;
}
.b2b::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: var(--grad); }
.b2b h2 { margin-bottom: 16px; }
.b2b-sub { color: var(--ink-2); font-size: 15px; max-width: 680px; margin-bottom: 24px; }
.freqs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.freq {
  font-size: 13px; font-weight: 700; color: var(--blue-deep);
  padding: 6px 14px; border-radius: 100px; background: #EAF3FB; border: 1px solid #CFE2F4;
}
.b2b-list {
  list-style: none; padding: 0; margin: 0 0 32px;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px 32px; max-width: 720px;
}
.b2b-list li { position: relative; padding-left: 26px; color: var(--ink-2); font-size: 14px; }
.b2b-list li::before { content: "✓"; position: absolute; left: 0; color: var(--green-deep); font-weight: 800; }
@media (max-width: 640px) { .b2b { padding: 32px 24px; } }

/* ---- Étapes ---- */
.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; }
.step-n {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; border-radius: var(--r-sm);
  background: var(--grad); margin-bottom: 20px; box-shadow: var(--shadow-sm);
}
.step h3 { margin-bottom: 8px; font-size: 17px; }
.step p { color: var(--ink-2); font-size: 14.5px; }

/* ---- Galerie ---- */
.gallery {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px; margin-bottom: 32px;
}
.g-item {
  aspect-ratio: 4/3; border-radius: var(--r-sm); background-size: cover; background-position: center;
  background-color: var(--surface-2); border: none; padding: 0; width: 100%;
  cursor: pointer; transition: transform .25s ease, box-shadow .25s ease;
}
button.g-item { display: block; }
div.g-item { cursor: default; }
button.g-item:hover { transform: translateY(-3px) scale(1.015); box-shadow: var(--shadow-md); }
.ig-link { color: var(--blue); font-weight: 700; text-decoration: none; font-size: 15px; }
.ig-link:hover { text-decoration: underline; }

/* ---- Zones ---- */
.zones { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.zone {
  padding: 10px 24px; border: 1px solid var(--line); border-radius: 100px;
  font-size: 14px; font-weight: 600; background: var(--surface); color: var(--ink-2);
  transition: border-color .16s ease, color .16s ease;
}
.zone:hover { border-color: var(--blue); color: var(--blue); }

/* ---- FAQ ---- */
.faq { max-width: 760px !important; }
.faq-item { border-bottom: 1px solid var(--line); }
.faq-q {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px;
  background: none; border: none; cursor: pointer; text-align: left;
  padding: 22px 4px; color: var(--ink);
  font-family: inherit; font-size: 16px; font-weight: 600;
  transition: color .16s ease;
}
.faq-q:hover { color: var(--blue); }
.faq-ic {
  flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid var(--line); color: var(--ink-2); background: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; font-weight: 400; line-height: 1;
  transition: transform .2s ease, background .2s ease, color .2s ease;
}
.faq-item.open .faq-ic { transform: rotate(45deg); background: var(--blue); border-color: var(--blue); color: #fff; }
.faq-a { padding: 0 44px 24px 4px; color: var(--ink-2); font-size: 15px; }

/* ---- CTA final ---- */
.final {
  text-align: center; padding: 112px 24px; position: relative; overflow: hidden;
  background:
    radial-gradient(600px 300px at 20% 0%, rgba(18,115,201,.10), transparent),
    radial-gradient(600px 300px at 80% 100%, rgba(116,184,46,.12), transparent),
    var(--bg);
}
.final h2 { margin-bottom: 12px; }
.final p { color: var(--ink-2); margin-bottom: 40px; }
.final-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.final .pay { font-size: 13px; color: var(--steel); margin: 32px 0 0; }

/* ---- Footer ---- */
.footer { text-align: center; padding: 48px 24px 40px; border-top: 1px solid var(--line); background: var(--paper); }
.logo-img-footer { width: 220px; height: auto; display: block; margin: 0 auto 8px; mix-blend-mode: multiply; }
.footer p { color: var(--steel); font-size: 13px; margin-top: 8px; }
.footer a { color: var(--ink-2); }
.footer-phone { font-size: 17px; font-weight: 700; }
.footer-phone a { color: var(--ink); text-decoration: none; }
.footer-phone a:hover { color: var(--blue); }
.footer-mail { font-size: 14px; font-weight: 600; }
.footer-mail a { color: var(--blue); text-decoration: none; }
.footer-mail a:hover { text-decoration: underline; }
.footer-legal { font-size: 12px !important; }

/* ---- Lightbox ---- */
.lb {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(10,18,28,.92); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
  animation: ccdLbIn .18s ease both;
}
@keyframes ccdLbIn { from { opacity: 0; } to { opacity: 1; } }
.lb-img {
  max-width: min(92vw, 1100px); max-height: 86vh; width: auto; height: auto;
  border-radius: var(--r-sm); box-shadow: var(--shadow-md);
  animation: ccdLbZoom .22s cubic-bezier(.22,.61,.36,1) both;
}
@keyframes ccdLbZoom { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
.lb-close, .lb-nav {
  position: absolute; z-index: 2; border: none; cursor: pointer;
  background: rgba(255,255,255,.12); color: #fff; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; transition: background .15s ease;
}
.lb-close:hover, .lb-nav:hover { background: rgba(255,255,255,.24); }
.lb-close { top: 20px; right: 24px; width: 44px; height: 44px; font-size: 26px; }
.lb-nav { top: 50%; transform: translateY(-50%); width: 52px; height: 52px; font-size: 32px; }
.lb-prev { left: 20px; }
.lb-next { right: 20px; }
.lb-count {
  position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
  color: #fff; font-size: 13px; font-weight: 600; letter-spacing: .04em;
  background: rgba(255,255,255,.12); padding: 6px 16px; border-radius: 100px;
}
@media (max-width: 560px) {
  .lb-nav { width: 44px; height: 44px; font-size: 26px; }
  .lb-prev { left: 8px; } .lb-next { right: 8px; }
}

/* ---- WhatsApp flottant ---- */
.wa-float {
  position: fixed; bottom: 24px; right: 24px; z-index: 60;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--wa); color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(31,170,89,.35);
  transition: transform .15s ease;
}
.wa-float:hover { transform: scale(1.06); }

/* ---- Animations d'entrée ---- */
.ccd.reveal-on section, .ccd.reveal-on .pillars {
  opacity: 0; transform: translateY(16px);
  transition: opacity .5s ease, transform .5s cubic-bezier(.22,.61,.36,1);
}
.ccd.reveal-on section.in, .ccd.reveal-on .pillars.in { opacity: 1; transform: none; }
.hero-img { animation: ccdKenburns 16s ease-out forwards; }
@keyframes ccdKenburns { from { transform: scale(1.04); } to { transform: scale(1); } }
.hero-content > * { animation: ccdFadeUp .7s cubic-bezier(.22,.61,.36,1) both; }
.hero-content > *:nth-child(1) { animation-delay: .05s; }
.hero-content > *:nth-child(2) { animation-delay: .12s; }
.hero-content > *:nth-child(3) { animation-delay: .2s; }
.hero-content > *:nth-child(4) { animation-delay: .28s; }
.hero-content > *:nth-child(5) { animation-delay: .36s; }
@keyframes ccdFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }

/* ---- Mobile ---- */
@media (max-width: 640px) {
  .hero { min-height: 84vh; }
  .hero-content { padding: 72px 20px; }
  .section { padding: 64px 20px; }
  .section-head { margin-bottom: 40px; }
  .prices { gap: 24px; }
  .price { font-size: 28px; }
  .final { padding: 80px 20px; }
  .hero-ctas .btn { width: 100%; }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .ccd *, .ccd *::before, .ccd *::after { transition: none !important; animation: none !important; }
  .ccd.reveal-on section, .ccd.reveal-on .pillars { opacity: 1; transform: none; }
}
`;
