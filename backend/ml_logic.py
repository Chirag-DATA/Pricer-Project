import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder

class PricePredictor:
    def __init__(self):
        self.model = xgb.XGBRegressor()
        self.le = LabelEncoder()

    def train_and_predict(self, data, target_brand):
        df = pd.DataFrame(data)
        df['brand_enc'] = self.le.fit_transform(df['brand'])
        
        X = df[['brand_enc', 'rating', 'sentiment_score']]
        y = df['price']
        
        self.model.fit(X, y)
        
        try:
            brand_val = self.le.transform([target_brand])[0]
        except:
            brand_val = 0
            
        # Predict for a high-quality version of the product
        prediction = self.model.predict(pd.DataFrame([[brand_val, 4.5, 80]], 
                                        columns=['brand_enc', 'rating', 'sentiment_score']))
        return round(float(prediction[0]), 2)