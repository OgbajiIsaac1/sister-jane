import { useState, useEffect, useRef, useCallback } from "react";
import { C, IMG, NAV, GIFT_ICON, GIFTS, WA_LINK, WA_SVG, SACRED_DATES, RSVP_CONTACTS, FORMATION, SERVICE_PILLARS, ANGEL_WING_L, ANGEL_WING_R, ANGEL_SMALL } from "./constants.jsx";
import SR_JANE from "./Sr. Jane.jpeg";
import {
  fetchBouquet,
  fetchGuestbook,
  submitBouquet as saveBouquet,
  submitGuestbook as saveGuestbook,
} from "./lib/supabase.js";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("journey");
  const [transitioning, setTransitioning] = useState(false);
  const [bouquetEntries, setBouquetEntries] = useState([]);
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [bouquetForm, setBouquetForm] = useState({ name: "", gift: "Holy Mass", message: "" });
  const [guestbookForm, setGuestbookForm] = useState({ name: "", message: "" });
  const [bouquetOk, setBouquetOk] = useState(false);
  const [guestbookOk, setGuestbookOk] = useState(false);
  const [navScroll, setNavScroll] = useState({ left: false, right: true });
  const navInnerRef = useRef(null);

  // ── Scroll Reveal ──
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [page]);

  // ── Navigation ──
  const navigate = useCallback((p) => {
    if (p === page) return;
    setTransitioning(true);
    setTimeout(() => {
      setPage(p);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 260);
  }, [page]);

  const updateNavFade = useCallback((el) => {
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setNavScroll({
      left: scrollLeft > 4,
      right: scrollLeft + clientWidth < scrollWidth - 4,
    });
  }, []);

  // ── Auto-scroll active tab into view + fade overlay tracking ──
  useEffect(() => {
    const el = navInnerRef.current;
    if (!el) return;
    const active = el.querySelector(".nbtn.active");
    if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    updateNavFade(el);
  }, [page, updateNavFade]);

  const onNavScroll = useCallback(() => {
    updateNavFade(navInnerRef.current);
  }, [updateNavFade]);

  // ── Fetch entries from API on mount ──
  useEffect(() => {
    fetchBouquet().then(setBouquetEntries).catch(() => {});
    fetchGuestbook().then(setGuestbookEntries).catch(() => {});
  }, []);

  // ── Form Helpers ──
  const submitBouquet = async (e) => {
    e.preventDefault();
    if (!bouquetForm.name.trim() || !bouquetForm.message.trim()) return;
    try {
      const entry = await saveBouquet(bouquetForm);
      setBouquetEntries((prev) => [entry, ...prev]);
      setBouquetForm({ name: "", gift: "Holy Mass", message: "" });
      setBouquetOk(true);
    } catch (error) {
      console.error("Failed to submit bouquet", error);
    }
    setTimeout(() => setBouquetOk(false), 3500);
  };

  const submitGuestbook = async (e) => {
    e.preventDefault();
    if (!guestbookForm.name.trim() || !guestbookForm.message.trim()) return;
    try {
      const entry = await saveGuestbook(guestbookForm);
      setGuestbookEntries((prev) => [entry, ...prev]);
      setGuestbookForm({ name: "", message: "" });
      setGuestbookOk(true);
    } catch (error) {
      console.error("Failed to submit guestbook", error);
    }
    setTimeout(() => setGuestbookOk(false), 3500);
  };

  // ── Refs for auto-scroll ──
  const bouquetTopRef = useRef(null);
  const guestbookTopRef = useRef(null);

  const handleBouquetSubmit = (e) => {
    submitBouquet(e);
    setTimeout(() => bouquetTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
  };
  const handleGuestbookSubmit = (e) => {
    submitGuestbook(e);
    setTimeout(() => guestbookTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.CR, fontFamily: "'Montserrat',sans-serif" }}>
      {/* ── HERO ── */}
      <header style={{
        background: `linear-gradient(160deg,${C.DB} 0%,${C.RB} 42%,#1a4a8a 72%,#091e3f 100%)`,
        color: "#fff", padding: "52px 24px 44px", textAlign: "center",
        position: "relative", overflow: "hidden", borderBottom: `4px solid ${C.G}`
      }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div className="ornm" style={{ fontSize: "130px", top: "-18px", left: "-18px" }}>✦</div>
          <div className="ornm" style={{ fontSize: "80px", top: "14px", right: "8px", animationDelay: "2s" }}>†</div>
          <div className="ornm" style={{ fontSize: "220px", bottom: "-70px", left: "28%", animationDelay: "1s", opacity: .05 }}>✝</div>
          <div className="ornm" style={{ fontSize: "55px", top: "48%", left: "4%", animationDelay: "3.2s" }}>✦</div>
          <div className="ornm" style={{ fontSize: "48px", bottom: "12%", right: "6%", animationDelay: "1.6s" }}>❧</div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: `linear-gradient(90deg,transparent,${C.G},transparent)`, opacity: .5 }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(ellipse,rgba(197,160,89,.07) 0%,transparent 70%)` }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "2.4rem", color: C.G, marginBottom: "10px", animation: "floatY 4s ease-in-out infinite", display: "inline-block" }}>✝</div>
          <p style={{ fontSize: ".68rem", letterSpacing: "4px", textTransform: "uppercase", color: `rgba(197,160,89,.78)`, marginBottom: "16px", fontWeight: 500 }}>
            Congregation of the Daughters of Divine Love
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "18px" }}>
            <div style={{ height: "1px", width: "56px", background: `linear-gradient(90deg,transparent,${C.G})` }} />
            <div style={{ width: "5px", height: "5px", background: C.G, transform: "rotate(45deg)" }} />
            <div style={{ height: "1px", width: "56px", background: `linear-gradient(90deg,${C.G},transparent)` }} />
          </div>
          <h1 className="shimtxt htitle" style={{ fontFamily: "'Cinzel',serif", fontSize: "2.15rem", fontWeight: 700, letterSpacing: "1px", marginBottom: "5px", lineHeight: 1.2 }}>
            Sr. M. Chimezirim Jane Eke
          </h1>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "1.05rem", color: C.G, letterSpacing: "3px", marginBottom: "18px", fontWeight: 500 }}>(DDL)</p>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "1.05rem", color: C.G, letterSpacing: "3px", marginBottom: "18px", fontWeight: 500 }}>(NEZIE, CHINEKE MEZIRIM IFE)</p>
          <p style={{ fontSize: ".88rem", color: "rgba(226,232,240,.82)", fontWeight: 300, letterSpacing: "1px", marginBottom: "26px" }}>
            Final Religious Profession · Saturday, September 5th, 2026
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "28px" }}>
            {["📍 DDL Sacred Heart Chapel, Abakpa-Nike, Enugu", "🕙 10:00 AM Prompt"].map((t, i) => (
              <div key={i} style={{ background: "rgba(197,160,89,.12)", border: `1px solid rgba(197,160,89,.35)`, borderRadius: "50px", padding: "7px 18px", fontSize: ".76rem", color: "rgba(232,221,200,.9)" }}>{t}</div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
            <div className="angel-wing-left" style={{ width: "80px", height: "90px", opacity: .3, flexShrink: 0 }}>
              {ANGEL_WING_L}
            </div>
            <div className="hero-circle">
              <div className="ring1" /><div className="ring2" />
              <img src={IMG.PHOTO_HERO} alt="Sr. M. Chimezirim Jane Eke" loading="lazy" />
            </div>
            <div className="angel-wing-right" style={{ width: "80px", height: "90px", opacity: .3, flexShrink: 0 }}>
              {ANGEL_WING_R}
            </div>
          </div>
          <p style={{ fontStyle: "italic", fontSize: ".8rem", color: `rgba(197,160,89,.72)`, fontWeight: 300, marginTop: "16px" }}>
            &ldquo;I have called you by name; you are Mine.&rdquo; — Isaiah 43:1
          </p>
        </div>
      </header>

      {/* ── NAVBAR ── */}
      <nav className="navbar" role="tablist" aria-label="Page navigation">
        <div className="nav-outer">
          <div
            ref={navInnerRef}
            className="nav-inner"
            onScroll={onNavScroll}
          >
            {NAV.map((n) => (
              <button
                key={n.id}
                role="tab"
                className={`nbtn${page === n.id ? " active" : ""}`}
                onClick={() => navigate(n.id)}
                aria-selected={page === n.id}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className={`nav-fade nav-fade-left${navScroll.left ? " show" : ""}`} aria-hidden="true" />
          <div className={`nav-fade nav-fade-right${navScroll.right ? " show" : ""}`} aria-hidden="true" />
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "52px 20px 68px" }}>
        <div className={transitioning ? "page-exit" : "page-enter"} key={page}>

          {/* ========== VOCATION JOURNEY ========== */}
          {page === "journey" && <JourneyPage />}

          {/* ========== DIVINE FAVOURITE MAGNIFICAT ========== */}
          {page === "magnificat" && <MagnificatPage />}

          {/* ========== SPIRITUAL BOUQUET ========== */}
          {page === "bouquet" && (
            <div ref={bouquetTopRef}>
              <PH title="Digital Spiritual Bouquet" sub="Offer your prayers as a sacred gift to sustain Sr. Jane in her eternal consecration" />
              <div className="split">
                <div className="gc col1" style={{ padding: "32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                    <div style={{ width: "3px", height: "22px", background: C.G, borderRadius: "4px" }} />
                    <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.08rem" }}>Offer Your Prayer Gift</h3>
                  </div>
                  <form onSubmit={handleBouquetSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className="form-group">
                      <label className="plbl">Your Name</label>
                      <input type="text" className="finput" placeholder="e.g. Mary Okafor" value={bouquetForm.name} onChange={(e) => setBouquetForm({ ...bouquetForm, name: e.target.value })} required aria-label="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="plbl">Prayer Offering</label>
                      <select className="fselect" value={bouquetForm.gift} onChange={(e) => setBouquetForm({ ...bouquetForm, gift: e.target.value })} aria-label="Select a prayer offering">
                        {GIFTS.map((g) => (
                          <option key={g} value={g}>{GIFT_ICON[g]} {g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="plbl">Personal Message</label>
                      <textarea className="ftextarea" placeholder="Write a personal prayer intention for Sr. Jane..." value={bouquetForm.message} onChange={(e) => setBouquetForm({ ...bouquetForm, message: e.target.value })} rows={4} maxLength={500} required aria-label="Your personal message" />
                      <div className="field-footer">
                        <span />
                        <span className={`char-count${bouquetForm.message.length > 450 ? bouquetForm.message.length >= 500 ? " over" : " warning" : ""}`}>
                          {bouquetForm.message.length}/500
                        </span>
                      </div>
                    </div>
                    {bouquetOk && <div className="toast" role="alert"><span>✓</span> Your spiritual gift has been offered! God bless you.</div>}
                    <button type="submit" className="gbtn" style={{ width: "100%" }}>✝ Offer This Prayer Gift</button>
                  </form>
                  <div style={{ marginTop: "22px", padding: "16px", background: `${C.RB}07`, borderRadius: "10px" }}>
                    <p style={{ fontSize: ".78rem", color: "#718096", lineHeight: 1.65 }}>
                      Your spiritual gift will be united with the Holy Sacrifice of the Mass on the day of Sr. Jane&rsquo;s Profession. Every prayer offered here becomes part of a sacred bouquet presented to our Lord on her behalf.
                    </p>
                  </div>
                </div>
                <div className="col2">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "3px", height: "22px", background: C.RB, borderRadius: "4px" }} />
                      <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.08rem" }}>Prayer Bouquet</h3>
                    </div>
                    <span className="stat-badge">{bouquetEntries.length} Offerings</span>
                  </div>
                  <div className="sfeed" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {bouquetEntries.map((e, i) => (
                      <div key={i} className="ec reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: e.message ? "10px" : 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `${C.RB}16`, border: `1px solid ${C.RB}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px" }}>
                              {GIFT_ICON[e.gift] || "✝"}
                            </div>
                            <div>
                              <p style={{ fontWeight: 700, fontSize: ".88rem", color: C.RB }}>{e.name}</p>
                              <p style={{ fontSize: ".7rem", color: "#94a3b8" }}>{timeAgo(e.created_at)}</p>
                            </div>
                          </div>
                          <span style={{ background: `${C.RB}12`, color: C.RB, border: `1px solid ${C.RB}28`, borderRadius: "50px", padding: "3px 10px", fontSize: ".7rem", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{e.gift}</span>
                        </div>
                        {e.message && <p style={{ fontStyle: "italic", fontSize: ".87rem", color: "#4a5568", lineHeight: 1.65 }}>&ldquo;{e.message}&rdquo;</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== GUESTBOOK ========== */}
          {page === "guestbook" && (
            <div ref={guestbookTopRef}>
              <PH title="Guestbook of Blessings" sub="Leave a message of love and celebration for Sr. Jane on her most sacred day" />
              <div className="split">
                <div className="gc col1" style={{ padding: "32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                    <div style={{ width: "3px", height: "22px", background: C.G, borderRadius: "4px" }} />
                    <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.08rem" }}>Sign the Guestbook</h3>
                  </div>
                  <form onSubmit={handleGuestbookSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className="form-group">
                      <label className="plbl">Your Name</label>
                      <input type="text" className="finput" placeholder="e.g. John Doe" value={guestbookForm.name} onChange={(e) => setGuestbookForm({ ...guestbookForm, name: e.target.value })} required aria-label="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="plbl">Your Message</label>
                      <textarea className="ftextarea" placeholder="Write your heartfelt congratulations and blessings for Sr. Jane..." value={guestbookForm.message} onChange={(e) => setGuestbookForm({ ...guestbookForm, message: e.target.value })} rows={5} maxLength={1000} required aria-label="Your message" />
                      <div className="field-footer">
                        <span />
                        <span className={`char-count${guestbookForm.message.length > 900 ? guestbookForm.message.length >= 1000 ? " over" : " warning" : ""}`}>
                          {guestbookForm.message.length}/1000
                        </span>
                      </div>
                    </div>
                    {guestbookOk && <div className="toast" role="alert"><span>✓</span> Your blessing has been added to the guestbook!</div>}
                    <button type="submit" className="bbtn" style={{ width: "100%" }}>✦ Leave Your Blessing</button>
                  </form>
                  <div style={{ marginTop: "22px", borderTop: `1px solid rgba(197,160,89,.2)`, paddingTop: "18px" }}>
                    <p style={{ fontStyle: "italic", fontSize: ".8rem", color: "#94a3b8", lineHeight: 1.65 }}>
                      &ldquo;Your words will be cherished as a permanent record of the love that surrounded Sr. Jane on this historic day.&rdquo;
                    </p>
                  </div>
                  <div className="gb-img-wrap" style={{ borderRadius: "20px", overflow: "hidden", border: `3px solid ${C.G}`, boxShadow: `0 16px 48px rgba(13,44,97,.22)`, position: "relative" }}>
                    <img className="gb-img" src={SR_JANE} alt="Sr. Jane" style={{ width: "100%", height: "360px", objectFit: "cover", objectPosition: "center 25%", display: "block" }} loading="lazy" />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(transparent,${C.DB}dd)`, padding: "40px 22px 20px" }}>
                      <p style={{ fontFamily: "'Cinzel',serif", color: C.G, fontSize: ".9rem", letterSpacing: "2px" }}>✝ Sr. M. Chimezirim Jane Eke ✝</p>
                      <p style={{ fontSize: ".74rem", color: "rgba(226,232,240,.7)", marginTop: "4px" }}>DDL · Perpetual Vows 2026</p>
                    </div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <p style={{ fontSize: ".88rem", fontStyle: "italic", color: "#4a5568", lineHeight: 1.7 }}>
                      &ldquo;With an everlasting love you care for me,<br />O God, I will sing forever of your love.&rdquo;
                    </p>
                  </div>
                </div>
                <div className="col2">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "3px", height: "22px", background: C.RB, borderRadius: "4px" }} />
                      <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.08rem" }}>Messages of Love</h3>
                    </div>
                    <span className="stat-badge" style={{ background: `linear-gradient(135deg,${C.RB},${C.MB})` }}>{guestbookEntries.length} Blessings</span>
                  </div>
                  <div className="sfeed" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {guestbookEntries.map((e, i) => (
                      <div key={i} className="gbc reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                          <div style={{
                            width: "42px", height: "42px", borderRadius: "50%",
                            background: `linear-gradient(135deg,${C.RB},${C.MB})`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontFamily: "'Cinzel',serif", fontSize: "16px", fontWeight: 700, flexShrink: 0
                          }}>
                            {e.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: ".9rem", color: C.RB }}>{e.name}</p>
                            <p style={{ fontSize: ".7rem", color: "#a0aec0" }}>{timeAgo(e.created_at)}</p>
                          </div>
                          <div style={{ marginLeft: "auto", fontSize: "18px", color: C.G, opacity: .7 }}>✦</div>
                        </div>
                        <p style={{ fontSize: ".9rem", color: "#4a5568", lineHeight: 1.72, fontStyle: "italic" }}>&ldquo;{e.message}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== ABOUT DDL ========== */}
          {page === "congregation" && <AboutPage />}

          {/* ========== SUPPORT MINISTRY ========== */}
          {page === "gifting" && <GiftingPage />}

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        background: `linear-gradient(135deg,${C.DB},#0a1628)`, color: "rgba(226,232,240,.65)",
        textAlign: "center", padding: "42px 24px", borderTop: `3px solid ${C.G}`
      }}>
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Cinzel',serif", color: C.G, fontSize: ".88rem", letterSpacing: "2.5px", marginBottom: "10px" }}>
            ✝ Sr. M. Chimezirim Jane Eke (DDL) ✝
          </p>
          <p style={{ fontSize: ".76rem", lineHeight: 1.75, marginBottom: "8px" }}>
            Final Religious Profession · September 5, 2026 · DDL Sacred Heart Chapel, Abakpa-Nike, Enugu
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", margin: "16px 0" }}>
            <div style={{ height: "1px", flex: 1, background: `linear-gradient(90deg,transparent,rgba(197,160,89,.3))` }} />
            <div style={{ color: C.G, opacity: .5, display: "flex", alignItems: "center", gap: "8px" }}>
              {ANGEL_SMALL} <span style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase" }}>Blessings</span> {ANGEL_SMALL}
            </div>
            <div style={{ height: "1px", flex: 1, background: `linear-gradient(270deg,transparent,rgba(197,160,89,.3))` }} />
          </div>

          <div className="tg-card" style={{ marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px" }}>
            <div style={{ padding: "20px 24px", background: `linear-gradient(135deg,${C.DB}f0,${C.RB}f0)` }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".75rem", color: `rgba(197,160,89,.9)`, letterSpacing: "2px", textTransform: "uppercase" }}>
                ✝ Thanksgiving Mass · Sunday, September 6, 2026
              </p>
              <p style={{ fontSize: ".73rem", color: "rgba(226,232,240,.65)", marginTop: "6px" }}>
                St Michael&rsquo;s Parish, Idima-Abam · 10:00 AM Prompt
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wabtn" style={{ fontSize: ".78rem", padding: "11px 24px" }}>
              {WA_SVG} Congratulate Sr. Jane
            </a>
          </div>
          <p style={{ fontStyle: "italic", fontSize: ".78rem", color: "rgba(197,160,89,.58)", marginBottom: "10px" }}>
            &ldquo;Thank you Lord of Heaven and Earth, for revealing the mysteries of the kingdom to Mere Children...&rdquo; — Matthew 11:25 
          </p>
          <p style={{ fontStyle: "italic", fontSize: ".78rem", color: "rgba(197,160,89,.58)" }}>
            &ldquo;With an everlasting love you care for me, O God, I will sing forever of your love.&rdquo;
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "18px", opacity: .15 }}>
            <div style={{ width: "28px", height: "28px" }}>{ANGEL_WING_L}</div>
            <div style={{ color: C.G, fontSize: "18px", lineHeight: "28px" }}>✝</div>
            <div style={{ width: "28px", height: "28px" }}>{ANGEL_WING_R}</div>
          </div>
          <p style={{ fontSize: ".7rem", color: "rgba(226,232,240,.35)", marginTop: "10px" }}>
            &copy; 2026 Sr. Jane Eke Celebration Committee · Created with love &amp; prayer
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ====================================================================
   Sub-components
   ==================================================================== */

function timeAgo(ts) {
  if (!ts) return "";
  const date = new Date(ts);
  if (isNaN(date)) return "";
  const diff = Date.now() - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function PH({ title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "50px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "12px", color: C.G, fontSize: ".68rem", letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: 600 }}>
        <span>✦</span><span>Celebration of Faith · 2026</span><span>✦</span>
      </div>
      <h2 className="ptitle" style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "2.1rem", marginBottom: "14px", lineHeight: 1.22 }}>{title}</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ height: "1px", width: "38px", background: `linear-gradient(90deg,transparent,${C.G})` }} />
        <div style={{ width: "6px", height: "6px", background: C.G, transform: "rotate(45deg)" }} />
        <div style={{ height: "1px", width: "38px", background: `linear-gradient(90deg,${C.G},transparent)` }} />
      </div>
      {sub && <p style={{ color: "#718096", fontSize: ".93rem", fontWeight: 300, maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

function TS({ title, children }) {
  return (
    <div className="gc" style={{ padding: "28px 32px" }}>
      <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.12rem", marginBottom: "6px" }}>{title}</h3>
      <div style={{ height: "2px", width: "38px", background: `linear-gradient(90deg,${C.G},transparent)`, marginBottom: "16px" }} />
      <p className="ts-text" style={{ fontSize: ".93rem", lineHeight: 1.88, color: "#4a5568", textAlign: "justify" }}>{children}</p>
    </div>
  );
}

function JourneyPage() {
  const journeyText = [
    "My journey into the religious life began as a quiet whisper in the depths of my heart — a persistent, beautiful pull toward a love more grand and consuming than anything the world could offer. Discerning my vocation with the Daughters of Divine Love has been a sacred path paved with prayer, obedience, and deep spiritual transformation.",
    "Over the years of formation, service, and community life, God has proven Himself faithful beyond measure. I look back with a heart overflowing with absolute gratitude to the Lord, to my beloved late father Mr. James Ebuluocha Eke, my dearest mother Mrs. Elizabeth Eke, and to my congregation for nurturing this precious seed of faith.",
    "Standing on the threshold of my Final Religious Profession on September 5th, 2026, I surrender everything — my will, my future, my desires — into the perfect hands of God. I humbly invite you to witness this sacred moment, and above all, I ask for your precious prayers as I bind myself forever to His divine mission of love.",
  ];

  return (
    <div>
      <PH title="My Vocation Journey" sub="A sacred story of divine calling and complete surrender to God's love" />
      <div className="split">
        <div className="col1" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
          <div className="photo-frame jr-img-wrap" style={{ width: "100%", maxWidth: "320px" }}>
            <img className="jr-img" src={SR_JANE} alt="Sr. M. Chimezirim Jane Eke" style={{ width: "100%", maxWidth: "320px", height: "420px", objectFit: "cover", objectPosition: "center 25%" }} loading="lazy" />
            <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${C.DB}ee,${C.RB}ee)`, border: `1px solid ${C.G}`, borderRadius: "50px", padding: "7px 18px", whiteSpace: "nowrap", backdropFilter: "blur(6px)", zIndex: 2 }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".72rem", color: C.G, letterSpacing: "1.2px" }}>DDL · Perpetual Vows 2026</p>
            </div>
          </div>
          <div className="jr-quote" style={{ maxWidth: "320px", textAlign: "center", padding: "0 8px" }}>
            <p style={{ fontSize: ".88rem", fontStyle: "italic", color: "#4a5568", lineHeight: 1.7 }}>
              &ldquo;With an everlasting love you care for me,<br />O God, I will sing forever of your love.&rdquo;
            </p>
          </div>
          <div className="jr-dates gc" style={{ width: "100%", maxWidth: "320px", padding: "24px" }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".82rem", color: C.G, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>Sacred Dates</p>
            {SACRED_DATES.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: i < 3 ? "14px" : 0 }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `${C.RB}12`, border: `1px solid rgba(197,160,89,.28)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{d.icon}</div>
                <div>
                  <p style={{ fontSize: ".7rem", color: "#94a3b8", fontWeight: 600, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: "1px" }}>{d.lbl}</p>
                  <p style={{ fontSize: ".84rem", color: C.RB, fontWeight: 500 }}>{d.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col2">
          <h3 className="jr-heading" style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.45rem", marginBottom: "6px" }}>Answering the Divine Call</h3>
          <div style={{ height: "2px", width: "48px", background: `linear-gradient(90deg,${C.G},transparent)`, marginBottom: "22px" }} />
          {journeyText.map((t, i) => (
            <p key={i} className="reveal reveal-delay- jr-para" style={{ fontSize: ".95rem", lineHeight: 1.88, color: "#4a5568", marginBottom: "18px", textAlign: "justify" }}>{t}</p>
          ))}
          <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.1rem", margin: "28px 0 18px" }}>Formation Timeline</h3>
          <div>
            {FORMATION.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", paddingBottom: i < 4 ? "18px" : 0, position: "relative" }}>
                {i < 4 && <div style={{ position: "absolute", left: "15px", top: "30px", width: "2px", bottom: 0, background: `linear-gradient(180deg,${C.G}40,transparent)` }} />}
                <div className="timeline-dot" style={{
                  background: s.final ? `linear-gradient(135deg,${C.GD},${C.G})` : `${C.RB}14`,
                  border: `2px solid ${s.final ? C.G : C.RB + "28"}`,
                  color: s.final ? "#fff" : C.RB,
                }}>✦</div>
                <div style={{ paddingTop: "4px" }}>
                  <p style={{ fontSize: ".7rem", color: s.final ? C.GD : C.G, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.yr}</p>
                  <p style={{ fontSize: ".88rem", color: "#4a5568", lineHeight: 1.5 }}>{s.ev}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "28px", background: `${C.RB}09`, border: `1px solid ${C.RB}18`, borderLeft: `4px solid ${C.G}`, borderRadius: "0 14px 14px 0", padding: "20px 24px" }}>
            <p style={{ fontStyle: "italic", fontSize: "1.02rem", color: C.RB, lineHeight: 1.75, fontWeight: 300 }}>
              &ldquo;Here I am, Lord. I come to do Your will. I have desired it with all my heart.&rdquo;
            </p>
            <p style={{ fontSize: ".8rem", color: C.GD, fontWeight: 700, marginTop: "8px" }}>— Her Perpetual Vow Intention</p>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "860px", margin: "50px auto 0", padding: "36px 32px", background: `${C.RB}06`, borderRadius: "20px", border: `1px solid ${C.RB}14` }}>
        <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.35rem", textAlign: "center", marginBottom: "4px" }}>✨ A Message of Faith &amp; Identity</h3>
        <div style={{ height: "2px", width: "64px", background: `linear-gradient(90deg,${C.G},transparent)`, margin: "12px auto 24px" }} />

        <div style={{ background: "#fff", borderRadius: "14px", padding: "22px 24px 18px", marginBottom: "18px", border: `1px solid ${C.RB}10`, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".78rem", color: C.G, fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>Romans 12:12</p>
          <p style={{ fontSize: ".95rem", color: "#4a5568", lineHeight: 1.8, fontStyle: "italic" }}>&ldquo;Be joyful in hope, patient in affliction, and faithful in prayer.&rdquo; 🙏</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "14px", padding: "22px 24px 18px", marginBottom: "18px", border: `1px solid ${C.RB}10`, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".78rem", color: C.G, fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>Matthew 11:25</p>
          <p style={{ fontSize: ".95rem", color: "#4a5568", lineHeight: 1.8, fontStyle: "italic" }}>&ldquo;Thank You, Lord of heaven and earth, for revealing the mysteries of the kingdom to little children and the humble at heart.&rdquo;</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "14px", padding: "22px 24px 18px", border: `1px solid ${C.RB}10`, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".78rem", color: C.G, fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>Psalm 46:10</p>
          <p style={{ fontSize: ".95rem", color: "#4a5568", lineHeight: 1.8, fontStyle: "italic" }}>&ldquo;Be still, and know that I am God.&rdquo;</p>
          <p style={{ fontSize: ".85rem", color: "#718096", marginTop: "4px" }}>— Supreme among the nations, exalted in all the earth. 🙏</p>
        </div>

        <div style={{ marginTop: "32px", padding: "24px", background: `linear-gradient(135deg,${C.RB}0c,${C.DB}0c)`, borderRadius: "14px", border: `1px solid ${C.G}28`, textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".9rem", color: C.RB, marginBottom: "10px" }}>💝 The Meaning of Jane</p>
          <p style={{ fontSize: "1.05rem", color: "#4a5568", lineHeight: 1.8 }}>Jane means &ldquo;a gracious gift from God.&rdquo; ❤️<br />And truly, I am a living testimony of His grace, love, and faithfulness. 👏</p>
        </div>

        <div style={{ marginTop: "24px", padding: "24px", background: `linear-gradient(135deg,${C.DB},${C.RB})`, borderRadius: "14px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".9rem", color: C.G, marginBottom: "12px", letterSpacing: "2px" }}>🌿 Personal Declaration</p>
          <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.92)", lineHeight: 1.9, maxWidth: "600px", margin: "0 auto" }}>I live in hope, stand strong through challenges, and remain faithful in prayer. I trust in God&rsquo;s wisdom, rest in His presence, and walk confidently as His gracious gift to the world.</p>
        </div>
      </div>

      <div className="gc rsvp-card" style={{ marginTop: "50px", padding: "32px" }}>
        <p style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: ".9rem", textAlign: "center", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "6px" }}>R · S · V · P</p>
        <div style={{ height: "1px", background: `linear-gradient(90deg,transparent,${C.G},transparent)`, marginBottom: "28px" }} />
        <div className="rsvp-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "28px" }}>
          {RSVP_CONTACTS.map((c, i) => (
            <div key={i} className="rsvp-item" style={{ textAlign: "center", minWidth: "155px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${C.RB}18`, border: `1px solid rgba(197,160,89,.38)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", margin: "0 auto 8px" }}>{c.icon}</div>
              <p style={{ fontWeight: 700, fontSize: ".86rem", color: C.RB }}>{c.name}</p>
              <p style={{ fontSize: ".76rem", color: "#718096", marginTop: "2px" }}>{c.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MagnificatPage() {
  const verses = [
    {
      num: 1,
      lines: [
        "My soul is glad in the Lord,",
        "and my spirit exults in the Lord my Saviour.",
        "He has looked upon His lowly handmaid,",
        "and from henceforth all nations shall call me blessed.",
      ],
    },
    {
      num: 2,
      lines: [
        "He is gracious to me, my God;",
        "my spirit affirms His Holy Name.",
        "His mercy is everlasting",
        "on all those who revere Him.",
      ],
    },
    {
      num: 3,
      lines: [
        "He has shown forth the strength of His arm.",
        "He has scattered the proud of heart.",
        "The earthly rulers He brings low,",
        "and raises the lowly.",
      ],
    },
    {
      num: 4,
      lines: [
        "The hungry He fills with good things,",
        "the wealthy He sends away empty.",
        "He protects His servant Israel,",
        "remembering His mercy of old.",
      ],
    },
  ];

  return (
    <div>
      <PH title="Divine Favourite Magnificat" sub="🌿 The Song of Our Lady — A soul rejoicing in the Lord, 2026" />

      <div className="split" style={{ gap: "36px" }}>
        <div className="col1" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="mg-wrap" style={{
            borderRadius: "20px", overflow: "hidden",
            border: `3px solid ${C.G}`, boxShadow: `0 16px 48px rgba(13,44,97,.22)`,
            position: "relative",
          }}>
            <img className="mg-img" src={SR_JANE} alt="Sr. M. Chimezirim Jane Eke" style={{ width: "100%", height: "480px", objectFit: "cover", objectPosition: "center 20%", display: "block" }} loading="lazy" />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: `linear-gradient(transparent,${C.DB}dd)`,
              padding: "40px 22px 20px",
            }}>
              <p style={{ fontFamily: "'Cinzel',serif", color: C.G, fontSize: "1rem", letterSpacing: "2px" }}>✝ Magnificat Anima Mea Dominum ✝</p>
              <p style={{ fontSize: ".78rem", color: "rgba(226,232,240,.7)", marginTop: "4px" }}>Sr. M. Chimezirim Jane Eke · DDL · 2026</p>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "0 12px" }}>
            <p style={{ fontSize: ".88rem", fontStyle: "italic", color: "#4a5568", lineHeight: 1.7 }}>
              &ldquo;With an everlasting love you care for me,<br />O God, I will sing forever of your love.&rdquo;
            </p>
          </div>

          <div className="gc" style={{ padding: "28px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".82rem", color: C.G, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>🙏 The Mystery of the Magnificat</p>
            <p style={{ fontSize: ".9rem", color: "#4a5568", lineHeight: 1.85, fontStyle: "italic" }}>
              &ldquo;The Magnificat is the song of the humble and the hopeful — a proclamation that God&rsquo;s mercy endures forever, that He lifts the lowly and fills the hungry with good things. In the heart of Sr. Jane, this ancient song finds a new voice.&rdquo;
            </p>
          </div>

          <div style={{
            background: `linear-gradient(135deg,${C.DB},${C.RB})`,
            borderRadius: "16px", padding: "28px 24px", textAlign: "center",
            border: `1px solid ${C.G}28`,
          }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".88rem", color: C.G, marginBottom: "14px", letterSpacing: "2px" }}>🎤 Solo — Doxology</p>
            <div style={{ color: "rgba(255,255,255,.92)", fontSize: ".93rem", lineHeight: 2 }}>
              <p>Glory be to God the Father,</p>
              <p>and to His Son, Jesus Christ the Lord.</p>
              <p>Glory be to the Holy Spirit, the Paraclete,</p>
              <p>both now and forever. Amen.</p>
            </div>
            <div style={{ marginTop: "16px", fontSize: ".8rem", color: C.GL, fontStyle: "italic" }}>— ✝ Amen ✝ —</div>
          </div>
        </div>

        <div className="col2">
          <div style={{
            background: "#fff", borderRadius: "20px", padding: "32px 28px",
            border: `1px solid ${C.RB}12`, boxShadow: "0 4px 24px rgba(0,0,0,.04)",
          }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "2rem", color: C.G, marginBottom: "4px" }}>🎶</div>
              <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.25rem" }}>Chorus</h3>
              <div style={{ height: "2px", width: "40px", background: `linear-gradient(90deg,transparent,${C.G},transparent)`, margin: "10px auto" }} />
            </div>

            <div style={{ padding: "0 4px", marginBottom: "32px" }}>
              <div className="chorus-box" style={{
                background: `${C.RB}06`, borderRadius: "12px",
                padding: "20px 22px", border: `1px solid ${C.RB}08`,
                textAlign: "center",
              }}>
                <p style={{ fontSize: "1rem", color: C.RB, lineHeight: 2.1, fontWeight: 600 }}>
                  Rejoice, O my soul!<br />
                  Rejoice!<br />
                  Rejoice, O my soul, and glorify the Lord<br />
                  who is my Saviour.
                </p>
                <p style={{ fontSize: ".82rem", color: C.GD, marginTop: "10px", fontStyle: "italic" }}>(2×)</p>
              </div>
            </div>

            {verses.map((v) => (
              <div key={v.num} className="verse-card" style={{
                marginBottom: v.num < 4 ? "22px" : 0,
                padding: "20px 22px",
                background: v.num % 2 === 0 ? `${C.RB}04` : "#fff",
                borderRadius: "12px",
                border: `1px solid ${C.RB}08`,
                borderLeft: `3px solid ${C.G}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `linear-gradient(135deg,${C.G},${C.GD})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: ".78rem", fontWeight: 700, fontFamily: "'Cinzel',serif",
                  }}>{v.num}.</div>
                  <div style={{ height: "1px", flex: 1, background: `linear-gradient(90deg,${C.G}40,transparent)` }} />
                </div>
                {v.lines.map((line, i) => (
                  <p key={i} style={{
                    fontSize: ".92rem", color: "#4a5568", lineHeight: 2,
                    paddingLeft: "8px",
                    borderLeft: i < v.lines.length - 1 ? `1px dashed ${C.RB}18` : "none",
                  }}>{line}</p>
                ))}
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <span style={{ fontSize: ".75rem", color: C.GD, fontStyle: "italic", letterSpacing: "1px" }}>(Chorus)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mg-bottom" style={{
        maxWidth: "700px", margin: "50px auto 0",
        background: `linear-gradient(135deg,${C.CRD},${C.CR})`,
        borderRadius: "16px", padding: "28px 32px",
        border: `1px solid ${C.G}28`, textAlign: "center",
      }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".85rem", color: C.RB, marginBottom: "8px" }}>
          🌿 Divine Favourite Magnificat 2026
        </p>
        <p style={{ fontSize: ".9rem", color: "#4a5568", lineHeight: 1.8, fontStyle: "italic" }}>
          &ldquo;My soul proclaims the greatness of the Lord, and my spirit rejoices in God my Saviour.&rdquo;
        </p>
        <p style={{ fontSize: ".8rem", color: C.GD, fontWeight: 700, marginTop: "8px" }}>— Luke 1:46-47</p>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <PH title="About the Congregation" sub="Daughters of Divine Love — Bearers of God's Love to the World" />
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="about-hero reveal" style={{
          background: `linear-gradient(135deg,${C.DB},${C.RB},#1a4a8a)`,
          borderRadius: "20px", padding: "44px 36px", marginBottom: "40px",
          textAlign: "center", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "210px", fontFamily: "'Cinzel',serif", color: C.G, opacity: .04, userSelect: "none" }}>✝</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".7rem", color: `rgba(197,160,89,.75)`, letterSpacing: "4.5px", textTransform: "uppercase", marginBottom: "12px" }}>DDL</p>
            <h3 className="ddl-heading" style={{ fontFamily: "'Cinzel',serif", color: "#fff", fontSize: "1.8rem", marginBottom: "10px", lineHeight: 1.3 }}>Daughters of Divine Love</h3>
            <p style={{ color: "rgba(226,232,240,.76)", fontSize: ".88rem", fontWeight: 300, marginBottom: "20px" }}>An International Congregation of Pontifical Right</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {["Founded 1969", "Nigeria", "Global Mission", "Pontifical Right"].map((t, i) => (
                <span key={i} style={{ background: "rgba(197,160,89,.16)", border: `1px solid rgba(197,160,89,.35)`, borderRadius: "50px", padding: "5px 14px", fontSize: ".76rem", color: "rgba(197,160,89,.9)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div className="reveal reveal-delay-1">
            <TS title="Origins &amp; Founding">
              The <strong style={{ color: C.RB }}>Congregation of the Daughters of Divine Love (DDL)</strong> is an international order of pontifical right, founded in Nigeria in 1969 by the revered <strong style={{ color: C.RB }}>Bishop Godfrey Mary Paul Okoye, CSSp.</strong> The congregation emerged during a period of profound socio-spiritual need in post-civil war Nigeria, born of a divine inspiration to manifest God's limitless love to a world in dire need of healing, comfort, and evangelical witness.
            </TS>
          </div>
          <div className="ab-charism" style={{ background: `linear-gradient(135deg,${C.CRD},${C.CR})`, borderLeft: `5px solid ${C.G}`, borderRadius: "0 16px 16px 0", padding: "28px 32px", boxShadow: `0 4px 20px rgba(13,44,97,.06)` }}>
            <div style={{ fontSize: ".7rem", color: C.G, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Primary Charism</div>
            <p style={{ fontSize: "1.08rem", fontStyle: "italic", color: C.RB, lineHeight: 1.82, fontWeight: 400, marginBottom: "12px" }}>
              &ldquo;The primary charism of the Congregation is a contemplation of God's love, and a spontaneous response to that love in self-surrender, implemented in apostolic action.&rdquo;
            </p>
            <p style={{ fontSize: ".8rem", color: C.GD, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>— DDL Constitutions</p>
          </div>
          <div className="reveal reveal-delay-3">
            <TS title="Global Charism &amp; Mission">
              Members of the DDL congregation commit themselves wholly to being living catalysts of divine charity across the world. They express this charism through multifaceted apostolic ministries including high-quality education at every level, compassionate healthcare delivery, social work among the marginalized, missionary outreach in underserved communities, and active pastoral engagement. Their presence spans multiple countries on the African continent and beyond, bearing the light of Christ's love wherever they are sent.
            </TS>
          </div>
          <div className="gc reveal" style={{ padding: "28px" }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: "1.1rem", marginBottom: "6px" }}>Pillars of Apostolic Service</h3>
            <div style={{ height: "2px", width: "40px", background: `linear-gradient(90deg,${C.G},transparent)`, marginBottom: "22px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px" }}>
              {SERVICE_PILLARS.map((p, i) => (
                <div key={i} className="pillar-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div style={{ fontSize: "26px", marginBottom: "8px" }}>{p.icon}</div>
                  <p style={{ fontFamily: "'Cinzel',serif", color: C.RB, fontSize: ".88rem", marginBottom: "5px", fontWeight: 600 }}>{p.t}</p>
                  <p style={{ fontSize: ".76rem", color: "#718096", lineHeight: 1.5 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <TS title="Sr. Jane's Perpetual Commitment">
              By pronouncing her final, perpetual vows on September 5th, 2026, Sister M. Chimezirim Jane Eke binds herself irrevocably to this magnificent global legacy of sacrificial love. Her vows of poverty, chastity, and obedience are not merely personal commitments — they are a solemn covenant with the living God, witnessed by the Church, binding her heart to the DDL family and to every soul she will encounter in her apostolic mission. She becomes, in the fullest sense, a Daughter of Divine Love — forever.
            </TS>
          </div>
        </div>
      </div>
    </div>
  );
}

function GiftingPage() {
  return (
    <div>
      <PH title="Support Her Ministry" sub="As Sr. Jane enters her perpetual consecration, graciously join in sustaining her sacred mission" />
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div className="split" style={{ marginBottom: "32px", alignItems: "stretch" }}>
          <div className="gf-img-col" style={{ flex: "0 0 auto", width: "220px", minWidth: "180px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", border: `3px solid ${C.G}`, boxShadow: `0 14px 44px rgba(13,44,97,.22)`, height: "100%" }}>
              <img className="gf-img" src={SR_JANE} alt="Sr. Jane" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block", minHeight: "240px" }} loading="lazy" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: ".82rem", fontStyle: "italic", color: "#4a5568", lineHeight: 1.7 }}>
                &ldquo;With an everlasting love you care for me,<br />O God, I will sing forever of your love.&rdquo;
              </p>
            </div>
          </div>
          <div className="gc" style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "36px", marginBottom: "14px" }}>🕊</div>
            <p style={{ fontSize: ".94rem", lineHeight: 1.88, color: "#4a5568" }}>
              Sister Jane has consecrated her entire life to the service of God and humanity. If you are moved by the Holy Spirit to support her religious ministry, apostolic works, and the broader mission of the Daughters of Divine Love, your love offering will be received with deep gratitude and prayer.
            </p>
          </div>
        </div>
        <div className="bank-card reveal">
          <div style={{ position: "absolute", top: "-22px", right: "-22px", width: "130px", height: "130px", borderRadius: "50%", border: `1px solid rgba(197,160,89,.18)` }} />
          <div style={{ position: "absolute", bottom: "-35px", left: "-35px", width: "170px", height: "170px", borderRadius: "50%", border: `1px solid rgba(197,160,89,.14)` }} />
          <div style={{ position: "absolute", top: "18px", right: "18px", opacity: .09, fontSize: "86px", fontFamily: "'Cinzel',serif", color: C.G, userSelect: "none" }}>✝</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{ padding: "10px 18px", background: "rgba(197,160,89,.14)", border: `1px solid rgba(197,160,89,.38)`, borderRadius: "8px", fontFamily: "'Cinzel',serif", color: C.G, fontSize: "1.08rem", fontWeight: 600 }}>Access Bank</div>
              <div style={{ height: "1px", flex: 1, background: `linear-gradient(90deg,rgba(197,160,89,.38),transparent)` }} />
            </div>
            <p style={{ fontSize: ".68rem", color: "rgba(197,160,89,.68)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "5px" }}>Account Name</p>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: "1.22rem", color: "#fff", fontWeight: 600, marginBottom: "24px" }}>M. Chimezirim Jane Eke</p>
            <p style={{ fontSize: ".68rem", color: "rgba(197,160,89,.68)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "5px" }}>Account Number</p>
            <p className="banknum" style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "1.75rem", color: C.GL, letterSpacing: "6px", fontWeight: 700 }}>0705868871</p>
            <div style={{ marginTop: "28px", paddingTop: "18px", borderTop: "1px solid rgba(197,160,89,.18)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <p style={{ fontSize: ".76rem", color: "rgba(226,232,240,.55)", fontWeight: 300 }}>Love Offering for Sr. Jane's Ministry</p>
              <div style={{ background: "rgba(197,160,89,.14)", border: `1px solid rgba(197,160,89,.28)`, borderRadius: "50px", padding: "4px 13px", fontSize: ".73rem", color: "rgba(197,160,89,.88)" }}>Nigeria · NGN</div>
            </div>
          </div>
        </div>
        <div className="gc" style={{ padding: "24px", margin: "28px 0" }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "10px" }}>Important Note</p>
          <p style={{ fontSize: ".9rem", lineHeight: 1.75, color: "#4a5568" }}>
            All love offerings received are channelled directly to support Sr. Jane's religious formation materials, mission assignments, and the general apostolate of the Daughters of Divine Love. For enquiries, please contact <strong style={{ color: C.RB }}>Mrs. Elizabeth Eke</strong> at <strong style={{ color: C.RB }}>0907 999 8123</strong>.
          </p>
        </div>
        <div className="gf-quote" style={{ background: `linear-gradient(135deg,${C.CRD},${C.CR})`, borderRadius: "16px", padding: "28px 32px", textAlign: "center", border: `1px solid rgba(197,160,89,.2)` }}>
          <p style={{ fontSize: ".98rem", fontStyle: "italic", color: C.RB, lineHeight: 1.82, marginBottom: "10px" }}>
            &ldquo;Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
          </p>
          <p style={{ fontSize: ".8rem", color: C.GD, fontWeight: 700, letterSpacing: "1px" }}>— 2 Corinthians 9:7</p>
        </div>
      </div>
    </div>
  );
}
