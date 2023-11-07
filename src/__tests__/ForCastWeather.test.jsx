import { render, screen } from '@testing-library/react'
import ForeCastWeather from '../component/ForeCastWeather';

const testData = [
    {
        "date": "31-01-2023",
        "weatherIcon": "icon.png",
        "weatherInfo": "sunny",
        "maxTemp": 30,
        "minTemp":20
    },
    {
        "date": "31-01-2023",
        "weatherIcon": "icon1.png",
        "weatherInfo": "cloudy",
        "maxTemp": 30,
        "minTemp":20
        },
]

// Run Test for forecastweather componenet
test("Forcast Page should be render with test Data", () => {
    render(<ForeCastWeather data={testData} />)
    expect(screen.getByText(/next/i)).toBeInTheDocument();
    
})
