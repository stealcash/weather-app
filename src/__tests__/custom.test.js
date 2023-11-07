import { fetchCurrentWeather ,fetchForeCastData} from '../api/weatherAPI';

// Running this fetch api make sure your api key and method are runing ok 
test('fetch current Weather check if api not failid', async () => {
    await expect(fetchCurrentWeather({search:"jaipur"})).resolves.not.toThrow();
})
  
test('fetch forcast Weather check if api not failid', async () => {
    await expect(fetchForeCastData({search:"jaipur",days:10})).resolves.not.toThrow();
})
  