import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

// AI Hydro-Meteorological Briefing Endpoint
app.post('/api/hydro/ai-briefing', async (req, res) => {
  try {
    const { basins, sensors, zones } = req.body;

    if (!ai) {
      return res.json({
        briefing: `[SYNTHETIC EMERGENCY BRIEFING · DEMO DATA]
1. HYDROLOGICAL SUMMARY: Upper Columbia and Santiam basins exhibit heightened discharge velocities (+14.2% over 24-hr baselines). Santiam North Fork has crossed the 18.9 ft critical gauge threshold.
2. SATELLITE SURFACE MASK: Sentinel-2 pass analysis indicates a +38.4% surface water expansion (4,210 ha inundation footprint) concentrating along the Willamette Delta.
3. TELEMETRY NODE HEALTH: ESP32 transducers at Spillway Sonar Node A & Pier Acoustic Sensor continue reporting stage rate-of-rise exceeding 0.45m/hr.
4. TACTICAL DIRECTIVE: Maintain Evacuation Preparedness status for Lower Mill Creek Basin. Pre-stage high-clearance emergency assets at Station 8.`
      });
    }

    const prompt = `You are the lead hydrologist and civil disaster intelligence officer at RIVERGUARD AI.
Analyze the following hydrologic telemetry dataset and generate a crisp, executive 4-bullet operational briefing for emergency managers:

- Critical Basins: ${JSON.stringify(basins?.map((b: any) => ({ name: b.name, stage: b.gaugeHeightFt, threshold: b.crestThresholdFt, status: b.status })))}
- High Risk Zones: ${JSON.stringify(zones?.map((z: any) => ({ name: z.zoneName, riskScore: z.riskScore, pop: z.populationAtRisk, readiness: z.evacuationReadiness })))}
- Sensor Readings: ${JSON.stringify(sensors?.map((s: any) => ({ name: s.name, depth: s.waterLevelM, delta: s.waterLevelDeltaPerHour })))}

Provide strict, professional scientific output. Highlight risks, crest timing, and concrete tactical recommendations. Explicitly mention that hardware nodes are currently operating in simulation mode. Keep under 200 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ briefing: response.text });
  } catch (err: any) {
    console.error('Gemini synthesis error:', err);
    res.status(500).json({ 
      error: 'Failed to generate hydro briefing',
      briefing: `[OFFLINE FALLBACK BRIEFING · DEMO DATA]
• Critical stage breach observed at Santiam North Fork (18.9 ft vs 19.5 ft crest).
• Multi-spectral satellite masks estimate 4,210 hectares of anomalous inundation.
• ESP32 field telemetry nodes indicate steady rapid saturation across floodplains.
• Action: Initiate Level 2 watch advisory for downtown in`dustrial corridor.`
    });
  }
});

// Production Vite or Static Serving
const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RiverGuard AI server running on port ${PORT}`);
  });
}

startServer();
