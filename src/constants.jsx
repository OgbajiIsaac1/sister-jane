import raw from './images.json';

export const IMG = raw;

export const C = {
  RB: "#0d2c61",
  DB: "#071a3e",
  MB: "#1a4080",
  G:  "#c5a059",
  GL: "#e8c97a",
  GD: "#9a7a3a",
  CR: "#fdfaf4",
  CRD:"#f5efe3",
};

export const NAV = [
  { id:"journey",      label:"Vocation Journey"          },
  { id:"magnificat",   label:"Divine Favourite Magnificat" },
  { id:"bouquet",      label:"Spiritual Bouquet"         },
  { id:"guestbook",    label:"Guestbook"                 },
  { id:"congregation", label:"About DDL"                  },
  { id:"gifting",      label:"Support Ministry"          },
];

export const GIFT_ICON = {
  "Holy Mass":"✝",
  "Daily Rosary":"✦",
  "Divine Mercy Chaplet":"❤",
  "Private Fasting":"🕊",
  "Novena Prayer":"⭐",
  "Perpetual Adoration":"☀",
};

export const GIFTS = [
  "Holy Mass",
  "Daily Rosary",
  "Divine Mercy Chaplet",
  "Private Fasting",
  "Novena Prayer",
  "Perpetual Adoration",
];

export const WA_MSG = encodeURIComponent(
  "Congratulations to our beloved Sister Jane! 🙏✝ Wishing you every blessing on this most sacred day of your Final Religious Profession."
);
export const WA_LINK = `https://wa.me/2348066314879?text=${WA_MSG}`;

export const SACRED_DATES = [
  { icon:"✝", lbl:"Final Profession",   val:"Saturday, Sept 5 · 10:00 AM" },
  { icon:"🙏", lbl:"Thanksgiving Mass",  val:"Sunday, Sept 6 · 10:00 AM"  },
  { icon:"📍", lbl:"Profession Venue",   val:"DDL Chapel, Abakpa-Nike, Enugu" },
  { icon:"⛪", lbl:"Thanksgiving Venue", val:"St Michael's Parish, Idima-Abam" },
];

export const RSVP_CONTACTS = [
  { name:"Mother M. Anastasia Dike",    role:"Mother General, DDL",             icon:"✝" },
  { name:"Fr. Stanislaus Nwadike",       role:"Parish Priest",                   icon:"⛪" },
  { name:"Rev. Fr. Dr. Chibuike Ukeh",   role:"Clergy",                          icon:"✝" },
  { name:"Mrs. Elizabeth Eke",           role:"For the Family · 0907 999 8123",  icon:"👨‍👩‍👧" },
];

export const FORMATION = [
  { yr:"Early Years", ev:"Sensing the divine call through prayer and personal discernment" },
  { yr:"Aspirancy",   ev:"Initial encounter and orientation with the Daughters of Divine Love" },
  { yr:"Postulancy",  ev:"Deeper commitment and integration into DDL community life" },
  { yr:"Novitiate",   ev:"Temporary vows — complete immersion in DDL charism and spirituality" },
  { yr:"2026 ✦",     ev:"Final Perpetual Vows — Forever His, Forever Hers", final:true },
];

export const SERVICE_PILLARS = [
  { icon:"🎓", t:"Education", d:"Nurturing minds from primary to university level" },
  { icon:"🏥", t:"Healthcare", d:"Healing bodies and souls through medical ministry" },
  { icon:"🤝", t:"Social Work", d:"Lifting the marginalized and vulnerable" },
  { icon:"✝", t:"Evangelism", d:"Proclaiming the Gospel to all nations" },
  { icon:"🕊", t:"Pastoral Care", d:"Tending the spiritual welfare of communities" },
  { icon:"🌍", t:"Missions", d:"Crossing borders in service of the Kingdom" },
];

