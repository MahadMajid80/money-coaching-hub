// Illustrative candlestick chart for the Technical Analysis Bootcamp page.
// Made-up prices (no real market data): a range between a support zone and a
// resistance zone, a breakout, and a retest where old resistance becomes support.

type Candle = { o: number; h: number; l: number; c: number };

// Closing prices, hand-shaped to tell the support/resistance story.
const CLOSES = [
  104, 107, 110, 113, 116, 119, 118, 115, 112, 109, 106, 103, 101, 102, 105, 108, 111, 114, 117, 119.5,
  117, 113, 110, 107, 104, 101.5, 103, 106, 109, 112, 115, 118, 120, 123.5, 126, 128, 126, 123.5, 122.5, 124.5,
  127.5, 130.5, 133, 135,
];

// Small deterministic wiggle so wicks look natural but never change between visits.
function wiggle(i: number, k: number) {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const CANDLES: Candle[] = CLOSES.map((c, i) => {
  const o = i === 0 ? 102 : CLOSES[i - 1] + (wiggle(i, 1) - 0.5) * 1.2;
  let h = Math.max(o, c) + 0.6 + wiggle(i, 2) * 1.8;
  let l = Math.min(o, c) - 0.6 - wiggle(i, 3) * 1.8;
  // Let wicks probe the zones on touches, the way real price does.
  if ([5, 19, 32].includes(i)) h = Math.max(h, 121.4);
  if ([12, 25].includes(i)) l = Math.min(l, 99.2);
  if ([37, 38].includes(i)) l = Math.min(l, 120.6);
  return { o, h, l, c };
});

// 8-period simple moving average.
const MA = CLOSES.map((_, i) => {
  if (i < 7) return null;
  const s = CLOSES.slice(i - 7, i + 1);
  return s.reduce((a, b) => a + b, 0) / s.length;
});

const W = 960;
const H = 420;
const PAD = { l: 20, r: 20, t: 24, b: 36 };
const MIN = 95;
const MAX = 138;
const plotW = W - PAD.l - PAD.r;
const plotH = H - PAD.t - PAD.b;
const step = plotW / CANDLES.length;
const y = (p: number) => PAD.t + ((MAX - p) / (MAX - MIN)) * plotH;
const x = (i: number) => PAD.l + step * i + step / 2;

const SUPPORT = { from: 99, to: 102 };
const RESIST = { from: 119.5, to: 122.5 };
const BREAKOUT = 33;

const UP = "#1E8F5A";
const DOWN = "#C8483E";

export function CandlestickChart() {
  const maPath = MA.map((v, i) => (v == null ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`))
    .filter(Boolean)
    .join(" L ");
  const zoneEnd = x(BREAKOUT) - step / 2;

  return (
    <figure style={{ margin: "0", width: "100%", maxWidth: "980px" }}>
      <div style={{ background: "#FDF7E8", border: "1px solid #E6E0D0", borderRadius: "20px", padding: "20px", boxSizing: "border-box", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-labelledby="ta-chart-title ta-chart-desc"
          style={{ display: "block", minWidth: "620px", fontFamily: "Lato, sans-serif" }}
        >
          <title id="ta-chart-title">Example candlestick chart with support and resistance</title>
          <desc id="ta-chart-desc">
            Price bounces between a support zone near the bottom and a resistance zone near the top, then breaks above resistance.
            On the pullback, the old resistance zone holds as new support. A moving average line follows the trend.
          </desc>

          {/* Grid */}
          {[100, 110, 120, 130].map((p) => (
            <line key={p} x1={PAD.l} x2={W - PAD.r} y1={y(p)} y2={y(p)} stroke="#E6E0D0" strokeWidth="1" />
          ))}

          {/* Resistance zone, then the same zone as new support after the breakout */}
          <rect x={PAD.l} y={y(RESIST.to)} width={zoneEnd - PAD.l} height={y(RESIST.from) - y(RESIST.to)} fill="#C8483E" opacity="0.12" />
          <line x1={PAD.l} x2={zoneEnd} y1={y(RESIST.to)} y2={y(RESIST.to)} stroke={DOWN} strokeDasharray="6 5" strokeWidth="1.5" />
          <rect
            x={zoneEnd}
            y={y(RESIST.to)}
            width={W - PAD.r - zoneEnd}
            height={y(RESIST.from) - y(RESIST.to)}
            fill="#1E8F5A"
            opacity="0.12"
          />
          <line x1={zoneEnd} x2={W - PAD.r} y1={y(RESIST.from)} y2={y(RESIST.from)} stroke={UP} strokeDasharray="6 5" strokeWidth="1.5" />

          {/* Support zone */}
          <rect x={PAD.l} y={y(SUPPORT.to)} width={zoneEnd - PAD.l} height={y(SUPPORT.from) - y(SUPPORT.to)} fill="#1E8F5A" opacity="0.12" />
          <line x1={PAD.l} x2={zoneEnd} y1={y(SUPPORT.from)} y2={y(SUPPORT.from)} stroke={UP} strokeDasharray="6 5" strokeWidth="1.5" />

          {/* Candles */}
          {CANDLES.map((k, i) => {
            const up = k.c >= k.o;
            const col = up ? UP : DOWN;
            const bodyTop = y(Math.max(k.o, k.c));
            const bodyH = Math.max(2, Math.abs(y(k.o) - y(k.c)));
            const bw = step * 0.58;
            return (
              <g key={i}>
                <line x1={x(i)} x2={x(i)} y1={y(k.h)} y2={y(k.l)} stroke={col} strokeWidth="1.6" />
                <rect x={x(i) - bw / 2} y={bodyTop} width={bw} height={bodyH} rx="1.5" fill={col} />
              </g>
            );
          })}

          {/* Moving average */}
          <path d={`M ${maPath}`} fill="none" stroke="#FAAC15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Labels */}
          <g fontSize="15" fontWeight="700">
            <text x={PAD.l + 10} y={y(RESIST.to) - 10} fill={DOWN}>
              Resistance zone (sellers step in)
            </text>
            <text x={PAD.l + 10} y={y(SUPPORT.from) + 22} fill={UP}>
              Support zone (buyers step in)
            </text>
            <text x={W - PAD.r - 10} y={y(110)} fill={UP} textAnchor="end">
              Old resistance
            </text>
            <text x={W - PAD.r - 10} y={y(110) + 19} fill={UP} textAnchor="end">
              becomes new support
            </text>
          </g>

          {/* Breakout marker */}
          <g>
            <circle cx={x(BREAKOUT)} cy={y(CANDLES[BREAKOUT].c) - 18} r="13" fill="#111111" />
            <text x={x(BREAKOUT)} y={y(CANDLES[BREAKOUT].c) - 13} fill="#FFD112" fontSize="14" fontWeight="800" textAnchor="middle">
              ↑
            </text>
            <text x={x(BREAKOUT) - 22} y={y(CANDLES[BREAKOUT].c) - 40} fill="#111111" fontSize="15" fontWeight="700" textAnchor="end">
              Breakout
            </text>
          </g>

          {/* Legend */}
          <g fontSize="13" fill="#6B6248" transform={`translate(${PAD.l}, ${H - 10})`}>
            <rect x="0" y="-11" width="12" height="12" rx="2" fill={UP} />
            <text x="18" y="0">Price closed higher</text>
            <rect x="160" y="-11" width="12" height="12" rx="2" fill={DOWN} />
            <text x="178" y="0">Price closed lower</text>
            <line x1="320" x2="344" y1="-5" y2="-5" stroke="#FAAC15" strokeWidth="3" strokeLinecap="round" />
            <text x="352" y="0">Moving average (trend)</text>
          </g>
        </svg>
      </div>
      <figcaption style={{ marginTop: "12px", fontSize: "14px", color: "#6B6248", textAlign: "center" }}>
        This is the kind of chart you&apos;ll learn to read. Illustrative example, not real market data.
      </figcaption>
    </figure>
  );
}
