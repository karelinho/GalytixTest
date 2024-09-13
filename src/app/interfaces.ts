export interface Country {
    name: string;
    code: string;
    weather?: WeatherData;
}

export interface WeatherData {
    temperature: number;
    precipitation: string;
    wind: {
        speed: number;
        gust: number;
    }
}