export const ANGEL_WING_R = (
  <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="wg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e8c97a" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#c5a059" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#9a7a3a" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path d="M120 180 C80 160 40 130 20 90 C10 70 8 50 15 35 C22 20 35 12 50 10 C70 8 85 15 95 28 C100 35 105 45 105 55 C105 50 100 38 95 32 C90 26 80 20 70 22 C55 25 42 38 38 55 C34 72 38 90 50 105 C62 120 80 132 100 140 C120 148 140 150 160 145 C170 143 178 138 180 130 C182 122 178 115 170 112 C162 109 152 112 148 118 C144 124 147 132 155 135 C163 138 172 135 176 128 C180 121 178 113 172 110 C165 107 156 110 153 116 C150 122 153 128 158 130 C163 132 168 130 170 126 C172 122 170 118 166 117 C162 116 158 118 157 121 C156 124 158 126 161 126 C164 126 166 124 165 122" fill="url(#wg)" />
    <path d="M100 160 C70 140 40 115 25 80 C18 62 16 45 22 33 C28 21 40 15 52 14 C68 13 80 20 88 32 C92 40 94 50 93 58 C92 54 88 44 83 38 C78 32 68 28 60 30 C48 33 38 45 35 60 C32 78 36 95 48 110 C60 125 78 138 98 146 C118 154 138 156 155 152 C165 150 172 146 174 140 C176 134 173 128 167 126 C161 124 154 126 151 131 C148 136 150 142 156 144 C162 146 168 143 171 138 C174 133 172 126 167 124 C162 122 155 124 153 129 C151 134 153 139 158 140 C163 141 167 139 169 136 C171 133 169 130 166 129 C163 128 160 129 159 132 C158 135 160 137 162 137" fill="url(#wg)" />
    <path d="M85 140 C60 122 38 102 28 72 C22 56 22 42 28 32 C34 22 45 18 56 18 C70 18 80 24 85 35 C88 42 89 50 87 56 C86 52 82 44 78 40 C74 36 66 33 60 35 C50 38 42 48 40 62 C38 76 42 92 52 104 C62 116 78 126 96 133 C114 140 132 142 148 138 C156 136 162 132 163 127 C164 122 161 117 156 115 C151 113 145 115 143 119 C141 123 143 128 148 130 C153 132 158 130 160 126 C162 122 160 117 156 115 C152 113 146 115 145 119 C144 123 146 127 150 128 C154 129 157 127 158 124 C159 121 157 119 155 118 C153 117 151 118 150 120" fill="url(#wg)" />
  </svg>
);

export const ANGEL_WING_L = (
  <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
    <defs>
      <linearGradient id="wgl" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e8c97a" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#c5a059" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#9a7a3a" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path d="M120 180 C80 160 40 130 20 90 C10 70 8 50 15 35 C22 20 35 12 50 10 C70 8 85 15 95 28 C100 35 105 45 105 55 C105 50 100 38 95 32 C90 26 80 20 70 22 C55 25 42 38 38 55 C34 72 38 90 50 105 C62 120 80 132 100 140 C120 148 140 150 160 145 C170 143 178 138 180 130 C182 122 178 115 170 112 C162 109 152 112 148 118 C144 124 147 132 155 135 C163 138 172 135 176 128 C180 121 178 113 172 110 C165 107 156 110 153 116 C150 122 153 128 158 130 C163 132 168 130 170 126 C172 122 170 118 166 117 C162 116 158 118 157 121 C156 124 158 126 161 126 C164 126 166 124 165 122" fill="url(#wgl)" />
    <path d="M100 160 C70 140 40 115 25 80 C18 62 16 45 22 33 C28 21 40 15 52 14 C68 13 80 20 88 32 C92 40 94 50 93 58 C92 54 88 44 83 38 C78 32 68 28 60 30 C48 33 38 45 35 60 C32 78 36 95 48 110 C60 125 78 138 98 146 C118 154 138 156 155 152 C165 150 172 146 174 140 C176 134 173 128 167 126 C161 124 154 126 151 131 C148 136 150 142 156 144 C162 146 168 143 171 138 C174 133 172 126 167 124 C162 122 155 124 153 129 C151 134 153 139 158 140 C163 141 167 139 169 136 C171 133 169 130 166 129 C163 128 160 129 159 132 C158 135 160 137 162 137" fill="url(#wgl)" />
    <path d="M85 140 C60 122 38 102 28 72 C22 56 22 42 28 32 C34 22 45 18 56 18 C70 18 80 24 85 35 C88 42 89 50 87 56 C86 52 82 44 78 40 C74 36 66 33 60 35 C50 38 42 48 40 62 C38 76 42 92 52 104 C62 116 78 126 96 133 C114 140 132 142 148 138 C156 136 162 132 163 127 C164 122 161 117 156 115 C151 113 145 115 143 119 C141 123 143 128 148 130 C153 132 158 130 160 126 C162 122 160 117 156 115 C152 113 146 115 145 119 C144 123 146 127 150 128 C154 129 157 127 158 124 C159 121 157 119 155 118 C153 117 151 118 150 120" fill="url(#wgl)" />
  </svg>
);

export const ANGEL_SMALL = (
  <svg width="20" height="22" viewBox="0 0 40 44" fill="currentColor" aria-hidden="true">
    <path d="M20 4 C12 8 4 16 2 26 C1 31 2 36 6 38 C10 40 14 38 16 34 C17 32 17 30 16 28 C15 29 14 31 13 31 C11 31 9 29 9 26 C8 22 10 17 14 14 C18 11 22 11 26 14 C30 17 32 22 31 26 C31 29 29 31 27 31 C26 31 25 29 24 28 C23 30 23 32 24 34 C26 38 30 40 34 38 C38 36 39 31 38 26 C36 16 28 8 20 4Z" />
    <circle cx="20" cy="12" r="4" />
  </svg>
);

export const WA_SVG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
