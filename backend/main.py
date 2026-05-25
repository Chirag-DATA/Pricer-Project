from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from scraper import get_real_time_data
from ml_logic import PricePredictor
from reportlab.pdfgen import canvas
from collections import Counter
import io
import uvicorn
import re

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

predictor = PricePredictor()
last_results = {} 

def extract_keywords(data):
    # Extract fashion keywords from titles (Option 4)
    stop_words = {'men', 'women', 'with', 'and', 'for', 'the', 'shirt', 'tshirt', 'black', 'blue', 'white'}
    all_words = []
    for p in data:
        words = re.findall(r'\w+', p['title'].lower())
        all_words.extend([w for w in words if len(w) > 3 and w not in stop_words])
    return [word for word, count in Counter(all_words).most_common(5)]

@app.get("/api/analyze")
async def analyze(q: str):
    global last_results
    data = get_real_time_data(q)
    if not data: return {"error": "No data"}

    # XGBoost Price Prediction
    rec_price = predictor.train_and_predict(data, data[0]['brand'])
    
    # Growth Simulation (Option 3): What if rating was 5.0?
    simulated_price = predictor.train_and_predict(data, data[0]['brand']) * 1.15 # Approx 15% jump for 5-star
    
    # Keyword Extraction (Option 4)
    top_keywords = extract_keywords(data)
    
    # Competitor Leaderboard (Option 2)
    leaderboard = sorted(data, key=lambda x: x['price'], reverse=True)[:5]

    last_results = {
        "query": q,
        "price": rec_price,
        "count": len(data),
        "avg_sentiment": sum(p['sentiment_score'] for p in data) / len(data),
        "keywords": top_keywords,
        "simulated": round(simulated_price, 2),
        "leaderboard": leaderboard
    }
    
    return {
        "recommended_price": rec_price,
        "scraped_count": len(data),
        "chart_data": [{"name": p['brand'], "price": p['price']} for p in data],
        "sentiment_avg": last_results['avg_sentiment'],
        "keywords": top_keywords,
        "growth_potential": round(simulated_price - rec_price, 2),
        "leaderboard": leaderboard
    }

@app.get("/api/download")
async def download_report():
    if not last_results: return {"error": "No data"}
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer)
    p.drawString(100, 800, f"MARKET INTELLIGENCE REPORT: {last_results['query'].upper()}")
    p.drawString(100, 780, f"AI Recommended Price: Rs. {last_results['price']}")
    p.drawString(100, 760, f"Keywords Found: {', '.join(last_results['keywords'])}")
    p.showPage()
    p.save()
    buffer.seek(0)
    return Response(content=buffer.getvalue(), media_type="application/pdf")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)