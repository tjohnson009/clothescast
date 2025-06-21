# 👕 ClothesCast

**ClothesCast** is a modern weather web app that helps you decide what to wear based on the latest weather forecast for your city.  
It combines real-time weather data with intuitive, clothing-based recommendations and beautiful SVG weather icons.

---

## 🌦️ Features

- **Live Weather Search:**  
  Enter any city to get up-to-date weather data powered by the Visual Crossing Weather API.

- **Clothing Suggestions:**  
  Instantly see what to wear—shirts, jackets, shorts, umbrellas, and more—based on the forecast.

- **7-Day Forecast:**  
  View a detailed daily forecast with high/low temperatures, wind, and weather icons.

- **Unit Switching:**  
  Toggle between imperial (°F, mph, in, mi) and metric (°C, km/h, cm, km) units with a single click.

- **Beautiful Icons:**  
  Crisp SVG icons for weather conditions, clothing, and moon phases.

- **Responsive UI:**  
  Works great on desktop and mobile.

---

## 🚀 Getting Started

### 1. **Clone the repository**
```sh
git clone https://github.com/tjohnson009/clothescast.git
cd clothescast
```

### 2. **Install dependencies**
```sh
npm install
```

### 3. **Set up your API key**

- Get a free API key from [Visual Crossing Weather](https://www.visualcrossing.com/weather-api).
- Add your key to your environment variables:
  - For local development, create a `.env` file in the project root:
    ```
    API_KEY=your_visual_crossing_api_key
    ```
  - For deployment (e.g., Vercel), add `API_KEY` in your dashboard’s Environment Variables.

### 4. **Run locally**
```sh
npm run build
npx serve dist
```
Or use your favorite static server to serve the `dist` folder.

---

## 🛠️ Project Structure

```
public/
  ├─ index.html
  ├─ index.mjs           # Main JS entry point
  ├─ style.css
  ├─ forecast.js
  ├─ updateClothesCast.js
  ├─ winddirections.js
  ├─ icons/              # SVG weather & clothing icons
  └─ fonts/              # Nunito font family
webpack.config.js
package.json
```

---

## ⚙️ Build & Deployment

- **Bundled with Webpack:**  
  All assets and code are bundled into the `dist/` folder.
- **Deploy on Vercel:**  
  Set the output directory to `dist` and the build command to `npm run build`.

---

## 🧩 Technologies Used

- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- [date-fns](https://date-fns.org/) for date formatting
- [Webpack](https://webpack.js.org/) for bundling
- Vanilla JavaScript, HTML, and CSS

---

## 🙌 Credits

- Weather and clothing icons by [Iconoir](https://iconoir.com/) and [other open SVG sources].
- Fonts: [Nunito](https://fonts.google.com/specimen/Nunito)

---

## 📄 License

This project is licensed under the MIT License.

---